'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import NavigationBar from '@/app/components/navigationBar';
import Header from '@/app/components/Header';
import { AppConfig } from '@/types/config';
import { Capacitor } from '@capacitor/core';
import { StatusBar } from '@capacitor/status-bar';

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<AppConfig | null>(null);
  const pathname = usePathname();

  // Only show Header and BottomNav for these routes
  const tabBarRoutes = ['/', '/previousImages', '/about'];
  const showTabUI = tabBarRoutes.includes(pathname);

  useEffect(() => {
    fetch('./setup.json')
      .then((res) => res.json())
      .then(setConfig)
      .catch((error) => console.error('Config load failed:', error));
  }, []);

  useEffect(() => {
    if (!config) return;

    if (Capacitor.getPlatform() !== 'web') {
      StatusBar.setOverlaysWebView({ overlay: false });
      StatusBar.setBackgroundColor({ color: config.appBackground });
    }
  }, [config]);

  return (
    <div className={`${config?.appBackground} ${config?.textColor} min-h-screen flex flex-col`}>
      {showTabUI && <Header />}
      <main className="flex-1 w-full">{children}</main>
      {showTabUI && <NavigationBar />}
    </div>
  );
}