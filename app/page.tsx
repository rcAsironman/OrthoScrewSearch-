'use client';

import { useState, useEffect } from 'react';
import CameraButton from '@/app/components/cameraButton';
import { AppConfig } from '@/types/config';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function Home() {
  const [config, setConfig] = useState<AppConfig | null>(null);

  useEffect(() => {
    fetch('./setup.json')
      .then((response) => response.json())
      .then((data) => {
        setConfig(data);
      })
      .catch((error) => {
        console.error('Error loading config:', error);
      });
  }, []);

  return (
    <div className="flex flex-col overflow-y-auto px-4 pt-4 pb-28 space-y-8">
      {/* Carousel Section */}
      <Carousel
        autoPlay
        infiniteLoop
        interval={3000}
        showThumbs={false}
        showStatus={false}
        dynamicHeight={false}
        className="w-full max-w-xl mx-auto rounded-md overflow-hidden"
      >
        <div>
          <img src="/carousel/img4.jpg" alt="Orthopedic screw 1" />
        </div>
        <div>
          <img src="/carousel/img1.jpeg" alt="Orthopedic screw 2" />
        </div>
        <div>
          <img src="/carousel/img2.jpg" alt="Orthopedic screw 3" />
        </div>
        <div>
          <img src="/carousel/img3.jpg" alt="Orthopedic screw 04" />
        </div>
      </Carousel>

      {/* Upload Section */}
      <div className="flex flex-col items-center space-y-4">
        <h1 className={`text-3xl font-semibold ${config?.textColor} text-center`}>
          Click below to upload image
        </h1>
        <CameraButton />
      </div>
    </div>
  );
}