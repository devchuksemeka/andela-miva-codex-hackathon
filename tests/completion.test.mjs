import test from 'node:test';
import assert from 'node:assert/strict';
import {completionWork} from '../lib/completion.mjs';
const work=[{id:'edit',requirements:[{label:'Edit',anyOf:['edit']}]},{id:'tutor',requirements:[{label:'Code',anyOf:['code']},{label:'Explain',anyOf:['explain']}]},{id:'premiere',requirements:[{label:'Premiere editing',anyOf:['edit'],tool:'Premiere Pro'}]}];
const initial={earned:[],proofs:[]};
test('course completion alone shows potential without falsely unlocking work',()=>{
 const result=completionWork(work,initial,{...initial,completedCourses:['editing']},['edit']);
 assert.deepEqual(result.newlyUnlocked,[]);assert.deepEqual(result.ready,[]);assert.deepEqual(result.potential.map(w=>w.id),['edit','premiere']);
});
test('stacked demonstrated skills unlock combined work while unrelated potential stays out',()=>{
 const before={earned:['code'],proofs:[]};const after={earned:['code','explain'],proofs:[]};
 const result=completionWork(work,before,after,['explain']);
 assert.deepEqual(result.newlyUnlocked.map(w=>w.id),['tutor']);assert.deepEqual(result.potential,[]);
});
test('already covered work remains ready but is never called newly unlocked',()=>{
 const progress={earned:['edit'],proofs:[{skillId:'edit',tool:'CapCut'}]};
 const result=completionWork(work,progress,progress,['edit']);
 assert.deepEqual(result.newlyUnlocked,[]);assert.deepEqual(result.ready.map(w=>w.id),['edit']);assert.deepEqual(result.potential.map(w=>w.id),['premiere']);
});
test('new tool-specific evidence can unlock work even when the skill was already earned',()=>{
 const before={earned:['edit'],proofs:[{skillId:'edit',tool:'CapCut'}]};
 const after={...before,proofs:[...before.proofs,{skillId:'edit',tool:'Premiere Pro'}]};
 assert.deepEqual(completionWork(work,before,after,['edit']).newlyUnlocked.map(w=>w.id),['premiere']);
});

test('relevant work with three missing skills remains potential, sorted by gaps, without unrelated work',()=>{
 const opportunities=[
  {id:'tutor',requirements:[{label:'Code',anyOf:['code']},{label:'Explain',anyOf:['explain']},{label:'Guide',anyOf:['guide']}]},
  {id:'demo',requirements:[{label:'Code',anyOf:['code']}]},
  {id:'unrelated',requirements:[{label:'Design',anyOf:['design']}]}
 ];
 const result=completionWork(opportunities,initial,initial,['code']);
 assert.deepEqual(result.newlyUnlocked,[]);assert.deepEqual(result.ready,[]);
 assert.deepEqual(result.potential.map(work=>work.id),['demo','tutor']);
 assert.equal(result.potential[1].status,'explore');assert.equal(result.potential[1].gaps.length,3);
});
