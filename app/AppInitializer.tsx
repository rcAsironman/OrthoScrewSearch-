'use client';

import { useEffect, useState } from 'react';
import SplashScreen from './components/SplashScreen';
import LayoutShell from './LayoutShell';

export default function AppInitializer({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
    return <SplashScreen />;
  }

  return <LayoutShell>{children}</LayoutShell>;
}
