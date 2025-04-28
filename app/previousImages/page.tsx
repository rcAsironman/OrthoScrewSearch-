'use client';

import { ArrowLeft, Search, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { loadStoredImages, deleteImageFromIndexedDB, clearAllImagesFromIndexedDB } from '@/app/utils/indexedDbHelpers';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { AppConfig } from '@/types/config';

export default function PreviousImages() {
  const [images, setImages] = useState<{ id: string; src: string; alt: string; caption?: string }[]>([]);
  const [config, setConfig] = useState<AppConfig | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch('./setup.json')
      .then((res) => res.json())
      .then(setConfig)
      .catch(console.error);
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const storedImages = await loadStoredImages();

        // 3. Convert StoredImage[] to ImageItem[]
        const formatted = storedImages.map((img) => ({
          id: img.id,
          src: img.data,
          alt: `Captured on ${img.timestamp}`,
          caption: new Date(img.timestamp).toLocaleString()
        }));

        setImages(formatted);
      } catch (err) {
        console.error("Failed to load images", err);
      }
    };

    fetchImages();
  }, []);


  return (
    <div className="flex min-h-screen flex-col pt-[25%] pb-[25%]">
        <div
          className="container flex flex-col items-start gap-4 mb-8 "
          style={{
            paddingTop: 'env(safe-area-inset-top)',
            height: 'calc(56px + env(safe-area-inset-top))',
          }}
        >
          <div className="flex items-center justify-center gap-4">

            <h1 className={`text-lg font-semibold ${config?.headingColor} ml-4`}>Search History</h1>
            <p className="text-xs text-gray-400">
            ( {images.length} items in history )
          </p>
          </div>
          <button
          className={`rounded-full border mx-auto py-2 w-[80%] ${config?.borderColor} text-red-400 hover:bg-red-900/20 flex items-center justify-center gap-2`}
          onClick={async () => {
            try {
              await clearAllImagesFromIndexedDB();
              setImages([]); // Clear UI
            } catch (error) {
              console.error("Failed to clear history:", error);
            }
          }}
        >
          <Trash2 className='text-red-400' />
          Clear History
        </button>
        </div>
       



      <main className="flex-1">
        <div className="container py-4 px-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {images.map((item, index) => (
              <div
                key={index}
                className={`overflow-hidden border ${config?.cardBackground} ${config?.borderColor} rounded-lg`}
              >
                <div className="relative aspect-video">
                  <Image src={item.src || "/placeholder.svg"} alt={item.alt} fill className="object-cover" />
                </div>
                <div className="flex flex-col items-start gap-2 p-4">
                  <div className="flex w-full justify-between">
                    <div>
                      <h3 className="line-clamp-1 font-medium text-gray-400">{item.caption}</h3>
                    </div>
                    <div className="flex gap-12">
                      <button
                        className="size-8 text-blue-400 hover:opacity-80"
                        onClick={() => router.push(`/imageGallery?imageId=${item.id}`)}
                      >
                        <Search className="size-6" />
                        <span className="sr-only">Search again</span>
                      </button>
                      <button
                        className="size-8 text-red-500 hover:opacity-80"
                        onClick={async () => {
                          try {
                            await deleteImageFromIndexedDB(item.id);
                            setImages((prev) => prev.filter((img) => img.id !== item.id));
                          } catch (err) {
                            console.error("Failed to delete image", err);
                          }
                        }}
                      >
                        <Trash2 className="size-6" />
                        <span className="sr-only">Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>

  );
};

