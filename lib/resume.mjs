import {normalizeProfile,cleanText} from './portfolio.mjs';
const words=value=>new Set(cleanText(value,8000).toLowerCase().match(/[a-z0-9]{3,}/g)??[]);
/** @param {any} input @param {any[]} courses @param {any[]} abilities @param {any[]} opportunities */
export function buildResume(input,courses=[],abilities=[],opportunities=[]){
 const {profile:rawProfile,progress={},selectedProjectIds,selectedExperienceIds}=input;
 const profile=normalizeProfile(rawProfile);const target=cleanText(input.target,200),jobDescription=cleanText(input.jobDescription,8000);
 const opportunity=opportunities.find(item=>item.id===target);const targetLabel=opportunity?.title||target;
 const relevantIds=new Set((opportunity?.requirements??[]).flatMap(requirement=>requirement.anyOf));
 const knownSkills=new Map(abilities.map(skill=>[skill.id,skill]));const knownCourses=new Map(courses.map(course=>[course.id,course]));
 const keywords=words([targetLabel,jobDescription].join(' '));
 const score=record=>record.skillIds.filter(id=>relevantIds.has(id)).length*10+[...words([record.title,record.role,record.description,record.contribution,record.outcome,record.tool].filter(Boolean).join(' '))].filter(word=>keywords.has(word)).length;
 const select=(records,selected)=>records.filter(record=>record.confirmed&&(!Array.isArray(selected)||selected.includes(record.id))).map((record,index)=>({record,index})).sort((a,b)=>{
  // An explicit reviewed ordering (including AI-selected IDs) is authoritative.
  if(input.preserveSourceOrder&&Array.isArray(selected))return selected.indexOf(a.record.id)-selected.indexOf(b.record.id);
  return score(b.record)-score(a.record)||a.index-b.index;
 }).map(item=>item.record);
 const projects=select(profile.projects,selectedProjectIds),experience=select(profile.experience,selectedExperienceIds);
 const completed=[...new Set(Array.isArray(progress.completedCourses)?progress.completedCourses:[])].filter(id=>knownCourses.has(id)).map(id=>knownCourses.get(id));
 const earned=new Set(Array.isArray(progress.earned)?progress.earned:[]);
 const seenPractice=new Set();
 const practice=(Array.isArray(progress.proofs)?progress.proofs:[]).slice(0,100).flatMap((proof,index)=>{
  if(!proof||typeof proof!=='object'||['project','experience'].includes(proof.sourceType)||!knownSkills.has(proof.skillId)||!earned.has(proof.skillId))return [];
  const note=cleanText(proof.note,4000);if(!note)return [];
  const tool=cleanText(proof.tool,160),course=knownCourses.get(proof.courseId);
  const fingerprint=JSON.stringify([proof.skillId,note,tool,course?.id]);if(seenPractice.has(fingerprint))return [];seenPractice.add(fingerprint);
  return [{id:`${proof.skillId}-${index}`,skillId:proof.skillId,note,tool,course}];
 });
 const demonstrated=[...new Set([...projects,...experience].flatMap(record=>record.skillIds).concat(practice.map(proof=>proof.skillId)))].filter(id=>knownSkills.has(id));
 const sources=[],questions=[],lines=[];
 if(profile.fullName)lines.push(profile.fullName);else questions.push('What name should appear on your résumé?');
 if(profile.headline)lines.push(profile.headline);
 const contact=[profile.email,profile.location].filter(Boolean);if(contact.length)lines.push(contact.join(' · '));
 if(targetLabel)lines.push(`Target role: ${targetLabel}`);else questions.push('Which role or opportunity are you preparing for?');
 if(profile.summary)lines.push('\nPROFILE',profile.summary);
 if(demonstrated.length)lines.push('\nDEMONSTRATED SKILLS — self-reported',demonstrated.map(id=>knownSkills.get(id).name).join(', '));
 if(practice.length){
  lines.push('\nPRACTICAL EXAMPLES — self-reported task evidence');
  for(const proof of practice){
   const name=knownSkills.get(proof.skillId).name;
   lines.push(`\n${name}`,proof.note);
   if(proof.tool)lines.push(`Tool/context: ${proof.tool}`);
   if(proof.course)lines.push(`Practice context: ${proof.course.name} (not a qualification)`);
   sources.push({type:'practice',id:proof.id,title:name});
  }
 }
 function addRecord(record,type){
  const title=type==='project'?record.title:record.role;
  sources.push({type,id:record.id,title:title||(type==='project'?'Untitled project':'Experience')});
  const context=type==='experience'?[record.organization,record.type,[record.startDate,record.endDate].filter(Boolean).join(' – ')].filter(Boolean).join(' · '):'';
  lines.push(`\n${title||(type==='project'?'Project':'Experience')}${context?' — '+context:''}`,record.description,`My contribution: ${record.contribution}`);
  if(record.outcome)lines.push(`Reported outcome: ${record.outcome}`);
  if(record.tool)lines.push(`Tool/context: ${record.tool}`);
  const names=record.skillIds.filter(id=>knownSkills.has(id)).map(id=>knownSkills.get(id).name);
  if(names.length)lines.push(`Self-reported skills demonstrated: ${names.join(', ')}`);
  if(type==='project'&&record.url)lines.push(`Work sample: ${record.url}`);
 }
 if(projects.length){lines.push('\nPROJECTS — self-reported actual work');for(const record of projects)addRecord(record,'project');}
 if(experience.length){lines.push('\nEXPERIENCE — self-reported actual work');for(const record of experience)addRecord(record,'experience');}
 if(!projects.length&&!experience.length&&!practice.length)questions.push('Add and confirm a real project or experience with its description and your contribution.');
 if(completed.length){lines.push('\nCOMPLETED LEARNING — not a qualification or proof of proficiency');for(const course of completed){lines.push(`- ${course.name}`);sources.push({type:'course',id:course.id,title:course.name});}}
 if(opportunity){const selectedSkills=new Set(demonstrated);for(const requirement of opportunity.requirements??[])if(!requirement.anyOf.some(id=>selectedSkills.has(id)&&(!requirement.tool||([...projects,...experience].some(record=>record.skillIds.includes(id)&&record.tool===requirement.tool)||practice.some(proof=>proof.skillId===id&&proof.tool===requirement.tool)))))questions.push(`Do you have a truthful work example for ${requirement.label||requirement.id}? Do not claim it until you can describe your contribution.`);}
 lines.push('\nReview all details before sharing. Learning Hub has not independently verified these self-reported records.');
 return {text:lines.join('\n'),questions,sources,mode:'local'};
}

/** Exact data disclosed to the external selector; no contact fields or profile summary.
 * @param {any} input @param {any[]} courses @param {any[]} abilities @param {any[]} opportunities
 */
export function resumeSelectionPayload(input,courses=[],abilities=[],opportunities=[]){
 const profile=normalizeProfile(input.profile);
 const local=buildResume({...input,profile},courses,abilities,opportunities);
 const reviewed=new Set(local.sources.filter(source=>['project','experience'].includes(source.type)).map(source=>`${source.type}:${source.id}`));
 const knownIds=new Set(abilities.map(skill=>skill.id));
 const sources=[];
 for(const [sourceType,records] of [['project',profile.projects],['experience',profile.experience]])for(const record of records){
  if(reviewed.has(`${sourceType}:${record.id}`))sources.push({id:`${sourceType}:${record.id}`,description:record.description,contribution:record.contribution,outcome:record.outcome,tool:record.tool,skillIds:record.skillIds.filter(id=>knownIds.has(id))});
 }
 return {target:opportunities.find(opportunity=>opportunity.id===input.target)?.title||cleanText(input.target,200),jobDescription:cleanText(input.jobDescription,8000),sources};
}
