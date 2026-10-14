'use client';
import {useI18n} from '@/components/I18nProvider';

import {useEffect,useId,useRef,useState,type KeyboardEvent} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {UserRound,Settings,ChevronRight} from 'lucide-react';

type Props={fullName?:string};

export default function AvatarMenu({fullName=''}:Props){
 const {t}=useI18n();
 const destinations=[{href:'/profile',label:t('My profile','My profile'),description:t('Your story, projects and experience','Your story, projects and experience'),Icon:UserRound},{href:'/settings',label:t('Settings','Settings'),description:t('Language, privacy and saved progress','Language, privacy and wetin you don save'),Icon:Settings}];
 const [open,setOpen]=useState(false);
 const [focusIndex,setFocusIndex]=useState(0);
 const [position,setPosition]=useState({top:0,left:12});
 const container=useRef<HTMLDivElement>(null);
 const trigger=useRef<HTMLButtonElement>(null);
 const links=useRef<(HTMLAnchorElement|null)[]>([]);
 const id=useId();
 const pathname=usePathname();
 const name=fullName.trim();
 const initial=Array.from(name)[0]?.toLocaleUpperCase()||'Y';
 function locate(){const rect=trigger.current?.getBoundingClientRect();if(!rect)return;const width=Math.min(280,window.innerWidth-24);setPosition({left:Math.max(12,Math.min(rect.right-width,window.innerWidth-width-12)),top:Math.max(12,Math.min(rect.bottom+9,window.innerHeight-240))});}
 function openAt(index:number){locate();setFocusIndex(index);setOpen(true);}
 function dismiss(restore=false){setOpen(false);if(restore)trigger.current?.focus();}
 useEffect(()=>{setOpen(false);},[pathname]);
 useEffect(()=>{if(!open)return;const frame=requestAnimationFrame(()=>links.current[focusIndex]?.focus());return()=>cancelAnimationFrame(frame);},[open,focusIndex]);
 useEffect(()=>{
  if(!open)return;
  const leave=(event:Event)=>{if(event.target instanceof Node&&!container.current?.contains(event.target))setOpen(false);};
  document.addEventListener('pointerdown',leave);document.addEventListener('focusin',leave);
  window.addEventListener('resize',locate);window.addEventListener('scroll',locate,true);
  return()=>{document.removeEventListener('pointerdown',leave);document.removeEventListener('focusin',leave);window.removeEventListener('resize',locate);window.removeEventListener('scroll',locate,true);};
 },[open]);
 function menuKeys(event:KeyboardEvent<HTMLDivElement>){
  if(event.key==='Escape'){event.preventDefault();event.stopPropagation();dismiss(true);}
  else if(['ArrowDown','ArrowUp','Home','End'].includes(event.key)){event.preventDefault();setFocusIndex(index=>event.key==='Home'?0:event.key==='End'?destinations.length-1:event.key==='ArrowDown'?(index+1)%destinations.length:(index-1+destinations.length)%destinations.length);}
  else if(event.key===' '){event.preventDefault();links.current[focusIndex]?.click();}
  else if(event.key==='Tab'){window.setTimeout(()=>setOpen(false),0);}
 }
 return <div className="avatar-menu" ref={container}><button ref={trigger} id={`${id}-trigger`} className="avatar avatar-menu-trigger" type="button" aria-label={t("Open profile menu","Open profile menu")} aria-haspopup="menu" aria-expanded={open} aria-controls={open?`${id}-menu`:undefined} title={name||t("Profile and settings","Profile and settings")} onClick={()=>open?dismiss():openAt(0)} onKeyDown={event=>{if(['ArrowDown','ArrowUp','Home','End'].includes(event.key)){event.preventDefault();openAt(event.key==='ArrowUp'||event.key==='End'?destinations.length-1:0);}else if(event.key==='Escape'&&open){event.preventDefault();dismiss(true);}}}>{initial}</button>{open&&<div role="menu" id={`${id}-menu`} aria-labelledby={`${id}-trigger`} className="avatar-menu-panel" style={position} onKeyDown={menuKeys}><div className="avatar-menu-heading" aria-hidden="true"><span className="avatar avatar-menu-identity">{initial}</span><div><strong>{name||t("Your learning space","Your learning space")}</strong><small>{t("Profile and preferences","Profile and choices")}</small></div></div>{destinations.map(({href,label,description,Icon},index)=><Link key={href} href={href} role="menuitem" tabIndex={-1} ref={element=>{links.current[index]=element;}} aria-current={pathname===href?'page':undefined} className="avatar-menu-link" onFocus={()=>setFocusIndex(index)} onClick={()=>dismiss()}><Icon size={19} aria-hidden="true"/><span><strong>{label}</strong><small>{description}</small></span><ChevronRight size={15} aria-hidden="true"/></Link>)}</div>}</div>;
}
