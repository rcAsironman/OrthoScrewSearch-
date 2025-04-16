'use client';
import Image from "next/image";
import CameraButton from "./cameraButton";
import { useState } from "react";

export default function Search() {
  const [isStartSearchClicked, setIsStartSearchClicked] = useState(false);

  const onStartSearchPress = () => {
    setIsStartSearchClicked(!isStartSearchClicked);
  }

  return (
    <div className="flex-1 overflow-y-auto pt-[20%] lg:pt-4 pb-40 px-4 h-full text-white ">
      <h1 className="mt-10 text-xl font-medium lg:text-xl lg:font-bold lg:mt-10 lg:ml-4">Welcome to IRIS Search Engine</h1>
      {/*  */}

      {
        isStartSearchClicked ? (<>
          <div className="flex flex-col w-full max-w-md mx-auto gap-6 self-center mt-20">
            <main className="w-full h-80 border-2 border-gray-300 rounded-lg overflow-hidden shadow-lg flex items-center justify-center bg-black-100">
              <Image
                className="w-full h-full object-cover"
                src="/sample.jpeg"
                alt={`Sample img`}
                width={300}
                height={300}
              />
            </main>

            <div className="mt-4 flex space-x-4 justify-center">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md">
                Select Image
              </button>
              <CameraButton />
            </div>
          </div>
        </>) : (<>
          <div className=" border h-64 w-3/4 rounded-[20px] lg:w-2/4 flex items-center justify-center m-auto mt-32">
            <p>Demo video here</p>
          </div>
          <div className="bg-blue-800 h-16 w-64 rounded-[32px] flex items-center justify-center m-auto mt-16 cursor-pointer"
          onClick={onStartSearchPress}
          >
            <h1 className="text-xl font-medium">start search</h1>
          </div>
        </>)
      }
    </div>
  );
}
