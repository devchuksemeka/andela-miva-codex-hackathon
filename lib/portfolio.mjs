/** @typedef {{id:string,title:string,description:string,contribution:string,outcome:string,url:string,tool:string,courseIds:string[],skillIds:string[],opportunityIds:string[],confirmed:boolean}} PortfolioProject */
/** @typedef {{id:string,role:string,organization:string,type:string,startDate:string,endDate:string,description:string,contribution:string,outcome:string,tool:string,skillIds:string[],confirmed:boolean}} PortfolioExperience */
/** @typedef {{version:1,fullName:string,email:string,headline:string,location:string,summary:string,projects:PortfolioProject[],experience:PortfolioExperience[]}} LearnerProfile */
const limits={fullName:120,email:254,headline:160,location:160,summary:3000,title:160,role:160,organization:160,type:80,description:4000,contribution:3000,outcome:2000,tool:160};
export function cleanText(value,max=4000){return typeof value==='string'?value.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g,'').trim().slice(0,max):'';}
export function safeUrl(value){const text=cleanText(value,2048);if(!text)return '';try{const url=new URL(text);return ['http:','https:'].includes(url.protocol)&&!url.username&&!url.password?url.href:'';}catch{return '';}}
function ids(value){return [...new Set(Array.isArray(value)?value.filter(id=>typeof id==='string'&&/^[a-zA-Z0-9_-]{1,100}$/.test(id)):[])].slice(0,50);}
function date(value){return typeof value==='string'&&/^\d{4}-(0[1-9]|1[0-2])$/.test(value)?value:'';}
/** @returns {LearnerProfile} */
export function emptyProfile(){return {version:1,fullName:'',email:'',headline:'',location:'',summary:'',projects:[],experience:[]};}
function records(value,kind){
 const seen=new Set();return (Array.isArray(value)?value:[]).slice(0,40).flatMap(record=>{
  if(!record||typeof record!=='object'||Array.isArray(record))return [];
  const id=cleanText(record.id,100);if(!/^[a-zA-Z0-9_-]{1,100}$/.test(id)||seen.has(id))return [];seen.add(id);
  const fields=kind==='project'?['title','description','contribution','outcome','tool']:['role','organization','type','description','contribution','outcome','tool'];
  const result={id};for(const field of fields)result[field]=cleanText(record[field],limits[field]);
  result.skillIds=ids(record.skillIds);result.confirmed=record.confirmed===true&&!!result.description&&!!result.contribution;
  if(kind==='project'){result.url=safeUrl(record.url);result.courseIds=ids(record.courseIds);result.opportunityIds=ids(record.opportunityIds);}
  else{result.startDate=date(record.startDate);result.endDate=date(record.endDate);if(result.startDate&&result.endDate&&result.endDate<result.startDate)result.endDate='';}
  return [result];
 });
}
export function normalizeProfile(input){
 const profile=emptyProfile();if(!input||typeof input!=='object'||Array.isArray(input))return profile;
 for(const field of ['fullName','email','headline','location','summary'])profile[field]=cleanText(input[field],limits[field]);
 if(profile.email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email))profile.email='';
 profile.projects=/** @type {PortfolioProject[]} */ (records(input.projects,'project'));profile.experience=/** @type {PortfolioExperience[]} */ (records(input.experience,'experience'));return profile;
}
export function portfolioEvidence(input){
 const profile=normalizeProfile(input);const proofs=[];
 for(const [sourceType,records] of [['project',profile.projects],['experience',profile.experience]])for(const record of records){
  if(!record.confirmed)continue;
  for(const skillId of record.skillIds)proofs.push({skillId,tool:record.tool,note:[record.description,`My contribution: ${record.contribution}`,record.outcome?`Outcome: ${record.outcome}`:''].filter(Boolean).join('\n'),verification:'self-reported',sourceType,sourceId:record.id,sourceTitle:sourceType==='project'?record.title:record.role});
 }
 return {earned:[...new Set(proofs.map(proof=>proof.skillId))],proofs};
}
const BASE_PROGRESS=Symbol('original-progress');
export function mergePortfolioEvidence(progress,input){
 progress=progress[BASE_PROGRESS]??progress;
 const derived=portfolioEvidence(input);
 // Derived records are rebuilt every time; never write them into the course proof store.
 const originalProofs=(Array.isArray(progress.proofs)?progress.proofs:[]).filter(proof=>!['project','experience'].includes(proof.sourceType));
 const oldDerived=new Set((progress.proofs??[]).filter(proof=>['project','experience'].includes(proof.sourceType)).map(proof=>proof.skillId));
 const originalEarned=(Array.isArray(progress.earned)?progress.earned:[]).filter(id=>!oldDerived.has(id)||originalProofs.some(proof=>proof.skillId===id));
 const merged={...progress,earned:[...new Set([...originalEarned,...derived.earned])],proofs:[...originalProofs,...derived.proofs]};
 Object.defineProperty(merged,BASE_PROGRESS,{value:progress,enumerable:false});
 return merged;
}
export function isSafePortfolioUrl(value){return !cleanText(value,2048)||!!safeUrl(value);}
