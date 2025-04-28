'use client';

import { useEffect, useState } from 'react';
import NavigationBar from '@/app/components/navigationBar';
import { AppConfig } from '@/types/config';
import { StatusBar } from '@capacitor/status-bar';
import { usePathname } from 'next/navigation';
import { ShowerHead } from 'lucide-react';

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<AppConfig | null>(null);
  const pathname = usePathname();
  const showNavigation = ["/", "/profile", "/about", "/previousImages"].includes(pathname);

  useEffect(() => {
    
    fetch('./setup.json')
      .then((res) => res.json())
      .then(setConfig)
      .catch((error) => console.error('Config load failed:', error));

      
  }, []);

  useEffect(() => {
    if (!config) return;
    StatusBar.setOverlaysWebView({ overlay: false }); // Prevents content from going behind Dynamic Island
    StatusBar.setBackgroundColor({ color: `${config?.appBackground}` });
  }, [config]);
  

  return (
    <div className={`${config?.appBackground} ${config?.textColor} min-h-screen`}> 
      {children}
      {
        showNavigation && (
          <NavigationBar/>
        )
      }
    </div>
  );
}
