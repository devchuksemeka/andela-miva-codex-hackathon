import test from 'node:test';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';import ts from 'typescript';
const root=new URL('../',import.meta.url);const url=code=>'data:text/javascript;base64,'+Buffer.from(code).toString('base64');
let compiled=ts.transpileModule(await readFile(new URL('app/api/resume/route.ts',root),'utf8'),{compilerOptions:{module:ts.ModuleKind.ES2022,target:ts.ScriptTarget.ES2022}}).outputText;
for(const name of ['resume','portfolio'])compiled=compiled.replaceAll(`'@/lib/${name}.mjs'`,JSON.stringify(new URL(`lib/${name}.mjs`,root).href));
for(const name of ['courses','skills','opportunities'])compiled=compiled.replaceAll(`'@/data/${name}.json'`,JSON.stringify(url('export default '+await readFile(new URL(`data/${name}.json`,root),'utf8')+';')));
const {GET,POST}=await import(url(compiled));
const input={consent:true,profile:{fullName:'Private Person',email:'private@domain.org',location:'Private Place',projects:[{id:'one',title:'Verified by me only',description:'Made an edit',contribution:'I sequenced three clips',outcome:'Delivered sample',tool:'CapCut',skillIds:['clip-sequencing','unknown'],confirmed:true}],experience:[]},target:'1',selectedProjectIds:['one'],selectedExperienceIds:[],progress:{completedCourses:[]}};
const req=(body,origin='https://hub.local')=>new Request('https://hub.local/api/resume',{method:'POST',headers:{origin,'content-type':'application/json'},body:typeof body==='string'?body:JSON.stringify(body)});
async function isolated(run){const key=process.env.OPENAI_API_KEY,model=process.env.OPENAI_MODEL,fetch=globalThis.fetch;try{process.env.OPENAI_API_KEY='sk-test-local-configuration-only';process.env.OPENAI_MODEL='gpt-4.1-mini';await run();}finally{globalThis.fetch=fetch;if(key===undefined)delete process.env.OPENAI_API_KEY;else process.env.OPENAI_API_KEY=key;if(model===undefined)delete process.env.OPENAI_MODEL;else process.env.OPENAI_MODEL=model;}}
test('availability exposes no key and missing configuration fails503 with local alternative',async()=>isolated(async()=>{
 delete process.env.OPENAI_API_KEY;assert.deepEqual(await (await GET()).json(),{aiAvailable:false});const response=await POST(req(input));assert.equal(response.status,503);assert.equal(response.headers.get('cache-control'),'no-store');
}));
test('origin consent malformed JSON array limits and body cap reject before provider call',async()=>isolated(async()=>{
 let calls=0;globalThis.fetch=async()=>{calls++;throw new Error('Must not call');};
 assert.equal((await POST(req(input,'https://evil.local'))).status,403);
 for(const value of [{...input,consent:false},'invalid',{...input,selectedProjectIds:Array(41).fill('one')},{...input,jobDescription:'x'.repeat(8001)},{...input,profile:{projects:'bad'}},' '.repeat(65537)])assert.equal((await POST(req(value))).status,400);
 assert.equal(calls,0);
}));
test('AI sends only reviewed noncontact fields and rebuilds factual local text from allowed IDs',async()=>isolated(async()=>{
 let sent;globalThis.fetch=async(endpoint,options)=>{assert.equal(endpoint,'https://api.openai.com/v1/responses');sent=JSON.parse(options.body);return Response.json({output:[{type:'message',content:[{type:'output_text',text:JSON.stringify({sourceIds:['project:one']})}]}]});};
 const response=await POST(req(input));assert.equal(response.status,200);const body=await response.json();assert.equal(body.mode,'ai');assert.match(body.text,/I sequenced three clips/);assert.equal(body.sources[0].id,'one');assert.equal(sent.store,false);assert.equal(sent.text.format.strict,true);const disclosed=JSON.parse(sent.input);assert.equal(disclosed.sources.length,1);assert.deepEqual(disclosed.sources[0].skillIds,['clip-sequencing']);for(const privateValue of ['Private Person','private@domain.org','Private Place'])assert.ok(!sent.input.includes(privateValue));
}));
test('provider errors forbidden IDs and fabricated response sentences never become resume claims',async()=>isolated(async()=>{
 for(const result of [{sourceIds:['project:unreviewed']},{sourceIds:['project:one'],claim:'Certified expert'},{sourceIds:['project:one','project:one']},{sourceIds:[]}]){
  globalThis.fetch=async()=>Response.json({output:[{content:[{type:'output_text',text:JSON.stringify(result)}]}]});const response=await POST(req(input));assert.equal(response.status,502);assert.ok(!JSON.stringify(await response.json()).includes('Certified expert'));
 }
 globalThis.fetch=async()=>new Response('',{status:500});assert.equal((await POST(req(input))).status,502);
 globalThis.fetch=async()=>{throw new DOMException('Aborted','AbortError');};assert.equal((await POST(req(input))).status,504);
}));
