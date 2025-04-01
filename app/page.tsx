'use client'
import { useState } from "react";
import NavigationBar from "@/app/components/navigationBar";
import Search from "@/app/components/search";
import Profile from "@/app/components/profile";


export default function Home() {
  const [activeTab, setActiveTab] = useState('search');
  console.log(activeTab);
  return (
    <div className="flex items-center justify-center h-screen relative bg-white">
      {activeTab === 'search' && <Search/>}
      {activeTab === 'profile' && <Profile/>}
      <NavigationBar activeTab={activeTab} setActiveTab={setActiveTab}/>
    </div>
  );
}
