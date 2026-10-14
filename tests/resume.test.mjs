import test from 'node:test';import assert from 'node:assert/strict';
import {buildResume,resumeSelectionPayload} from '../lib/resume.mjs';
const courses=[{id:'learn',name:'Editing practice'}],skills=[{id:'edit',name:'Edit clips'},{id:'guide',name:'Guide learners'}],opportunities=[{id:'tutor',title:'Coding tutor',requirements:[{id:'guide',label:'Guide learners',anyOf:['guide']}]}];
const project=(id,title,skillIds)=>({id,title,description:`Actual ${title}`,contribution:'I did the work',outcome:'A reported result',tool:'Context',skillIds,confirmed:true});
const profile={fullName:'Private Name',email:'private@domain.org',location:'Private City',projects:[project('edit','Video sample',['edit','invented']),project('teach','Mentoring sample',['guide']),{...project('draft','Unconfirmed claim',['guide']),confirmed:false}],experience:[]};
test('resume excludes unconfirmed/unknown data and distinguishes completed learning from qualifications',()=>{
 const result=buildResume({profile,progress:{completedCourses:['learn','invented']},target:'tutor'},courses,skills,opportunities);assert.ok(!result.text.includes('Unconfirmed claim'));assert.ok(!result.text.includes('invented'));assert.match(result.text,/not a qualification or proof/);assert.match(result.text,/Editing practice/);assert.equal(result.mode,'local');assert.equal(result.sources[0].id,'teach');
});
test('targeting sorts selected subset by relevant skills or custom role keywords without inventing claims',()=>{
 const input={profile,selectedProjectIds:['edit','teach'],selectedExperienceIds:[]};assert.equal(buildResume({...input,target:'tutor'},courses,skills,opportunities).sources[0].id,'teach');assert.equal(buildResume({...input,target:'Video sample',jobDescription:'Video editing'},courses,skills,opportunities).sources[0].id,'edit');
 const ordered=buildResume({...input,target:'tutor',preserveSourceOrder:true},courses,skills,opportunities);assert.equal(ordered.sources[0].id,'edit');
 const empty=buildResume({...input,selectedProjectIds:['draft']},courses,skills,opportunities);assert.equal(empty.sources.length,0);assert.ok(empty.questions.length);
});
test('missing target evidence produces honest questions instead of unsupported skill claims',()=>{
 const result=buildResume({profile,selectedProjectIds:['edit'],target:'tutor'},courses,skills,opportunities);assert.ok(result.questions.some(q=>q.includes('Guide learners')));assert.ok(!result.text.includes('Self-reported skills demonstrated: Guide learners'));
});
test('provider disclosure contains only selected reviewed source descriptions and known skills, never contact fields',()=>{
 const payload=resumeSelectionPayload({profile,target:'tutor',selectedProjectIds:['teach'],selectedExperienceIds:[],jobDescription:'Help beginners'},courses,skills,opportunities);assert.deepEqual(Object.keys(payload).sort(),['jobDescription','sources','target']);assert.equal(payload.sources.length,1);assert.equal(payload.sources[0].id,'project:teach');assert.deepEqual(Object.keys(payload.sources[0]).sort(),['contribution','description','id','outcome','skillIds','tool']);const text=JSON.stringify(payload);for(const privateValue of ['Private Name','private@domain.org','Private City','Actual Video sample','Unconfirmed claim'])assert.ok(!text.includes(privateValue));
});
test('real course task evidence appears without a portfolio record and never comes from course completion alone',()=>{
 const progress={earned:['edit'],completedCourses:['learn'],proofs:[{skillId:'edit',note:'Trimmed three clips and corrected a jump cut',tool:'CapCut',courseId:'learn'}]};
 const result=buildResume({profile:{},progress},courses,skills,opportunities);assert.match(result.text,/DEMONSTRATED SKILLS/);assert.match(result.text,/Edit clips/);assert.match(result.text,/Trimmed three clips/);assert.match(result.text,/Tool\/context: CapCut/);assert.match(result.text,/Practice context: Editing practice/);assert.ok(result.sources.some(source=>source.type==='practice'&&source.title==='Edit clips'));
 const learningOnly=buildResume({profile:{},progress:{completedCourses:['learn'],earned:['edit'],proofs:[{skillId:'edit',note:'   '}]}},courses,skills,opportunities);assert.ok(!learningOnly.text.includes('DEMONSTRATED SKILLS'));assert.ok(!learningOnly.sources.some(source=>source.type==='practice'));assert.match(learningOnly.text,/COMPLETED LEARNING/);
});
test('unselected derived portfolio proofs and unknown skills cannot leak into resumes or provider payloads',()=>{
 const progress={earned:['guide','unknown'],proofs:[{skillId:'guide',note:'Private omitted project description',sourceType:'project',sourceId:'teach',tool:'Context'},{skillId:'unknown',note:'Unsupported claim'}]};
 const input={profile,progress,selectedProjectIds:['edit'],selectedExperienceIds:[],target:'tutor'};
 const result=buildResume(input,courses,skills,opportunities);assert.ok(!result.text.includes('Private omitted'));assert.ok(!result.text.includes('Unsupported claim'));assert.ok(!result.text.includes('Mentoring sample'));assert.ok(result.questions.some(q=>q.includes('Guide learners')));
 const withPractice={...input,progress:{earned:['edit'],proofs:[{skillId:'edit',note:'Private task note',tool:'CapCut'}]}};
 const payload=resumeSelectionPayload(withPractice,courses,skills,opportunities);assert.equal(payload.sources.length,1);assert.equal(payload.sources[0].id,'project:edit');assert.ok(!JSON.stringify(payload).includes('Private task note'));
});
test('base practical evidence meets exact-tool requirement prompts and duplicate notes appear once',()=>{
 const work=[{id:'edit-work',title:'Editor',requirements:[{id:'edit',label:'Edit in Premiere',anyOf:['edit'],tool:'Premiere Pro'}]}];
 const proof={skillId:'edit',tool:'Premiere Pro',note:'Edited the timeline'};const result=buildResume({profile:{},target:'edit-work',progress:{earned:['edit'],proofs:[proof,proof]}},courses,skills,work);
 assert.ok(!result.questions.some(q=>q.includes('Edit in Premiere')));assert.equal(result.sources.filter(source=>source.type==='practice').length,1);
 const mismatch=buildResume({profile:{},target:'edit-work',progress:{earned:['edit'],proofs:[{...proof,tool:'CapCut'}]}},courses,skills,work);assert.ok(mismatch.questions.some(q=>q.includes('Edit in Premiere')));
});
