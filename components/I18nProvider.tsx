'use client';
import {createContext,useContext,type ReactNode} from 'react';
export type AppLanguage='en'|'pcm';
const LanguageContext=createContext<AppLanguage>('en');
export function I18nProvider({language,children}:{language:AppLanguage;children:ReactNode}){return <LanguageContext.Provider value={language}>{children}</LanguageContext.Provider>;}
/** Keep both human-authored versions alongside each learner-facing message. */
export function useI18n(){const language=useContext(LanguageContext);return {language,t:(english:string,pidgin:string)=>language==='pcm'?pidgin:english};}
