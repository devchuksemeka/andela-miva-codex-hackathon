import type {Metadata} from 'next';
import './globals.css';

export const metadata:Metadata={title:'Learning Hub · Your next chapter',description:'Practical skills. Clear pathways. More possibilities.',manifest:'/manifest.webmanifest',appleWebApp:{capable:true,title:'Learning Hub'}};
const themeScript="try{var preference=localStorage.getItem('hub-theme');document.documentElement.dataset.theme=preference==='dark'||preference!=='light'&&matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}catch{document.documentElement.dataset.theme=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}";
export default function Layout({children}:{children:React.ReactNode}) {
  return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html:themeScript}}/></head><body>{children}</body></html>;
}
