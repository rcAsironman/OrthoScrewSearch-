'use client';

import {Search, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { loadStoredImages, deleteImageFromIndexedDB, clearAllImagesFromIndexedDB } from '@/app/utils/indexedDbHelpers';
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
        const formatted = storedImages.map((img) => ({
          id: img.id,
          src: img.data,
          alt: `Captured on ${img.timestamp}`,
          caption: new Date(img.timestamp).toLocaleString(),
        }));
        setImages(formatted);
      } catch (err) {
        console.error('Failed to load images', err);
      }
    };
    fetchImages();
  }, []);

  return (
    <div className={`flex min-h-screen flex-col ${config?.appBackground} ${config?.textColor} pb-32`}>
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {images.map((item, index) => (
              <div
                key={index}
                className={`overflow-hidden rounded-2xl border shadow ${config?.cardBackground} ${config?.borderColor}`}
              >
                <div className="relative aspect-video">
                  <Image
                    src={item.src || '/placeholder.svg'}
                    alt={item.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col items-start gap-2 px-4 py-3">
                  <div className="flex w-full items-center justify-between">
                    <h3 className="line-clamp-1 text-sm font-medium text-gray-400">{item.caption}</h3>
                    <div className="flex gap-2">
                      <button
                        className="size-10 rounded-full bg-blue-50 p-2 text-blue-500 hover:bg-blue-100"
                        onClick={() => router.push(`/imageGallery?imageId=${item.id}`)}
                      >
                        <Search className="size-5" />
                        <span className="sr-only">Search again</span>
                      </button>
                      <button
                        className="size-10 rounded-full bg-red-50 p-2 text-red-500 hover:bg-red-100"
                        onClick={async () => {
                          try {
                            await deleteImageFromIndexedDB(item.id);
                            setImages((prev) => prev.filter((img) => img.id !== item.id));
                          } catch (err) {
                            console.error('Failed to delete image', err);
                          }
                        }}
                      >
                        <Trash2 className="size-5" />
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

      <footer className={`mb-16 border-t px-6 py-4 pb-[env(safe-area-inset-bottom)] ${config?.borderColor}`}>
        <div className="container mx-auto flex max-w-7xl items-center justify-between px-4">
          <p className="text-xs text-gray-400">{images.length} items in history</p>
          <button
            className={`flex items-center gap-2 rounded border px-4 py-2 text-sm text-red-500 hover:bg-red-100 ${config?.borderColor}`}
            onClick={async () => {
              try {
                await clearAllImagesFromIndexedDB();
                setImages([]);
              } catch (error) {
                console.error('Failed to clear history:', error);
              }
            }}
          >
            <Trash2 className="size-4" />
            Clear History
          </button>
        </div>
      </footer>
    </div>
  );
}