'use client';
import {useI18n} from '@/components/I18nProvider';

import {useEffect,useState} from 'react';
import {Moon,Sun} from 'lucide-react';

export default function ThemeToggle() {
 const {t}=useI18n();
  const [theme,setTheme]=useState<'light'|'dark'>('light');
  useEffect(()=>{setTheme(document.documentElement.dataset.theme==='dark'?'dark':'light');},[]);
  function toggle() {
    const next=theme==='dark'?'light':'dark';
    document.documentElement.dataset.theme=next;
    setTheme(next);
    try{localStorage.setItem('hub-theme',next);}catch{/* Theme remains usable if storage is unavailable. */}
  }
  return <button type="button" className="theme-toggle" aria-label={t("Dark mode","Dark mode")} aria-pressed={theme==='dark'} onClick={toggle} title={theme==='dark'?t("Use light theme","Use light mode"):t("Use dark theme","Use dark mode")}>{theme==='dark'?<Moon size={18}/>:<Sun size={18}/>}<span>{theme==='dark'?t("Dark","Dark"):t("Light","Light")}</span></button>;
}
