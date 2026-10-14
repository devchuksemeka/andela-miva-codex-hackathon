import {readFile,writeFile,mkdir,rename,access,readdir} from 'node:fs/promises';
import path from 'node:path';
import {formatTask,parseTask} from './task-markdown.mjs';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const args=process.argv.slice(2);const [command,id]=args;
const option=name=>{const i=args.indexOf('--'+name);return i<0?undefined:args[i+1]};
const exists=async p=>{try{await access(p);return true}catch{return false}};
const json=async p=>p.endsWith('.md')?parseTask(await readFile(p,'utf8')):JSON.parse(await readFile(p,'utf8'));
const save=async(p,d)=>{await mkdir(path.dirname(p),{recursive:true});const tmp=p+'.tmp';await writeFile(tmp,p.endsWith('.md')?formatTask(d):JSON.stringify(d,null,2)+'\n');await rename(tmp,p)};
const location=state=>path.join(root,'context','features',state,id+'.md');
const ledger=path.join(root,'context','CHANGELOG.json');
async function log(entries){await save(ledger,entries);const rows=entries.map(e=>`## ${e.id} — ${e.title}\n\n- Status: **${e.status}**\n- Owner: ${e.owner}; area: ${e.area}\n- Started: ${e.started_at}${e.completed_at?'\n- Completed: '+e.completed_at:''}\n- Task: [record](${e.task.replace(/^context\//,'')})${e.summary?'\n- Result: '+e.summary:''}${e.validation?'\n- Validation: '+e.validation:''}\n`);await writeFile(path.join(root,'context','CHANGELOG.md'),'# Changelog\n\nGenerated from CHANGELOG.json. Started work appears here immediately; completed tasks retain an archive link. Earlier app work predates this ledger; see features/INDEX.md.\n\n'+rows.join('\n'))}
try{
 if(command==='help'||!command){console.log('create ID --title TEXT --area frontend|backend|both|coordination --owner ROLE --acceptance TEXT\nstart ID\ncomplete ID --summary TEXT --validation TEXT [--not-applicable]\nlist\nreconcile');process.exit(0)}
 if(command==='reconcile'){
  const recovered=[];
  for(const state of ['backlog','active','archive']){
   const dir=path.join(root,'context','features',state);await mkdir(dir,{recursive:true});
   for(const file of (await readdir(dir)).filter(f=>f.endsWith('.md'))){
    const t=await json(path.join(dir,file));
    if(!/^FEAT-\d{3}-[a-z0-9]+(?:-[a-z0-9]+)*$/.test(t.id)||file!==t.id+'.md')throw Error('Invalid task record: '+file);
    const destination=t.status==='completed'?'archive':t.status==='in_progress'?'active':'backlog';
    if(destination!==state){const target=path.join(root,'context','features',destination,file);await mkdir(path.dirname(target),{recursive:true});if(await exists(target))throw Error('Conflicting task records for '+t.id);await rename(path.join(dir,file),target)}
    if(t.status!=='backlog'&&!recovered.some(e=>e.id===t.id))recovered.push({id:t.id,title:t.title,area:t.area,owner:t.owner,status:t.status,started_at:t.started_at,task:`context/features/${destination}/${file}`,...(t.completed_at?{completed_at:t.completed_at,summary:t.summary,validation:t.completion_validation}:{})});
   }
  }
  await log(recovered.sort((a,b)=>a.started_at.localeCompare(b.started_at)));console.log('Rebuilt changelog from task records');process.exit(0);
 }
 if(command==='list'){for(const state of ['backlog','active','archive']){const {readdir}=await import('node:fs/promises');const dir=path.join(root,'context','features',state);const files=await exists(dir)?await readdir(dir):[];for(const file of files.filter(f=>f.endsWith('.md'))){const t=await json(path.join(dir,file));console.log(`${t.id}\t${t.status}\t${t.owner}\t${t.title}`)}}process.exit(0)}
 for(const state of ['backlog','active','archive'])await mkdir(path.join(root,'context','features',state),{recursive:true});
 if(!id||!/^FEAT-\d{3}-[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id))throw Error('Use FEAT-XXX-task-name, for example FEAT-005-course-filter');
 const entries=await exists(ledger)?await json(ledger):[];
 if(command==='create'){
  for(const state of ['backlog','active','archive'])if(await exists(location(state)))throw Error('Task ID already exists');
  if(entries.some(e=>e.id.slice(0,8)===id.slice(0,8)))throw Error('Feature number already exists in changelog');
  for(const state of ['backlog','active','archive'])if((await readdir(path.join(root,'context','features',state))).some(f=>f.startsWith(id.slice(0,9))))throw Error('Feature number already exists');
  const title=option('title'),area=option('area'),owner=option('owner'),acceptance=option('acceptance');
  if(!title||!owner||!acceptance||!['frontend','backend','both','coordination'].includes(area))throw Error('Provide title, valid area, owner and acceptance');
  await save(location('backlog'),{id,title,area,owner,status:'backlog',created_at:new Date().toISOString(),acceptance:[{description:acceptance,done:false}],dependencies:[],files:[],research:[],contract:null,blockers:[],validation:[]});
 }else if(command==='start'){
  if(await exists(location('active'))||entries.some(e=>e.id===id))throw Error('Task has already started');
  const task=await json(location('backlog'));
  for(const dep of task.dependencies??[])if(!entries.some(e=>e.id===dep&&e.status==='completed'))throw Error(`Dependency ${dep} is not complete`);
  task.status='in_progress';task.started_at=new Date().toISOString();await save(location('backlog'),task);await rename(location('backlog'),location('active'));entries.push({id,title:task.title,area:task.area,owner:task.owner,status:task.status,started_at:task.started_at,task:`context/features/active/${id}.md`});await log(entries);
 }else if(command==='complete'){
  const task=await json(location('active'));const entry=entries.find(e=>e.id===id);const summary=option('summary'),validation=option('validation');
  if(!entry||entry.status!=='in_progress')throw Error('Task has no active changelog entry');
  if(!task.acceptance?.length||task.acceptance.some(a=>!a.done)||task.blockers?.length)throw Error('Check acceptance items and resolve blockers first');
  if(!summary?.trim()||!validation?.trim())throw Error('Provide summary and validation');
  if(!task.validation?.length&&!args.includes('--not-applicable'))throw Error('Record validation evidence on the active task first');
  task.status='completed';task.completed_at=new Date().toISOString();task.summary=summary;task.completion_validation=validation;await save(location('active'),task);await rename(location('active'),location('archive'));Object.assign(entry,{status:'completed',completed_at:task.completed_at,summary,validation,task:`context/features/archive/${id}.md`});await log(entries);
 }else throw Error('Unknown command');
 console.log(`${id}: ${command} succeeded`);
}catch(error){console.error(error.message);process.exitCode=1}
