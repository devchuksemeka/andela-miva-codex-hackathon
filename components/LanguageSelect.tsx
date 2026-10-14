'use client';
import {useI18n} from '@/components/I18nProvider';

import {useEffect,useRef,useState,type KeyboardEvent} from 'react';
import {Globe,ChevronDown,Check} from 'lucide-react';

export type InterfaceLanguage='en'|'pcm';
type Props={id:string;value:InterfaceLanguage;onChange:(language:InterfaceLanguage)=>void;compact?:boolean};

export default function LanguageSelect({id,value,onChange,compact=false}:Props){
 const {t}=useI18n();
 const languages:[InterfaceLanguage,string,string][]=[['en','English',t('App and courses in English','App and courses for English')],['pcm','Nigerian Pidgin',t('App and courses in Nigerian Pidgin','App and courses for Nigerian Pidgin')]];
 const [open,setOpen]=useState(false);
 const [focusIndex,setFocusIndex]=useState(0);
 const [position,setPosition]=useState({top:0,left:12});
 const container=useRef<HTMLDivElement>(null);
 const trigger=useRef<HTMLButtonElement>(null);
 const options=useRef<(HTMLButtonElement|null)[]>([]);
 function positionMenu(){const rect=trigger.current?.getBoundingClientRect();if(!rect)return;const width=Math.min(260,window.innerWidth-24);setPosition({top:Math.max(12,Math.min(rect.bottom+9,window.innerHeight-210)),left:Math.max(12,Math.min(rect.right-width,window.innerWidth-width-12))});}
 function openAt(index:number){positionMenu();setFocusIndex(index);setOpen(true);}
 function dismiss(restore=false){setOpen(false);if(restore)trigger.current?.focus();}
 function select(language:InterfaceLanguage){onChange(language);dismiss(true);}
 useEffect(()=>{if(!open)return;const frame=requestAnimationFrame(()=>options.current[focusIndex]?.focus());return()=>cancelAnimationFrame(frame);},[open,focusIndex]);
 useEffect(()=>{
  if(!open)return;
  const leave=(event:Event)=>{if(event.target instanceof Node&&!container.current?.contains(event.target))setOpen(false);};
  document.addEventListener('pointerdown',leave);document.addEventListener('focusin',leave);
  window.addEventListener('resize',positionMenu);window.addEventListener('scroll',positionMenu,true);
  return()=>{document.removeEventListener('pointerdown',leave);document.removeEventListener('focusin',leave);window.removeEventListener('resize',positionMenu);window.removeEventListener('scroll',positionMenu,true);};
 },[open]);
 function menuKeys(event:KeyboardEvent<HTMLDivElement>){
  if(event.key==='Escape'){event.preventDefault();event.stopPropagation();dismiss(true);}
  else if(['ArrowDown','ArrowUp','Home','End'].includes(event.key)){event.preventDefault();setFocusIndex(index=>event.key==='Home'?0:event.key==='End'?languages.length-1:event.key==='ArrowDown'?(index+1)%languages.length:(index-1+languages.length)%languages.length);}
  else if(event.key==='Tab'){window.setTimeout(()=>setOpen(false),0);}
 }
 if(!compact)return <div className="language-select"><label htmlFor={id}><Globe size={16} aria-hidden="true"/>{t("Language","Language")}</label><select id={id} value={value} onChange={event=>onChange(event.target.value as InterfaceLanguage)} aria-describedby={`${id}-help`}><option value="en">English</option><option value="pcm">Nigerian Pidgin</option></select><p id={`${id}-help`} className="language-coverage-note">{t('Choose the language you prefer. Linked websites may use English. Your choice is saved on this device.','Choose language wey you prefer. Websites wey we link fit use English. Your choice dey saved for this device.')}</p></div>;
 return <div className="header-language-menu" ref={container}><button className="header-language-trigger" id={id} ref={trigger} type="button" aria-label={`Language: ${value==='pcm'?'Nigerian Pidgin':'English'}`} aria-haspopup="menu" aria-expanded={open} aria-controls={open?`${id}-menu`:undefined} aria-describedby={`${id}-help`} onClick={()=>open?dismiss():openAt(value==='pcm'?1:0)} onKeyDown={event=>{if(event.key==='ArrowDown'||event.key==='ArrowUp'||event.key==='Home'||event.key==='End'){event.preventDefault();openAt(event.key==='ArrowUp'||event.key==='End'?languages.length-1:0);}else if(event.key==='Escape'&&open){event.preventDefault();dismiss(true);}}}><Globe size={17} aria-hidden="true"/><span>{value==='pcm'?'Pidgin':'English'}</span><ChevronDown size={14} aria-hidden="true" className={open?'language-chevron-open':''}/></button><p id={`${id}-help`} className="visually-hidden">{t('Choose the language you prefer. Linked websites may use English.','Choose language wey you prefer. Websites wey we link fit use English.')}</p>{open&&<div className="language-menu-panel" id={`${id}-menu`} role="menu" aria-labelledby={id} onKeyDown={menuKeys} style={position}><span className="language-menu-heading" aria-hidden="true">{t("Choose your language","Choose your language")}</span>{languages.map(([language,label,description],index)=><button key={language} type="button" role="menuitemradio" aria-checked={value===language} tabIndex={-1} ref={element=>{options.current[index]=element;}} className="language-menu-option" onFocus={()=>setFocusIndex(index)} onClick={()=>select(language)}><span className="language-option-check">{value===language&&<Check size={18} aria-hidden="true"/>}</span><span><strong>{label}</strong><small>{description}</small></span></button>)}<p className="language-menu-note">{t('Linked websites may use English.','Websites wey we link fit use English.')}</p></div>}</div>;
}
