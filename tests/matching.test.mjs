import test from 'node:test';import assert from 'node:assert/strict';import {match} from '../lib/matching.mjs';
const opportunities=[{id:'stack',required:['video','social']},{id:'single',required:['video']}];
test('requires every skill for ready status',()=>{const result=match(opportunities,['video']);assert.equal(result[0].status,'almost');assert.deepEqual(result[0].missing,['social']);assert.equal(result[1].status,'ready')});
test('skill stacking unlocks the combined pathway',()=>{assert.equal(match(opportunities,['video','social'])[0].status,'ready')});
test('unknown and duplicate skills do not change matching',()=>{assert.equal(match(opportunities,['unknown','video','video'])[0].missing.length,1)});
const atomic=[{id:'editor',required:['capcut-trim'],requirements:[{id:'trim',label:'Clip sequencing',anyOf:['capcut-trim','premiere-trim']}]},{id:'facebook',required:['facebook-publish','facebook-analytics'],requirements:[{id:'publish',anyOf:['facebook-publish']},{id:'analytics',anyOf:['facebook-analytics']}]},{id:'instagram',required:['instagram-publish']}];
test('CapCut and Premiere evidence satisfy the same editing requirement',()=>{for(const id of ['capcut-trim','premiere-trim']){const result=match(atomic,[id])[0];assert.equal(result.status,'ready');assert.deepEqual(result.evidence[0].matched,[id])}});
test('Facebook skills qualify for Facebook work without Instagram experience',()=>{const result=match(atomic,['facebook-publish','facebook-analytics']);assert.equal(result[1].status,'ready');assert.equal(result[2].status,'almost')});
test('knowing a tool or broad category alone grants no atomic skill',()=>{assert.equal(match(atomic,['CapCut','video','social'])[0].status,'almost')});
test('one alternative satisfies only its requirement, not another action',()=>{const result=match([{required:[],requirements:[{id:'trim',anyOf:['capcut-trim','premiere-trim']},{id:'captions',anyOf:['capcut-captions','premiere-captions']}]}],['capcut-trim','premiere-trim'])[0];assert.equal(result.status,'almost');assert.deepEqual(result.missing,['capcut-captions'])});
test('an opportunity may demand a specific tool',()=>{const result=match([{required:['premiere-trim'],requirements:[{id:'trim',anyOf:['premiere-trim']}]}],['capcut-trim'])[0];assert.equal(result.status,'almost')});
test('seed requirement references resolve to atomic modules',async()=>{const {readFile}=await import('node:fs/promises');const skills=JSON.parse(await readFile(new URL('../data/skills.json',import.meta.url)));const opportunities=JSON.parse(await readFile(new URL('../data/opportunities.json',import.meta.url)));const ids=new Set(skills.map(s=>s.id));for(const opportunity of opportunities)for(const requirement of opportunity.requirements){assert.ok(requirement.anyOf.length);for(const id of requirement.anyOf)assert.ok(ids.has(id),`Unknown atomic skill: ${id}`)}assert.ok(skills.every(s=>s.areas.length>0&&s.name&&s.task));});
const learningCourses=[{id:'cut',tool:'CapCut',outcomes:['edit']},{id:'premiere',tool:'Premiere Pro',outcomes:['edit']},{id:'unrelated',tool:'Canva',outcomes:['layout']}];
const broadWork={requirements:['edit','caption','publish','report'].map(id=>({id,anyOf:[id]}))};
test('single requirement remains almost without skills; multiple unmet requirements are explore',()=>{
 assert.equal(match([{required:['edit']}],[])[0].status,'almost');
 assert.equal(match([{required:['edit','caption']}],[])[0].status,'explore');
 assert.equal(match([broadWork],[])[0].status,'explore');
});
test('one demonstrated relevant skill yields almost even with more than two gaps',()=>{
 const work=match([broadWork],['edit'])[0];assert.equal(work.status,'almost');assert.equal(work.gaps.length,3);
});
test('completed relevant course indicates learning without demonstrating any requirement',()=>{
 const work=match([broadWork],[],[],['cut'],learningCourses)[0];assert.equal(work.status,'almost');assert.equal(work.evidence[0].learned,true);assert.equal(work.gaps.length,4);assert.ok(work.evidence.every(r=>r.matched.length===0));
});
test('uncompleted unrelated and incompatible-tool courses do not create relevant learning',()=>{
 const work={requirements:[{id:'edit',anyOf:['edit'],tool:'Premiere Pro'},{id:'caption',anyOf:['caption']}]};
 for(const completed of [[],['cut'],['unrelated'],['unknown']]){
  const result=match([work],[],[],completed,learningCourses)[0];assert.equal(result.status,'explore');assert.ok(result.evidence.every(r=>r.learned===false));
 }
 const compatible=match([work],[],[],['premiere'],learningCourses)[0];assert.equal(compatible.status,'almost');assert.equal(compatible.evidence[0].learned,true);assert.equal(compatible.gaps.length,2);
});
test('all demonstrated requirements remain ready regardless of course completion',()=>{
 const work=match([broadWork],['edit','caption','publish','report'],[],[],learningCourses)[0];assert.equal(work.status,'ready');assert.ok(work.evidence.every(r=>r.learned===false));
});
