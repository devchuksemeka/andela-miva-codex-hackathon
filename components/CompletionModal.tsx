'use client';
import {useI18n} from '@/components/I18nProvider';

import {useEffect,useRef} from 'react';
import Link from 'next/link';
import {X,ArrowUpRight} from 'lucide-react';

export type CompletionWork={id:string;title:string;summary:string;reason:string};
export type CompletionModalProps={mode:'course'|'practice';courseName:string;newlyUnlocked:CompletionWork[];ready:CompletionWork[];potential:CompletionWork[];onClose:()=>void;onDemonstrate:()=>void};
export default function CompletionModal({mode,courseName,newlyUnlocked,ready,potential,onClose,onDemonstrate}:CompletionModalProps){
 const {t}=useI18n();
 const panel=useRef<HTMLElement>(null);
 const close=useRef(onClose);close.current=onClose;
 useEffect(()=>{
  const previous=document.activeElement instanceof HTMLElement?document.activeElement:null;
  const overflow=document.body.style.overflow;document.body.style.overflow='hidden';
  const frame=requestAnimationFrame(()=>panel.current?.querySelector<HTMLElement>('button,a[href]')?.focus());
  const key=(event:KeyboardEvent)=>{
   if(event.key==='Escape'){event.preventDefault();close.current();return;}
   if(event.key!=='Tab')return;
   const elements=Array.from(panel.current?.querySelectorAll<HTMLElement>('button:not(:disabled),a[href],[tabindex="0"]')??[]);
   const first=elements[0],last=elements[elements.length-1];
   if(!first){event.preventDefault();return;}
   if(event.shiftKey&&(document.activeElement===first||!panel.current?.contains(document.activeElement))){event.preventDefault();last.focus();}
   else if(!event.shiftKey&&(document.activeElement===last||!panel.current?.contains(document.activeElement))){event.preventDefault();first.focus();}
  };
  document.addEventListener('keydown',key);
  return()=>{cancelAnimationFrame(frame);document.removeEventListener('keydown',key);document.body.style.overflow=overflow;previous?.focus();};
 },[]);
 const newIds=new Set(newlyUnlocked.map(work=>work.id));
 const existing=ready.filter(work=>!newIds.has(work.id));
 function cards(works:CompletionWork[]){return <div className="completion-work-grid">{works.map(work=><Link className="work-card" href={`/opportunities/${encodeURIComponent(work.id)}`} key={work.id}><h3>{work.title}</h3><p>{work.summary}</p><span className="work-reason">{work.reason==='All required skills demonstrated'?t('You have shown all the skills needed','You don show all the skills wey dem need'):work.reason==='Build these skills to unlock this work'?t('Build these skills for this work','Build these skills for this work'):work.reason}</span><ArrowUpRight size={18} aria-hidden="true"/></Link>)}</div>;}
 return <div className="modal-backdrop completion-backdrop"><section ref={panel} className="completion-dialog" role="dialog" aria-modal="true" aria-labelledby="completion-title" aria-describedby="completion-description">
  <button className="completion-close" type="button" aria-label={t("Close completion dialog","Close course finish message")} onClick={onClose}><X size={20}/></button>
  <span className="eyebrow">{t("YOUR LEARNING LEADS SOMEWHERE","YOUR LEARNING GET WHERE E DEY CARRY YOU")}</span>
  <h2 id="completion-title">{mode==='course'?t("Course finished. Your next step is practice.","Course don finish. Next, practise am."):newlyUnlocked.length?t("Your skills open new kinds of work.","Your skills don open new kinds of work."):t("Your practical work is recorded.","Your practical work don save.")}</h2>
  <p id="completion-description">{courseName}{mode==='course'?t(" is complete. Next, try the practical task to show what you can do."," don finish. Lessons help you learn; show your skills so you fit meet wetin work need."):t(": your work example is saved and confirmed by you. See which work matches your skills.",": na you confirm your work examples. Check where your skills fit carry you.")}</p>
  {mode==='course'&&<button className="primary" onClick={onDemonstrate}>{t("Show your practical skills","Show your practical skills")}</button>}
  {newlyUnlocked.length>0&&<><h3>{t(`New work your skills match (${newlyUnlocked.length})`,`New work wey your skills match (${newlyUnlocked.length})`)}</h3>{cards(newlyUnlocked)}</>}
  {existing.length>0&&<><h3>{t("Work your skills already cover","Work wey your skills match already")}</h3>{cards(existing)}</>}
  {potential.length>0&&<><h3>{t("Work to build towards","Work wey you fit build skills for")}</h3>{cards(potential)}</>}
  {mode==='practice'&&newlyUnlocked.length===0&&<p>{t("No new work matches yet. Your work example still counts; build the remaining skills to open more options.","No new work match this time. Your work example still count; build skills wey remain to open more options.")}</p>}
  {!ready.length&&!newlyUnlocked.length&&!potential.length&&<p>{t("Explore more opportunities to find the next useful skill.","Check more work to find the next useful skill.")}</p>}
  <p className="completion-disclosure">{t("These are examples of work. Check listings for requirements. Jobs are not guaranteed.","Na examples of work be these. Check the listings for wetin dem need. Job no dey guaranteed.")}</p>
  <Link className="text-button" href="/opportunities">{t("Explore all opportunities \u2192","See all work opportunities \u2192")}</Link>
 </section></div>;
}
