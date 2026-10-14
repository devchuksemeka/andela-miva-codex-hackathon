import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import Hub from '@/components/Hub';
import courses from '@/data/courses.json';
import opportunities from '@/data/opportunities.json';

type Props={params:Promise<{id:string}>};
export function generateStaticParams(){return opportunities.map(({id})=>({id}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{const {id}=await params;const work=opportunities.find(work=>work.id===id);return {title:work?`${work.title} · Learning Hub`:'Opportunity not found · Learning Hub'};}
export default async function Page({params}:Props){const {id}=await params;if(!opportunities.some(work=>work.id===id))notFound();return <Hub courses={courses} page="opportunities" opportunityId={id} key={id}/>;}
