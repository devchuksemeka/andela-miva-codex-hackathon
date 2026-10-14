import {catalog} from '@/lib/catalog';
export async function GET(_:Request,{params}:{params:Promise<{id:string}>}){const {id}=await params;const skill=(await catalog('skills')).find(s=>s.id===id);return skill?Response.json(skill):Response.json({error:'Skill not found'},{status:404})}
