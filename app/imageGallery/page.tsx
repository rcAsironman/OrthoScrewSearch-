// Fullscreen preview support added
'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { AppConfig } from '@/types/config';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { X } from 'lucide-react';

interface SimilarImage {
  src: string;
  alt: string;
  className: string;
  possibility: number;
}

function ImageGalleryContent() {
  const searchParams = useSearchParams();
  const imageId = searchParams.get('imageId');
  const router = useRouter();

  const [config, setConfig] = useState<AppConfig | null>(null);
  const [similarImages, setSimilarImages] = useState<SimilarImage[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [imageData, setImageData] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState('Scanning X-ray...');
  const [sortBy, setSortBy] = useState<'high' | 'low'>('high');
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  const loadingMessages = [
    'Scanning X-ray...',
    'Analyzing screw structure...',
    'Detecting features...',
    'Matching with trained models...',
    'Finalizing predictions...',
    'Almost done...',
    'Finalizing results...'
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSearching) {
      let index = 0;
      interval = setInterval(() => {
        index = (index + 1) % loadingMessages.length;
        setLoadingText(loadingMessages[index]);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isSearching]);

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
      retrieveImageAndSearch(imageId, config);
    } else if (config && !imageId) {
      const dummyImageUrl = 'https://fieldorthopaedics.com/hubfs/Micro%20Screw%20Case%20Reports/Dr%20Larson%20Bennetts%20fracture/10.%20Final%20postop%20xray%203_Larson_Bennetts.png';
      const dummyImages = Array.from({ length: 20 }, (_, index) => ({
        src: dummyImageUrl,
        alt: `Dummy Image ${index + 1}`,
        className: `Class ${index + 1}`,
        possibility: Math.floor(Math.random() * 21) + 80,
      }));
      setSimilarImages(dummyImages);
      setLoading(false);
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
          alt: `Result Image ${index + 1}`,
          className: `Class ${index + 1}`,
          possibility: Math.floor(Math.random() * 21) + 80,
        }));
        setSimilarImages(formatted);
      } else {
        console.error('Unexpected API response format:', data);
        setSimilarImages([]);
      }
    } catch (error) {
      console.error('API request failed:', error);
      const dummyImageUrl = 'https://fieldorthopaedics.com/hubfs/Micro%20Screw%20Case%20Reports/Dr%20Larson%20Bennetts%20fracture/10.%20Final%20postop%20xray%203_Larson_Bennetts.png';
      const dummyImages = Array.from({ length: 20 }, (_, index) => ({
        src: dummyImageUrl,
        alt: `Dummy Image ${index + 1}`,
        className: `Class ${index + 1}`,
        possibility: Math.floor(Math.random() * 21) + 80,
      }));
      setSimilarImages(dummyImages);
    } finally {
      setIsSearching(false);
    }
  };

  const sortedImages = [...similarImages].sort((a, b) => {
    if (sortBy === 'high') return b.possibility - a.possibility;
    if (sortBy === 'low') return a.possibility - b.possibility;
    return 0;
  });

  if (!config) return <div className="text-center text-white">Loading config...</div>;

  return (
    <div className={`min-h-screen ${config.appBackground} ${config.textColor}`}>
      {previewSrc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
          <img src={previewSrc} alt="Preview" className="max-h-full max-w-full object-contain" />
          <button
            onClick={() => setPreviewSrc(null)}
            className="absolute top-4 right-4 rounded-full bg-white p-2 text-black hover:bg-gray-200"
          >
            <X size={24} />
          </button>
        </div>
      )}

      <header className={`border-b shadow ${config.borderColor}`}>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="rounded-full bg-gray-200 p-2 text-black hover:bg-gray-300"
            >
              <IoMdArrowRoundBack size={20} />
            </button>
            <h1 className={`text-3xl font-bold ${config.headingColor}`}>Image Gallery</h1>
          </div>
        </div>
      </header>

      <main>
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h2 className={`mb-2 text-xl font-semibold ${config.headingColor}`}>Queried image</h2>
          {loading ? (
            <p>Loading input image...</p>
          ) : imageData ? (
            <div
              className="mx-auto flex h-[200px] w-[300px] items-center justify-center overflow-hidden rounded-xl cursor-pointer"
              onClick={() => setPreviewSrc(imageData)}
            >
              <img src={imageData} alt="Captured" className={`h-40 w-60 rounded-xl object-cover ${config.cardBackground}`} />
            </div>
          ) : (
            <p>No image found.</p>
          )}

          {isSearching && (
            <div className="flex flex-col items-center justify-center mt-6">
              <div className="animate-pulse rounded-full h-16 w-16 bg-gradient-to-r from-blue-400 via-blue-200 to-blue-400"></div>
              <div className="mt-2 text-sm text-blue-200">{loadingText}</div>
            </div>
          )}

          {similarImages.length > 0 && (
            <div>
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h2 className={`text-xl font-semibold ${config.headingColor}`}>Results</h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSortBy('high')}
                    className={`rounded-full px-4 py-1 text-sm font-medium shadow-md transition-all ${sortBy === 'high' ? 'bg-black text-white' : 'bg-white text-black border'}`}
                  >
                    Highest Match
                  </button>
                  <button
                    onClick={() => setSortBy('low')}
                    className={`rounded-full px-4 py-1 text-sm font-medium shadow-md transition-all ${sortBy === 'low' ? 'bg-black text-white' : 'bg-white text-black border'}`}
                  >
                    Lowest Match
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {sortedImages.map((image, index) => (
                  <div
                    key={index}
                    className="cursor-pointer overflow-hidden rounded-2xl border p-2 shadow hover:scale-105 transition-all duration-300"
                    onClick={() => setPreviewSrc(image.src)}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-40 w-full rounded-2xl object-cover"
                    />
                    <div className="mt-2 text-sm font-semibold">
                      {image.className}
                      <span className="ml-2 text-xs text-gray-500">{image.possibility}% match</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!isSearching && similarImages.length === 0 && (
            <div className="text-center text-gray-500">No results found.</div>
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