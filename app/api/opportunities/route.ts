import {catalog} from '@/lib/catalog';
import {match} from '@/lib/matching.mjs';
export async function GET(req:Request){
 const params=new URL(req.url).searchParams;
 const earned=params.get('skills')?.split(',').filter(Boolean)??[];
 const completed=params.get('courses')?.split(',').filter(Boolean)??[];
 return Response.json(match(await catalog('opportunities'),earned,[],completed,await catalog('courses')));
}
