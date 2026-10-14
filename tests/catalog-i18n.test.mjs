import test from 'node:test';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';
import {localizeCourses,localizeSkills,localizeOpportunities} from '../lib/catalog-i18n.mjs';
const read=async path=>JSON.parse(await readFile(new URL('../'+path,import.meta.url),'utf8'));
const courses=await read('data/courses.json'),skills=await read('data/skills.json'),opportunities=await read('data/opportunities.json');
const cm=await read('data/locales/pcm-courses.json'),sm=await read('data/locales/pcm-skills.json'),om=await read('data/locales/pcm-opportunities.json');
test('every catalogue record and all54 lessons have complete nonblank Pidgin text overlays',()=>{
 assert.deepEqual(Object.keys(cm).sort(),courses.map(c=>c.id).sort());assert.deepEqual(Object.keys(sm).sort(),skills.map(c=>c.id).sort());assert.deepEqual(Object.keys(om).sort(),opportunities.map(c=>c.id).sort());
 for(const c of courses){for(const key of ['name','description','first_step','task'])assert.ok(typeof cm[c.id][key]==='string'&&cm[c.id][key].trim(),`${c.id}.${key}`);assert.deepEqual(Object.keys(cm[c.id].lessons).sort(),c.lessons.map(l=>l.id).sort());for(const lesson of c.lessons){const pcm=cm[c.id].lessons[lesson.id];assert.ok(pcm.title.trim());assert.ok(pcm.body.trim());assert.ok(pcm.body.length>lesson.body.length*.65,`${lesson.id} must retain detailed instructions, not a summary`);assert.notEqual(pcm.body,lesson.body);}}
 for(const s of skills)for(const field of ['name','task'])assert.ok(sm[s.id][field].trim());
 for(const o of opportunities){for(const field of ['title','work_summary','description','first_step'])assert.ok(om[o.id][field].trim());assert.equal(om[o.id].deliverables.length,o.deliverables.length);assert.ok(om[o.id].deliverables.every(text=>text.trim()));for(const r of o.requirements)assert.ok(om[o.id].requirementLabels[r.id].trim());}
});
test('localizing preserves shape stable IDs links tools and all relationship metadata without mutation',()=>{
 const before=JSON.stringify({courses,skills,opportunities});assert.equal(localizeCourses(courses,'en'),courses);assert.equal(localizeSkills(skills,'en'),skills);assert.equal(localizeOpportunities(opportunities,'en'),opportunities);
 const translated=localizeCourses(courses,'pcm');for(let i=0;i<courses.length;i++){const base=courses[i],pcm=translated[i];assert.deepEqual(Object.keys(pcm).sort(),Object.keys(base).sort());for(const field of ['id','tool','source_url','outcomes','areas','category'])assert.deepEqual(pcm[field],base[field]);for(let j=0;j<base.lessons.length;j++){assert.deepEqual(Object.keys(pcm.lessons[j]).sort(),Object.keys(base.lessons[j]).sort());for(const field of ['id','minutes','source_url'])assert.equal(pcm.lessons[j][field],base.lessons[j][field]);}}
 const ls=localizeSkills(skills,'pcm');for(let i=0;i<skills.length;i++){assert.equal(ls[i].id,skills[i].id);assert.deepEqual(ls[i].areas,skills[i].areas);}
 const lo=localizeOpportunities(opportunities,'pcm');for(let i=0;i<opportunities.length;i++){assert.deepEqual(Object.keys(lo[i]).sort(),Object.keys(opportunities[i]).sort());for(const field of ['id','required','source_url','apply_url','kind','last_verified'])assert.deepEqual(lo[i][field],opportunities[i][field]);for(let j=0;j<lo[i].requirements.length;j++){const {label,...base}=opportunities[i].requirements[j];const {label:translatedLabel,...local}=lo[i].requirements[j];assert.deepEqual(local,base);assert.ok(translatedLabel);}}
 assert.equal(JSON.stringify({courses,skills,opportunities}),before);
});
test('runnable HTML CSS and JavaScript snippets stay literally unchanged in Pidgin',()=>{
 const markers={
 'html-structure':['<!doctype html>','</html>'],
 'css-responsive':['* { box-sizing: border-box; }','a:focus-visible, button:focus-visible { outline: 3px solid #174ea6; outline-offset: 3px; }'],
 'code-demonstration':['function sumPrices(prices) {',"try { sumPrices([300, '700']); } catch (error) { console.log(error.message); }"]
 };
 for(const [id,[start,end]] of Object.entries(markers)){const c=courses.find(c=>c.id===id),body=c.lessons[1].body;const code=body.slice(body.indexOf(start),body.indexOf(end)+end.length);assert.ok(cm[id].lessons[c.lessons[1].id].body.includes(code),`${id} code must be identical`);}
});
test('social examples retain numbers scripts and honest no-spend limits',()=>{
 assert.match(cm['facebook-analytics'].lessons['facebook-analytics-2'].body,/50 divided by 1,000 na 5%/);assert.match(cm['facebook-analytics'].lessons['facebook-analytics-2'].body,/32 divided by 400 na 8%/);assert.match(cm['facebook-ads'].lessons['facebook-ads-1'].body,/no enter payment details/);assert.match(om['11'].description,/no be verified vacancy/);
});
