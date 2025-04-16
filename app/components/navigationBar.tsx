'use client'
import { useRouter } from "next/navigation";
import { IoSearch } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { FaHistory } from "react-icons/fa";

const BottomNav = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) => {

  const router = useRouter();

  return (
    <nav className="absolute bottom-0 w-full bg-gray-900 flex justify-around py-2 shadow-md lg:static lg:h-full lg:flex-col lg:w-64">
      <div className="hidden absolute top-10 lg:block lg:w-64 lg:flex lg:flex-col lg:items-center lg:justify-center">
        <h2 className="text-2xl font-bold tracking-wider text-blue-700">IRIS</h2>
        <p className="tracking-wider text-gray-300 text-xs">A powerful search engine</p>
      </div>

      <div className="flex flex-row flex-1 items-center justify-around lg:flex-col lg:flex-none lg:h-[40%] lg:mt-[-250px] xl:flex-none 2xl:flex-none ">
        <button className="flex flex-col items-center text-gray-700"
          onClick={() => setActiveTab('search')}
        >
          <div className={`rounded-full p-1 ${activeTab === 'search' ? 'bg-gray-300 lg:rounded lg:h-8 lg:w-8 lg:mb-2' : ''}`}>
            <IoSearch size={25} color={activeTab === 'search' ? 'black' : 'gray'} className="lg:h-6 lg:w-6" />
          </div>
          <span className={`text-xs ${activeTab === 'search' ? 'text-gray-300' : 'text-black-500'} lg:text-medium lg:font-medium`}>Search</span>
        </button>
        <button className="flex flex-col items-center text-gray-700"
          onClick={() => setActiveTab('history')}
        >
          <div className={`rounded-full p-1 ${activeTab === 'history' ? 'bg-gray-300 lg:rounded lg:h-8 lg:w-8 lg:mb-2' : ''} `}>
            <FaHistory size={22} color={activeTab === 'history' ? 'black' : 'gray'} className="lg:h-6 lg:w-6" />
          </div>
          <span className={`text-xs ${activeTab === 'history' ? 'text-gray-300' : 'text-black-500'} lg:text-medium lg:font-medium`}>History</span>
        </button>
        <button className="flex flex-col items-center text-gray-700"
          onClick={() => setActiveTab('profile')}
        >
          <div className={`rounded-full p-1 ${activeTab === 'profile' ? 'bg-gray-300 lg:rounded lg:h-8 lg:w-8 lg:mb-2' : ''}`}>
            <CgProfile size={25} color={activeTab === 'profile' ? 'black' : 'gray'} className="lg:h-6 lg:w-6" />
          </div>
          <span className={`text-xs ${activeTab === 'profile' ? 'text-gray-300' : 'text-black-500'} lg:text-medium lg:font-medium`}>Profile</span>
        </button>
      </div>

    </nav>
  );
};

export default BottomNav;
