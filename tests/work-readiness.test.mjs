import test from 'node:test';
import assert from 'node:assert/strict';
import {match} from '../lib/matching.mjs';
import {workReadiness,requirementEvidence,recommendedCourses} from '../lib/work-readiness.mjs';
const courses=[{id:'capcut',name:'CapCut editing',tool:'CapCut',outcomes:['edit']},{id:'premiere',name:'Premiere editing',tool:'Premiere Pro',outcomes:['edit']}];
const requirement={label:'Edit clips',anyOf:['edit'],matched:['edit']};
test('readiness counts requirements rather than alternative skills',()=>{
 const result=workReadiness({evidence:[{...requirement,anyOf:['edit','equivalent'],matched:['edit','equivalent']},{label:'Explain',anyOf:['explain'],matched:[]}]});
 assert.equal(result.total,2);assert.equal(result.covered,1);assert.equal(result.missingCount,1);assert.equal(result.status,'almost');
});
test('course and existing-experience origins retain actual proof context',()=>{
 const result=requirementEvidence(requirement,[{skillId:'edit',tool:'CapCut',courseId:'capcut'},{skillId:'edit',tool:'Team project'}],courses);
 assert.equal(result[0].origin,'course');assert.equal(result[0].courseName,'CapCut editing');assert.equal(result[0].context,'CapCut');assert.equal(result[1].origin,'experience');assert.equal(result[1].context,'Team project');
});
test('legacy skill with no proof never invents course provenance',()=>{
 assert.deepEqual(requirementEvidence(requirement,[],courses),[{skillId:'edit',origin:'unknown',context:null,courseName:null}]);
});
test('completed course stays missing until practical evidence exists',()=>{
 const work=match([{requirements:[{label:'Edit',anyOf:['edit']}]}],[],[])[0];
 assert.equal(workReadiness(work).covered,0);assert.equal(workReadiness(work).status,'almost');
 const recommendations=recommendedCourses(work.evidence[0],courses,['capcut']);
 assert.equal(recommendations[0].completed,true);assert.equal(recommendations[1].completed,false);
 assert.deepEqual(requirementEvidence(work.evidence[0],[],courses),[]);
});
test('tool mismatch does not earn requirement or borrow provenance from another tool',()=>{
 const opportunity={requirements:[{label:'Edit in Premiere',anyOf:['edit'],tool:'Premiere Pro'}]};
 const capcutProof={skillId:'edit',tool:'CapCut',courseId:'capcut'};
 const work=match([opportunity],['edit'],[capcutProof])[0];
 assert.equal(workReadiness(work).covered,0);assert.deepEqual(requirementEvidence(work.evidence[0],[capcutProof],courses),[]);
 assert.deepEqual(recommendedCourses(work.evidence[0],courses).map(course=>course.id),['premiere']);
 const proof={skillId:'edit',tool:'Premiere Pro',courseId:'premiere'};
 const ready=match([opportunity],['edit'],[capcutProof,proof])[0];
 assert.equal(workReadiness(ready).status,'ready');assert.deepEqual(requirementEvidence(ready.evidence[0],[capcutProof,proof],courses).map(origin=>origin.courseName),['Premiere editing']);
});
test('readiness agrees with matcher for untouched single and multi-requirement work',()=>{
 for(const [required,status] of [[['edit'],'almost'],[['edit','explain'],'explore']]){
  const work=match([{required}],[])[0];assert.equal(workReadiness(work).status,status);assert.equal(work.status,status);assert.equal(workReadiness(work).covered,0);
 }
});
test('partial demonstration or compatible learning is almost regardless of remaining gap count',()=>{
 const opportunity={requirements:['edit','caption','explain','guide'].map(id=>({anyOf:[id]}))};
 for(const work of [match([opportunity],['edit'])[0],match([opportunity],[],[],['capcut'],courses)[0]]){
  const readiness=workReadiness(work);assert.equal(readiness.status,'almost');assert.equal(readiness.status,work.status);assert.ok(readiness.missingCount>=3);
 }
 const learning=match([opportunity],[],[],['capcut'],courses)[0];assert.equal(workReadiness(learning).covered,0);assert.equal(workReadiness(learning).missingCount,4);assert.deepEqual(requirementEvidence(learning.evidence[0],[],courses),[]);
});
test('irrelevant learning and mismatched tool evidence leave multi-requirement work explore',()=>{
 const opportunity={requirements:[{anyOf:['edit'],tool:'Premiere Pro'},{anyOf:['explain']}]};
 const work=match([opportunity],['edit'],[{skillId:'edit',tool:'CapCut'}],['capcut'],courses)[0];assert.equal(workReadiness(work).status,'explore');assert.equal(workReadiness(work).covered,0);assert.equal(work.evidence[0].learned,false);
});
