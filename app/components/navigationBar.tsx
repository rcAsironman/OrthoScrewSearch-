'use client'
import { useRouter } from "next/navigation";
import { IoSearch } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

const BottomNav = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) => {

  const router = useRouter();

  return (
    <nav className="absolute bottom-0 w-full bg-white border-t flex justify-around py-2 shadow-md">
      <button className="flex flex-col items-center text-gray-700"
        onClick={() => setActiveTab('search')}
      >
        <div className={`rounded-full p-1 ${activeTab === 'search' ? 'bg-black' : ''}`}>
          <IoSearch size={25} color={activeTab === 'search' ? 'white' : 'gray'}/>
        </div>
        <span className={`text-xs ${activeTab === 'search'? 'text-black-500' : 'text-gray-300'}`}>Search</span>
      </button>
      <button className="flex flex-col items-center text-gray-700"
        onClick={() => setActiveTab('profile')}
      >
        <div className={`rounded-full p-1 ${activeTab === 'profile'? 'text-black-500 bg-black' : 'text-gray-300'} 
        `}>
          <CgProfile size={25} color={activeTab === 'profile' ? 'white' : 'gray'}/>
        </div>
        <span className={`text-xs ${activeTab === 'profile'? 'text-black-500' : 'text-gray-300'}`}>Profile</span>
      </button>
    </nav>
  );
};

export default BottomNav;
