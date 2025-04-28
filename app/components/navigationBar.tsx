import Link from "next/link";
import { House, User, Info, History } from 'lucide-react';
import { usePathname } from 'next/navigation';

const BottomNav = () => {

  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 flex w-full justify-around border-t bg-white py-2 shadow-md">
      <Link href="/">
        <div className="flex cursor-pointer flex-col items-center text-gray-700">
          <div className={`size-8 rounded-full flex items-center justify-center ${pathname === '/' ? 'bg-black' : ""}`}>
          <House className={`w-6 h-6 ${pathname === '/'? 'text-white' : 'text-black'}`}/>
          </div>
          <span className="text-xs">Home</span>
        </div>
      </Link>

      <Link href="/profile">
        <div className="flex cursor-pointer flex-col items-center text-gray-700">
        <div className={`size-8 rounded-full flex items-center justify-center ${pathname === '/profile' ? 'bg-black' : ""}`}>
        <User className={`w-6 h-6 ${pathname === '/profile' ? 'text-white' : 'text-black'}`}/>
          </div>
          <span className="text-xs">Profile</span>
        </div>
      </Link>

      <Link href="/about">
        <div className="flex cursor-pointer flex-col items-center text-gray-700">
        <div className={`size-8 rounded-full flex items-center justify-center ${pathname === '/about' ? 'bg-black' : ""}`}>
          <Info className={`w-6 h-6 ${pathname === '/about' ? 'text-white' : 'text-black'}`}/>
          </div>
          <span className="text-xs">About</span>
        </div>
      </Link>

      <Link href="/previousImages">
        <div className="flex cursor-pointer flex-col items-center text-gray-700">
        <div className={`size-8 rounded-full flex items-center justify-center ${pathname === '/previousImages' ? 'bg-black' : ""}`}>
          <History className={`w-6 h-6 ${pathname === '/previousImages' ? 'text-white' : 'text-black'}`}/>
          </div>
          <span className="text-xs">History</span>
        </div>
      </Link>
    </nav>
  );
};

export default BottomNav;
