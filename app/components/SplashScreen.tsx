'use client';

import { useEffect, useState } from 'react';

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(false), 2000); // Show for 2s
    return () => clearTimeout(timeout);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black transition-opacity duration-500">
      <img
        src="/logo.png"
        alt="OrthoScrewSearch Logo"
        className="w-32 h-32 mb-4"
      />
      <h1 className="text-2xl font-semibold text-white">
        OrthoScrewSearch
      </h1>
    </div>
  );
}
