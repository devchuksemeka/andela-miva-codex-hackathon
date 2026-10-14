const fields=['id','title','area','owner','status','created_at','started_at','completed_at','contract','summary','completion_validation'];
const sections={acceptance:'Acceptance criteria',dependencies:'Dependencies',files:'Files',research:'Research',blockers:'Blockers',validation:'Validation'};
const line=value=>String(value??'').replace(/\r?\n/g,' ');
export function formatTask(task){
 let text=`# ${line(task.id)}: ${line(task.title)}\n\n`;
 for(const key of fields)if(task[key]!=null)text+=`- **${key}:** ${line(task[key])}\n`;
 for(const [key,title] of Object.entries(sections)){
  text+=`\n## ${title}\n\n`;
  for(const item of task[key]??[])text+=key==='acceptance'?`- [${item.done?'x':' '}] ${line(item.description)}\n`:`- ${line(typeof item==='object'?Object.entries(item).map(([k,v])=>`${k}: ${v}`).join(' | '):item)}\n`;
 }
 return text;
}
export function parseTask(text){
 const task={};for(const key of Object.keys(sections))task[key]=[];
 let section=null;
 for(const line of text.split('\n')){
  const meta=line.match(/^- \*\*([a-z_]+):\*\* (.*)$/);if(meta){task[meta[1]]=meta[2];continue}
  const heading=line.match(/^## (.*)$/);if(heading){section=Object.keys(sections).find(k=>sections[k]===heading[1]);continue}
  const check=line.match(/^- \[([ xX])\] (.*)$/);if(section==='acceptance'&&check){task.acceptance.push({done:check[1].toLowerCase()==='x',description:check[2]});continue}
  if(section&&line.startsWith('- '))task[section].push(line.slice(2));
 }
 return task;
}
