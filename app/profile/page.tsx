import type {Metadata} from 'next';
import Hub from '@/components/Hub';
import courses from '@/data/courses.json';

export const metadata:Metadata={title:'My profile · Learning Hub'};
export default function Page(){return <Hub courses={courses} page="profile"/>;}
