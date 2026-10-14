import {match} from './matching.mjs';

/** Learning alone never grants skills. Compare the actual evidence before/after. */
export function completionWork(opportunities,before,after,outcomes=[]) {
 const previous=match(opportunities,before.earned??[],before.proofs??[]);
 const current=match(opportunities,after.earned??[],after.proofs??[]);
 const alreadyReady=new Set(previous.filter(work=>work.status==='ready').map(work=>work.id));
 const relevant=work=>work.evidence.some(requirement=>requirement.anyOf.some(id=>outcomes.includes(id)));
 return {
  newlyUnlocked:current.filter(work=>work.status==='ready'&&!alreadyReady.has(work.id)),
  ready:current.filter(work=>work.status==='ready'&&relevant(work)),
  potential:current.filter(work=>work.status!=='ready'&&relevant(work)).sort((a,b)=>a.gaps.length-b.gaps.length)
 };
}
