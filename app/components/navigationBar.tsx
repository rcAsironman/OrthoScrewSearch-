'use client'
import { useRouter } from "next/navigation";
import { IoSearch } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

const BottomNav = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) => {

  const router = useRouter();

  return (
    <nav className="absolute bottom-0 w-full bg-gray-900 border-t flex justify-around py-2 shadow-md lg:static lg:h-full lg:flex-col lg:w-64 lg:justify-evenly">
      <div className="hidden absolute top-10 left-24 lg:block ">
        <h2 className="text-2xl font-bold tracking-wider text-blue-700">IRIS</h2>
      </div>
      <button className="flex flex-col items-center text-gray-700"
        onClick={() => setActiveTab('search')}
      >
        <div className={`rounded-full p-1 ${activeTab === 'search' ? 'bg-black' : ''} lg:hidden`}>
          <IoSearch size={25} color={activeTab === 'search' ? 'white' : 'gray'} />
        </div>
        <span className={`text-xs ${activeTab === 'search' ?  'text-gray-300': 'text-black-500'} lg:text-xl lg:font-medium`}>Search</span>
      </button>
      <button className="flex flex-col items-center text-gray-700"
        onClick={() => setActiveTab('profile')}
      >
        <div className={`rounded-full p-1 ${activeTab === 'profile' ? 'text-black-500 bg-black' : 'text-gray-300 '} 
        lg:hidden`}>
          <CgProfile size={25} color={activeTab === 'profile' ? 'white' : 'gray'} />
        </div>
        <span className={`text-xs ${activeTab === 'profile' ? 'text-gray-300': 'text-black-500'} lg:text-xl lg:font-medium`}>Profile</span>
      </button>
    </nav>
  );
};

export default BottomNav;
