'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { AppConfig } from '@/types/config';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

interface SimilarImage {
  src: string;
  alt: string;
  name: string;
}

function ImageGalleryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const imageId = searchParams.get('imageId');

  const [config, setConfig] = useState<AppConfig | null>(null);
  const [similarImages, setSimilarImages] = useState<SimilarImage[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [imageData, setImageData] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('./setup.json')
      .then((response) => response.json())
      .then((data) => setConfig(data))
      .catch((error) => {
        console.error('Error loading config:', error);
      });
  }, []);

  useEffect(() => {
    if (config && imageId) {
      // Replace IndexedDB/API with dummy stock image data
      const stockQueriedImage =
        'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=600&q=80';

        const stockSimilarImages: SimilarImage[] = [
          {
            name: 'Mountain Trail',
            src: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=300&q=80',
            alt: 'A person hiking on a mountain trail',
          },
          {
            name: 'Forest Path',
            src: 'https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&w=300&q=80',
            alt: 'A peaceful path through dense forest',
          },
          {
            name: 'Sunset Field',
            src: 'https://images.unsplash.com/photo-1531177077031-69f4d9c85c3f?auto=format&fit=crop&w=300&q=80',
            alt: 'Golden field at sunset',
          },
          {
            name: 'Foggy Forest',
            src: 'https://images.unsplash.com/photo-1504203705544-0b3f5c4939e8?auto=format&fit=crop&w=300&q=80',
            alt: 'Misty trees in a foggy forest',
          },
          {
            name: 'Desert Cliff',
            src: 'https://images.unsplash.com/photo-1559589689-577aabd1b82e?auto=format&fit=crop&w=300&q=80',
            alt: 'Cliffside in a rocky desert area',
          },
        ];
        

      setLoading(true);
      setTimeout(() => {
        setImageData(stockQueriedImage);
        setSimilarImages(stockSimilarImages);
        setLoading(false);
      }, 1000);
    }
  }, [imageId, config]);

  const retrieveImageAndSearch = (id: string, config: AppConfig) => {
    const request = indexedDB.open('ImageStorageDB', 1);

    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction('images', 'readonly');
      const store = transaction.objectStore('images');
      const getRequest = store.get(id);

      getRequest.onsuccess = async () => {
        if (getRequest.result) {
          const base64Image = getRequest.result.data;
          setImageData(base64Image);
          setLoading(false);
          await sendPhotoToAPI(base64Image, config);
        } else {
          console.warn('No image found in IndexedDB with ID:', id);
          setSimilarImages([]);
        }
      };

      getRequest.onerror = () => {
        console.error('Error retrieving image from IndexedDB.');
      };
    };

    request.onerror = () => {
      console.error('Failed to access IndexedDB.');
    };
  };

  const sendPhotoToAPI = async (base64Image: string, config: AppConfig) => {
    setIsSearching(true);
    setSimilarImages([]);

    try {
      const { data } = await axios.post(
        config.imageApiUrl,
        { image: base64Image },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          withCredentials: false,
        }
      );

      if (data?.similar_images && Array.isArray(data.similar_images)) {
        const formatted = data.similar_images.map((url: string, index: number) => ({
          src: url,
          alt: `Similar Image ${index + 1}`,
        }));
        setSimilarImages(formatted);
      } else {
        console.error('Unexpected API response format:', data);
        setSimilarImages([]);
      }
    } catch (error) {
      console.error('API request failed:', error);
      setSimilarImages([]);
    } finally {
      setIsSearching(false);
    }
  };

  if (!config) return <div className="text-center text-white">Loading config...</div>;
  const pathname = usePathname();
  const showHeader = ["/", "/profile", "/about", "/previousImages"].includes(pathname);

  return (

    <div className={`min-h-screen ${config.appBackground} ${config.textColor}`}>
      <header className={`border-b shadow ${config.borderColor}`}>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className={`text-3xl font-bold ${config.headingColor}`}>Image Gallery</h1>
        </div>
      </header>

      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <h2 className={`mb-2 ml-4 text-xl font-semibold ${config.headingColor}`}>Queried image</h2>
          {loading ? (
            <p>Loading input image...</p>
          ) : imageData ? (
            <div className="mx-auto flex h-[200px] w-[300px] items-center justify-center overflow-hidden rounded-xl">
              <img src={imageData} alt="Captured" className={`h-40 w-60 rounded-md object-cover ${config.cardBackground}`} />
            </div>
          ) : (
            <p>No image found.</p>
          )}

          {isSearching && (
            <div className={`text-center ${config.textColor}`}>
              Searching for similar images...
            </div>
          )}

          {similarImages.length > 0 && (
            <div>
              <h2 className={`mb-4 ml-4 text-xl font-semibold ${config.headingColor}`}>
                Similar Images
              </h2>
              <div className="grid grid-cols-2 gap-4 px-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {similarImages.map((image) => (
                  <img
                  key={image.src}
                  src={image.src}
                  alt={image.alt}
                  className={`h-40 w-full rounded-md object-cover ${config.cardBackground} cursor-pointer`}
                  onClick={() => router.push(`/imageGallery/${encodeURIComponent(image.name)}`)}
                  />
                ))}
              </div>
            </div>
          )}

          {!isSearching && similarImages.length === 0 && (
            <div className="text-center text-gray-500">No similar images found.</div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function ImageGallery() {

  return (
    <Suspense fallback={<div className="text-center text-white">Loading...</div>}>

      <ImageGalleryContent />

    </Suspense>
  );
}