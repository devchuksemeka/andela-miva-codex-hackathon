/** Requirement coverage is determined by the matcher, including tool restrictions. */
export function workReadiness(work) {
 const requirements=work.evidence??[];
 const missing=requirements.filter(requirement=>!requirement.matched.length);
 const covered=requirements.length-missing.length;
 return {total:requirements.length,covered,missingCount:missing.length,missing,status:missing.length===0?'ready':requirements.length===1||requirements.some(requirement=>requirement.matched.length>0||requirement.learned)?'almost':'explore'};
}

export function requirementEvidence(requirement,proofs,courses) {
 return requirement.matched.flatMap(skillId=>{
  const matching=proofs.filter(proof=>proof.skillId===skillId&&(!requirement.tool||proof.tool===requirement.tool));
  if(!matching.length)return [{skillId,origin:'unknown',context:null,courseName:null}];
  return matching.map(proof=>({skillId,origin:proof.sourceType==='project'?'project':proof.sourceType==='experience'?'experience':proof.courseId?'course':'experience',courseName:proof.courseId?courses.find(course=>course.id===proof.courseId)?.name??null:null,context:proof.tool||null,verification:proof.verification||'self-reported',...(proof.sourceType?{sourceType:proof.sourceType,sourceId:proof.sourceId,sourceTitle:proof.sourceTitle}:{})}));
 });
}

export function recommendedCourses(requirement,courses,completedCourses=[]) {
 if(requirement.matched.length)return [];
 return courses.filter(course=>course.outcomes.some(id=>requirement.anyOf.includes(id))&&(!requirement.tool||course.tool===requirement.tool)).map(course=>({...course,completed:completedCourses.includes(course.id)}));
}
