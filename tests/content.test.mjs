import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {runInNewContext} from 'node:vm';
const read=async name=>JSON.parse(await readFile(new URL(`../data/${name}.json`,import.meta.url),'utf8'));
const courses=await read('courses'),skills=await read('skills'),opportunities=await read('opportunities');
const expected={
 'capcut-trim':['clip-sequencing'],'premiere-trim':['clip-sequencing'],'capcut-captions':['video-captioning'],'premiere-captions':['video-captioning'],
 'facebook-publish':['facebook-publishing'],'facebook-analytics':['facebook-analytics'],'facebook-ads':['facebook-ad-planning'],'instagram-publish':['instagram-publishing'],
 'canva-layout':['flyer-layout'],'event-run-sheet':['event-scheduling'],'html-structure':['semantic-html'],'css-responsive':['responsive-layout'],
 'technical-writing':['instructional-writing','audience-explanation'],'code-demonstration':['programming-demonstration'],'learner-guidance':['learner-guidance'],
 'resolve-trim':['clip-sequencing'],'photoshop-layout':['flyer-layout'],'illustrator-layout':['flyer-layout']
};
test('expanded catalogue preserves all existing course/lesson identities and skill relationships',()=>{
 assert.equal(courses.length,18);assert.deepEqual(new Set(courses.map(c=>c.id)),new Set(Object.keys(expected)));
 const ids=new Set(skills.map(s=>s.id));const lessons=[];
 for(const c of courses){assert.deepEqual(c.outcomes,expected[c.id]);assert.ok(c.outcomes.every(id=>ids.has(id)));assert.deepEqual(c.lessons.map(l=>l.id),[1,2,3].map(n=>`${c.id}-${n}`));lessons.push(...c.lessons.map(l=>l.id));}
 assert.equal(new Set(lessons).size,54);
});
test('each course has an original practical brief, staged exercises and an assessable handoff',()=>{
 const exercises=new Set();
 for(const c of courses){
  assert.match(c.provider,/original AI-assisted practice/);assert.match(c.provider,/not vendor certification/);
  assert.match(c.lessons[0].body,/Prerequisites:/);assert.match(c.task,/Deliverable checklist:/);assert.match(c.task,/revision|revis/);
  for(const l of c.lessons){
   assert.match(l.body,/Sample inputs:/);assert.match(l.body,/Exercise:/);assert.match(l.body,/Review checklist:/);assert.match(l.body,/Common mistake:/);
   const exercise=l.body.split('Exercise:')[1].split('Review checklist:')[0].trim();assert.ok(exercise.length>350,`${l.id} needs actionable steps`);assert.ok(!exercises.has(exercise),`${l.id} repeats an exercise`);exercises.add(exercise);
   assert.ok(l.minutes>=15);assert.ok(l.body.split(/\s+/).length>=200);assert.ok(new URL(l.source_url).protocol==='https:');assert.ok(!/Understand the task|Practise the action|Check your work/.test(l.title));
  }
 }
});
test('tool tracks use different real workflows and explicit device/access limits',()=>{
 const text=id=>courses.find(c=>c.id===id).lessons.map(l=>l.body).join('\n');
 assert.match(text('capcut-trim'),/puff-puff/);assert.match(text('capcut-trim'),/split/i);
 assert.match(text('premiere-trim'),/repair technician/);assert.match(text('premiere-trim'),/licence or trial/);assert.match(text('premiere-trim'),/linked sources|linked source|media paths/);
 assert.match(text('resolve-trim'),/football/);assert.match(text('resolve-trim'),/Media Pool/);assert.match(text('resolve-trim'),/not a basic-phone/);
 assert.match(text('photoshop-layout'),/layered|layers/);assert.match(text('illustrator-layout'),/vector|artboard/);
 assert.match(text('facebook-ads'),/no live spend|do not.*spend/i);assert.match(text('facebook-publish'),/mock preview|mockup/);
 assert.match(text('facebook-analytics'),/50 divided by 1,000 is 5%/);assert.match(text('facebook-analytics'),/32 divided by 400 is 8%/);assert.match(text('facebook-analytics'),/chosen comparison measure rather than claiming it is an official platform metric/);
});
test('code lesson provides executable checked example; web starters disclose static form behavior',()=>{
 const js=courses.find(c=>c.id==='code-demonstration').lessons[1].body;
 const snippet=js.split('Runnable JavaScript (paste into a local console):\n')[1].split('\nThis teaching example')[0];
 const logs=[];runInNewContext(snippet,{console:{assert:(condition)=>assert.ok(condition),log:value=>logs.push(value)}});
 assert.deepEqual(logs,['Use nonnegative numeric prices']);
 const html=courses.find(c=>c.id==='html-structure').lessons[1].body;assert.match(html,/<!doctype html>/);assert.match(html,/<label for="question">/);assert.match(html,/This form does not send messages/);assert.match(html,/button type="button"/);
 const css=courses.find(c=>c.id==='css-responsive').lessons.map(l=>l.body).join('\n');assert.match(css,/grid-template-columns:/);assert.match(css,/:focus-visible/);assert.match(css,/320, 768 and 1280/);
});
test('work examples preserve directory honesty and requirements while explaining deliverables and next action',()=>{
 assert.equal(opportunities.length,11);const skillIds=new Set(skills.map(s=>s.id));
 for(const o of opportunities){assert.equal(o.kind,'directory');assert.equal(o.last_verified,null);assert.match(o.mapping_note,/Illustrative/);assert.ok(!/pathway|projects/i.test(o.title));assert.ok(o.work_summary.length>100);assert.ok(o.deliverables.length>=3);assert.ok(o.deliverables.every(d=>d.length>25));assert.ok(o.first_step.length>100);assert.match(o.description,/not a verified vacancy/);for(const r of o.requirements)assert.ok(r.anyOf.every(id=>skillIds.has(id)));}
 assert.deepEqual(opportunities.find(o=>o.id==='11').required,['programming-demonstration','audience-explanation','learner-guidance']);
 assert.match(opportunities.find(o=>o.id==='7').first_step,/additional.*requirements/);
});
