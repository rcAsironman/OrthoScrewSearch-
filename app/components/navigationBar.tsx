'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillHome } from 'react-icons/ai';
import { BsClockHistory } from 'react-icons/bs';
import { IoMdInformationCircle } from 'react-icons/io';

const BottomNav = () => {
  const pathname = usePathname();

  const navItems = [
    {
      label: 'Home',
      href: '/',
      icon: AiFillHome,
    },
    {
      label: 'History',
      href: '/previousImages',
      icon: BsClockHistory,
    },
    {
      label: 'About',
      href: '/about',
      icon: IoMdInformationCircle,
    },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 flex w-full justify-around border-t bg-white py-2 pb-6 shadow-md">
      {navItems.map(({ label, href, icon: Icon }) => {
        const isActive = pathname === href;

        return (
          <Link key={href} href={href}>
            <div
              className={`flex cursor-pointer flex-col items-center ${
                isActive ? 'text-blue-600' : 'text-gray-600'
              }`}
            >
              <Icon size={24} />
              <span className="text-xs mt-1">{label}</span>
            </div>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;