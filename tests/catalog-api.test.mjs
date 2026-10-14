import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import ts from 'typescript';
const root=new URL('../',import.meta.url);
const dataUrl=source=>'data:text/javascript;base64,'+Buffer.from(source).toString('base64');
async function compiled(path,imports={}){
 let source=ts.transpileModule(await readFile(new URL(path,root),'utf8'),{compilerOptions:{module:ts.ModuleKind.ES2022,target:ts.ScriptTarget.ES2022}}).outputText;
 for(const [specifier,url] of Object.entries(imports))source=source.replaceAll(`'${specifier}'`,JSON.stringify(url));
 return dataUrl(source);
}
const data={};const jsonModules={};
for(const name of ['courses','skills','opportunities']){
 data[name]=JSON.parse(await readFile(new URL(`data/${name}.json`,root),'utf8'));
 jsonModules[`@/data/${name}.json`]=dataUrl(`export default ${JSON.stringify(data[name])};`);
}
const catalogUrl=await compiled('lib/catalog.ts',jsonModules);
const imports={'@/lib/catalog':catalogUrl,'@/lib/matching.mjs':new URL('lib/matching.mjs',root).href};
const opportunitiesUrl=await compiled('app/api/opportunities/route.ts',imports);
imports['../opportunities/route']=opportunitiesUrl;
async function route(path){return import(await compiled(path,imports));}
const request=new Request('https://hub.local/api/courses');
const params=id=>({params:Promise.resolve({id})});
test('static catalogues and every GET route work with all external configuration absent',async()=>{
 const original={...process.env};
 const keys=['DATABASE_URL','AUTH_SECRET','SMTP_HOST','SMTP_PORT','SMTP_SECURE','SMTP_USER','SMTP_PASS','SMTP_FROM'];
 try{
  for(const key of keys)delete process.env[key];
  const {catalog}=await import(catalogUrl);
  for(const kind of ['courses','skills','opportunities'])assert.deepEqual(catalog(kind),data[kind]);
  for(const kind of ['courses','skills']){
   const list=await route(`app/api/${kind}/route.ts`);const response=await list.GET();assert.equal(response.status,200);assert.deepEqual(await response.json(),data[kind]);
   const detail=await route(`app/api/${kind}/[id]/route.ts`);const found=await detail.GET(request,params(data[kind][0].id));assert.equal(found.status,200);assert.deepEqual(await found.json(),data[kind][0]);
   const missing=await detail.GET(request,params('missing'));assert.equal(missing.status,404);
  }
  const lessons=await route('app/api/courses/[id]/lessons/route.ts');const response=await lessons.GET(request,params(data.courses[0].id));assert.deepEqual(await response.json(),data.courses[0].lessons);assert.ok(data.courses[0].lessons[0].body);
  assert.equal((await lessons.GET(request,params('missing'))).status,404);
  const compatibility=await route('app/api/skills/[id]/lessons/route.ts');const id=data.courses[0].outcomes[0];const result=await compatibility.GET(request,params(id));const payload=await result.json();assert.equal(payload.skill.id,id);assert.ok(payload.courses.every(c=>c.outcomes.includes(id)));assert.ok(payload.courses[0].lessons[0].body);assert.ok(payload.courses[0].task);
  assert.equal((await compatibility.GET(request,params('missing'))).status,404);
  for(const path of ['app/api/opportunities/route.ts','app/api/match/route.ts']){
   const matching=await route(path);const matched=await matching.GET(new Request(`https://hub.local/api/match?skills=${data.courses[0].outcomes.join(',')}`));assert.equal(matched.status,200);const results=await matched.json();assert.equal(results.length,data.opportunities.length);assert.ok(results.some(o=>o.status==='ready'));
  }
 }finally{for(const key of keys){if(original[key]===undefined)delete process.env[key];else process.env[key]=original[key];}}
});
test('progress API continues to acknowledge device-local progress without account storage',async()=>{
 const progress=await route('app/api/progress/route.ts');
 const response=await progress.POST(new Request('https://hub.local/api/progress',{method:'POST',body:JSON.stringify({skill_id:'clip-sequencing',type:'task'})}));assert.equal(response.status,200);assert.equal((await response.json()).storage,'local');
 const invalid=await progress.POST(new Request('https://hub.local/api/progress',{method:'POST',body:'invalid'}));assert.equal(invalid.status,400);
});
