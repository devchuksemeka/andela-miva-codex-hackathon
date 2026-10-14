import type {Metadata} from 'next';
import Hub from '@/components/Hub';
import courses from '@/data/courses.json';

export const metadata:Metadata={title:'Opportunities · Learning Hub'};
export default function Page() {
  return <Hub courses={courses} page="opportunities"/>;
}
