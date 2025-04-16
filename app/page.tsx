'use client'
import { useState } from "react";
import NavigationBar from "@/app/components/navigationBar";
import Search from "@/app/components/search";
import Profile from "@/app/components/profile";
import History from "./components/history";

export default function Home() {
  const [activeTab, setActiveTab] = useState('search');
  console.log(activeTab);
  return (
    <div className="flex h-screen bg-black">
      <div className="absolute top-0 bg-blue-800 w-full h-14 lg:hidden xl:hidden 2xl:hidden py-10">
        <div className="ml-6 -mt-2">
          <h2 className="text-2xl font-bold tracking-wider text-gray-300">IRIS</h2>
        </div>
      </div>
      <NavigationBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex flex-1 h-screen  items-center justify-center">
        {activeTab === 'search' && <Search />}
        {activeTab === 'history' && <History />}
        {activeTab === 'profile' && <Profile />}
      </div>

    </div>
  );
}
