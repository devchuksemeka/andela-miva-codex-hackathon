/** Search public course metadata and its mapped skill names/areas, never learner data. */
export function searchCourses(courses,skills,query='',category='All courses') {
 const terms=query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
 const byId=new Map(skills.map(skill=>[skill.id,skill]));
 return courses.filter(course=>{
  if(category!=='All courses'&&course.category!==category&&!(course.areas??[]).includes(category))return false;
  const mapped=(course.outcomes??[]).map(id=>byId.get(id)).filter(Boolean);
  const text=[course.name,course.tool,course.description,course.category,...(course.areas??[]),...mapped.flatMap(skill=>[skill.name,...(skill.areas??[])])].join(' ').toLocaleLowerCase();
  return terms.every(term=>text.includes(term));
 });
}
