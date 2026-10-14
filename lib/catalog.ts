import courses from '@/data/courses.json';
import skills from '@/data/skills.json';
import opportunities from '@/data/opportunities.json';
const catalogs={courses,skills,opportunities};
/** Bundled JSON is the only catalogue source; no external service or configuration. */
export function catalog<K extends keyof typeof catalogs>(kind:K):(typeof catalogs)[K]{return catalogs[kind];}
