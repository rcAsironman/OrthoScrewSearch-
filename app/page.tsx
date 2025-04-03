'use client'
import { useState } from "react";
import NavigationBar from "@/app/components/navigationBar";
import Search from "@/app/components/search";
import Profile from "@/app/components/profile";


export default function Home() {
  const [activeTab, setActiveTab] = useState('search');
  console.log(activeTab);
  return (
    <div className="flex h-screen bg-black">
       <div className="absolute top-10 left-12 lg:hidden xl:hidden 2xl:hidden">
        <h2 className="text-2xl font-bold tracking-wider text-blue-700">IRIS</h2>
      </div>
      <NavigationBar activeTab={activeTab} setActiveTab={setActiveTab}/>
      {activeTab === 'search' && <Search/>}
      {activeTab === 'profile' && <Profile/>}
     
    </div>
  );
}
