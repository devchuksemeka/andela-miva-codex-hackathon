export function completeLesson(progress, lessonId, course, date) {
 const done=[...new Set([...progress.done,lessonId])];
 const completed=course.lessons.every(l=>done.includes(l.id));
 return {...progress,done,completedCourses:completed?[...new Set([...progress.completedCourses,course.id])]:progress.completedCourses,dates:[...new Set([...progress.dates,date])]};
}
export function demonstrate(progress, skillIds, evidence, date) {
 if(!evidence.note.trim())throw new Error('Describe what you made or demonstrated.');
 return {...progress,earned:[...new Set([...progress.earned,...skillIds])],proofs:[...progress.proofs,...skillIds.map(skillId=>({...evidence,skillId,date,verification:'self-reported'}))],dates:[...new Set([...progress.dates,date])]};
}

/** Opening a course starts learning without implying a completed lesson or skill. */
export function startCourse(progress,courseId) {
 if((progress.startedCourses??[]).includes(courseId))return progress;
 return {...progress,startedCourses:[...(progress.startedCourses??[]),courseId]};
}

/** Old browser progress predates startedCourses; infer its real course activity. */
export function courseProgress(courses,progress) {
 const opened=new Set(progress.startedCourses??[]);
 const done=new Set(progress.done??[]);
 const completedIds=new Set(progress.completedCourses??[]);
 const proofCourses=new Set((progress.proofs??[]).map(proof=>proof.courseId).filter(Boolean));
 const isCompleted=course=>completedIds.has(course.id)||(course.lessons.length>0&&course.lessons.every(lesson=>done.has(lesson.id)));
 const started=courses.filter(course=>opened.has(course.id)||completedIds.has(course.id)||proofCourses.has(course.id)||course.lessons.some(lesson=>done.has(lesson.id)));
 return {started,continuing:started.filter(course=>!isCompleted(course)),completed:started.filter(isCompleted)};
}
