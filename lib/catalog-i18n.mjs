import pcmCourses from '../data/locales/pcm-courses.json' with {type:'json'};
import pcmSkills from '../data/locales/pcm-skills.json' with {type:'json'};
import pcmOpportunities from '../data/locales/pcm-opportunities.json' with {type:'json'};
export function localizeCourses(courses,lang){if(lang!=='pcm')return courses;return courses.map(course=>{const text=pcmCourses[course.id];if(!text)return course;const {lessons:translatedLessons,...fields}=text;return {...course,...fields,lessons:course.lessons.map(lesson=>({...lesson,...translatedLessons?.[lesson.id]}))};});}
export function localizeSkills(skills,lang){if(lang!=='pcm')return skills;return skills.map(skill=>({...skill,...pcmSkills[skill.id]}));}
export function localizeOpportunities(opportunities,lang){if(lang!=='pcm')return opportunities;return opportunities.map(work=>{const text=pcmOpportunities[work.id];if(!text)return work;const {requirementLabels,...fields}=text;return {...work,...fields,requirements:work.requirements.map(requirement=>({...requirement,label:requirementLabels?.[requirement.id]??requirement.label}))};});}
