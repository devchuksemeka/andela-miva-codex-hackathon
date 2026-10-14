import test from 'node:test';import assert from 'node:assert/strict';
import {emptyProfile,normalizeProfile,portfolioEvidence,mergePortfolioEvidence,safeUrl,isSafePortfolioUrl} from '../lib/portfolio.mjs';
import {requirementEvidence} from '../lib/work-readiness.mjs';
const project={id:'p1',title:'Real sample',description:'Edited a recording',contribution:'I corrected captions',outcome:'Approved by organizer',tool:'CapCut',skillIds:['caption'],courseIds:['capcut'],opportunityIds:['1'],confirmed:true};
test('normalization bounds records, strips unsafe URLs and requires actual contribution for confirmation',()=>{
 const result=normalizeProfile({fullName:' A\0da ',projects:[project,{...project,title:'duplicate'},{...project,id:'bad',contribution:''},{...project,id:'bad-url',url:'javascript:alert(1)'}],experience:[{id:'e1',description:'Work',contribution:'Guidance',confirmed:true,startDate:'2026-03',endDate:'2025-12'}]});
 assert.equal(result.fullName,'Ada');assert.equal(result.projects.length,3);assert.equal(result.projects[1].confirmed,false);assert.equal(result.projects[2].url,'');assert.equal(result.experience[0].endDate,'');assert.equal(normalizeProfile(null).version,1);
 for(const url of ['javascript:alert(1)','data:text/html,test','https://user:password@site.org','not a URL'])assert.equal(safeUrl(url),'');assert.ok(isSafePortfolioUrl(''));assert.ok(isSafePortfolioUrl('https://site.org/work'));assert.equal(isSafePortfolioUrl('ftp://site.org/work'),false);
 assert.equal(normalizeProfile({projects:Array.from({length:90},(_,i)=>({...project,id:'p'+i}))}).projects.length,40);
});
test('only confirmed records derive skills; linking courses never confers learning or proficiency',()=>{
 const profile={...emptyProfile(),projects:[project,{...project,id:'unconfirmed',confirmed:false,skillIds:['other']},{...project,id:'linked-only',skillIds:[]}]};const result=portfolioEvidence(profile);assert.deepEqual(result.earned,['caption']);assert.equal(result.proofs.length,1);assert.equal(result.proofs[0].tool,'CapCut');assert.equal(result.proofs[0].sourceType,'project');assert.equal(result.proofs[0].courseId,undefined);assert.equal(result.proofs[0].verification,'self-reported');
});
test('editing or deleting local records revokes derived evidence without changing course progress',()=>{
 const original={earned:['original'],proofs:[{skillId:'original',tool:'Premiere Pro'}],done:['lesson'],completedCourses:['course']};const before=structuredClone(original);
 const first=mergePortfolioEvidence(original,{projects:[project]});assert.deepEqual(first.earned,['original','caption']);assert.deepEqual(original,before);
 const removed=mergePortfolioEvidence(original,emptyProfile());assert.deepEqual(removed.earned,['original']);assert.equal(removed.proofs.length,1);assert.deepEqual(removed.completedCourses,['course']);
 const changed=mergePortfolioEvidence(original,{projects:[{...project,tool:'Premiere Pro',skillIds:['edit']}]});assert.deepEqual(changed.earned,['original','edit']);assert.equal(changed.proofs[1].tool,'Premiere Pro');
});
test('portfolio project provenance survives work evidence without claiming course completion',()=>{
 const proofs=portfolioEvidence({projects:[project]}).proofs;const evidence=requirementEvidence({matched:['caption']},proofs,[{id:'capcut',name:'Course'}]);assert.equal(evidence[0].origin,'project');assert.equal(evidence[0].sourceId,'p1');assert.equal(evidence[0].sourceTitle,'Real sample');assert.equal(evidence[0].courseName,null);
});

test('rebuilding an already merged view revokes derived skills but preserves independent legacy earned skill IDs',()=>{
 const original={earned:['caption'],proofs:[]};const merged=mergePortfolioEvidence(original,{projects:[project,{...project,id:'p2',skillIds:['extra']}]});
 const rebuilt=mergePortfolioEvidence(merged,emptyProfile());assert.deepEqual(rebuilt.earned,['caption']);assert.deepEqual(rebuilt.proofs,[]);assert.deepEqual(original,{earned:['caption'],proofs:[]});
});
