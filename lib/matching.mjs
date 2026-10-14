/** Every requirement must be met; any listed equivalent can meet a requirement.
 * Equivalence is explicit: category membership never grants another skill.
 */
export function match(opportunities, skills, proofs=[], completedCourses=[], courses=[]) {
 const earned=new Set(skills);
 const completed=new Set(completedCourses);
 const learnedCourses=courses.filter(course=>completed.has(course.id));
 return opportunities.map(o=>{
  const requirements=o.requirements??o.required.map(id=>({id,label:id,anyOf:[id]}));
  const evidence=requirements.map(r=>({...r,
   matched:r.anyOf.filter(id=>earned.has(id)&&(!r.tool||proofs.some(p=>p.skillId===id&&p.tool===r.tool))),
   learned:learnedCourses.some(course=>(!r.tool||course.tool===r.tool)&&course.outcomes.some(id=>r.anyOf.includes(id)))
  }));
  const gaps=evidence.filter(r=>r.matched.length===0);
  return {...o,evidence,gaps,missing:gaps.map(r=>r.anyOf[0]),status:gaps.length===0?'ready':requirements.length===1||evidence.some(r=>r.matched.length>0||r.learned)?'almost':'explore'};
 });
}
