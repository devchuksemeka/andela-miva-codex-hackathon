import {catalog} from '@/lib/catalog';
export async function GET(_:Request,{params}:{params:Promise<{id:string}>}){
 const {id}=await params;
 const skill=catalog('skills').find(skill=>skill.id===id);
 if(!skill)return Response.json({error:'Skill not found'},{status:404});
 return Response.json({skill,courses:catalog('courses').filter(course=>course.outcomes.includes(id))});
}
