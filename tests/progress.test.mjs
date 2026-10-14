import test from 'node:test';
import assert from 'node:assert/strict';
import {completeLesson,demonstrate,startCourse,courseProgress} from '../lib/progress.mjs';
import {match} from '../lib/matching.mjs';
import {readFile} from 'node:fs/promises';
const courses=JSON.parse(await readFile(new URL('../data/courses.json',import.meta.url)));
const skills=JSON.parse(await readFile(new URL('../data/skills.json',import.meta.url)));
const opportunities=JSON.parse(await readFile(new URL('../data/opportunities.json',import.meta.url)));
const initial={done:[],earned:[],completedCourses:[],proofs:[],dates:[]};
test('course completion does not grant demonstrated skills',()=>{const c=courses[0];let p=initial;for(const l of c.lessons)p=completeLesson(p,l.id,c,'2026-10-13');assert.deepEqual(p.completedCourses,[c.id]);assert.deepEqual(p.earned,[]);assert.equal(match(opportunities,p.earned)[0].status,'almost')});
test('different tool courses develop the same transferable skill',()=>{const a=courses.find(c=>c.id==='capcut-trim');const b=courses.find(c=>c.id==='premiere-trim');assert.deepEqual(a.outcomes,b.outcomes);for(const c of [a,b]){const p=demonstrate(initial,c.outcomes,{note:'Exported a reviewed 30-second edit',tool:c.tool,courseId:c.id},'2026-10-13');assert.equal(match(opportunities,p.earned)[0].status,'ready');assert.equal(p.proofs[0].tool,c.tool)}});
test('existing experience can qualify for tutoring without any course completion',()=>{const ids=['programming-demonstration','audience-explanation','learner-guidance'];const p=demonstrate(initial,ids,{note:'Guided a colleague through debugging and explained the solution',tool:'Team mentoring'},'2026-10-13');assert.deepEqual(p.completedCourses,[]);assert.equal(match(opportunities,p.earned).find(o=>o.id==='11').status,'ready')});
test('blank evidence cannot grant a skill',()=>{assert.throws(()=>demonstrate(initial,['clip-sequencing'],{note:'  '},'2026-10-13'))});
test('all course outcomes reference skills; courses can develop multiple skills',()=>{const ids=new Set(skills.map(s=>s.id));for(const c of courses)for(const id of c.outcomes)assert.ok(ids.has(id));assert.ok(courses.some(c=>c.outcomes.length>1))});
test('tool-specific opportunities require evidence for that tool',()=>{const ops=[{required:['clip-sequencing'],requirements:[{id:'editing',anyOf:['clip-sequencing'],tool:'Premiere Pro'}]}];assert.equal(match(ops,['clip-sequencing'],[{skillId:'clip-sequencing',tool:'CapCut'}])[0].status,'almost');assert.equal(match(ops,['clip-sequencing'],[{skillId:'clip-sequencing',tool:'Premiere Pro'}])[0].status,'ready')});

test('untouched courses never appear in learner progress',()=>{
 const selected=courseProgress(courses,initial);
 assert.deepEqual(selected,{started:[],continuing:[],completed:[]});
});
test('opening a course records it once without granting lessons or skills',()=>{
 const course=courses[0];const opened=startCourse(initial,course.id);
 assert.deepEqual(opened.startedCourses,[course.id]);assert.deepEqual(opened.done,[]);assert.deepEqual(opened.earned,[]);
 assert.strictEqual(startCourse(opened,course.id),opened);
 assert.deepEqual(courseProgress(courses,opened).continuing.map(c=>c.id),[course.id]);
 assert.equal(initial.startedCourses,undefined);
});
test('legacy lesson activity and course evidence count as started without inventing new progress',()=>{
 const lessonCourse=courses[0],proofCourse=courses[1];
 const legacy={...initial,done:[lessonCourse.lessons[0].id],proofs:[{courseId:proofCourse.id}]};
 assert.deepEqual(courseProgress(courses,legacy).started.map(c=>c.id),[lessonCourse.id,proofCourse.id]);
 assert.equal(legacy.startedCourses,undefined);
 assert.deepEqual(courseProgress(courses,{...initial,proofs:[{skillId:'clip-sequencing',tool:'Existing work'}]}).started,[]);
});
test('completed courses stay separate from continue learning, including legacy all-lessons completion',()=>{
 const marked=courses[0],legacy=courses[1],opened=courses[2];
 const progress={...initial,startedCourses:[opened.id],completedCourses:[marked.id],done:legacy.lessons.map(l=>l.id)};
 const selected=courseProgress(courses,progress);
 assert.deepEqual(selected.completed.map(c=>c.id),[marked.id,legacy.id]);
 assert.deepEqual(selected.continuing.map(c=>c.id),[opened.id]);
});
