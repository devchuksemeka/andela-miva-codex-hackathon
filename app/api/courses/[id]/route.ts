import {catalog} from '@/lib/catalog';
export async function GET(_:Request,{params}:{params:Promise<{id:string}>}){
 const {id}=await params;
 const course=catalog('courses').find(course=>course.id===id);
 return course?Response.json(course):Response.json({error:'Course not found'},{status:404});
}
