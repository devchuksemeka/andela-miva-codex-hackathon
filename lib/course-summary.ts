import type courses from '@/data/courses.json';
export type CourseDetail=(typeof courses)[number];
export type CourseSummary=Omit<CourseDetail,'lessons'|'task'|'first_step'> & {
 lessons:Pick<CourseDetail['lessons'][number],'id'|'title'|'minutes'>[];
};
/** Public metadata deliberately excludes lesson bodies and practical instructions. */
export function summarizeCourse(course:CourseDetail):CourseSummary{
 const {lessons,task,first_step,...metadata}=course;
 return {...metadata,lessons:lessons.map(({id,title,minutes})=>({id,title,minutes}))};
}
