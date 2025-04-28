'use client';

import { usePathname } from 'next/navigation';

export default function ClientHeader() {
  const pathname = usePathname();

  const showHeader = ["/", "/profile", "/about", "/previousImages"].includes(pathname);

  if (!showHeader) return null;

  return (
    <header className="w-screen fixed top-0 bg-primary h-[8%] z-50 flex items-center">
      <h1 className="text-secondary text-xl font-bold ml-8 tracking-widest">
        IRIS
      </h1>
    </header>
  );
}
