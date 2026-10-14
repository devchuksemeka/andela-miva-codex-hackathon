import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import Hub from '@/components/Hub';
import courses from '@/data/courses.json';

type Props={params:Promise<{id:string}>};
export function generateStaticParams(){return courses.map(({id})=>({id}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{
  const {id}=await params;
  const course=courses.find(course=>course.id===id);
  return {title:course?`${course.name} · Learning Hub`:'Course not found · Learning Hub'};
}
export default async function Page({params}:Props){
  const {id}=await params;
  if(!courses.some(course=>course.id===id))notFound();
  return <Hub courses={courses} page="pathways" courseId={id} key={id}/>;
}
