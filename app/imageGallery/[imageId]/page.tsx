'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { AppConfig } from '@/types/config';

interface SimilarImage {
  src: string;
  alt: string;
  accuracy: number;
  name: string;
}

const dummyImage = {
  src: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=1200&q=80',
  name: 'Sample Queried Image',
  accuracy: 92.3,
};

const dummySimilarImages: SimilarImage[] = [
  {
    src: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=600&q=80',
    alt: 'Similar Image 1',
    accuracy: 87.2,
    name: 'Mountain Trail',
  },
  {
    src: 'https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&w=600&q=80',
    alt: 'Similar Image 2',
    accuracy: 85.4,
    name: 'Forest Path',
  },
  {
    src: 'https://images.unsplash.com/photo-1531177077031-69f4d9c85c3f?auto=format&fit=crop&w=600&q=80',
    alt: 'Similar Image 3',
    accuracy: 89.9,
    name: 'Sunset Field',
  },
  {
    src: 'https://images.unsplash.com/photo-1504203705544-0b3f5c4939e8?auto=format&fit=crop&w=600&q=80',
    alt: 'Similar Image 4',
    accuracy: 83.7,
    name: 'Foggy Forest',
  },
  {
    src: 'https://images.unsplash.com/photo-1559589689-577aabd1b82e?auto=format&fit=crop&w=600&q=80',
    alt: 'Similar Image 5',
    accuracy: 90.1,
    name: 'Desert Cliff',
  },
];

export default function ImageDetailPage() {
  const { imageId } = useParams();
  const router = useRouter();

  const [image, setImage] = useState(dummyImage);
  const [similarImages, setSimilarImages] = useState<SimilarImage[]>([]);
  const [config, setConfig] = useState<AppConfig | null>(null);

  // Load theme config
  useEffect(() => {
    fetch('/setup.json')
      .then((res) => res.json())
      .then(setConfig)
      .catch((err) => console.error('Error loading config:', err));
  }, []);

  // Load current image + similar
  useEffect(() => {
    if (imageId) {
      const decoded = decodeURIComponent(imageId as string);
      const match = dummySimilarImages.find((img) => img.name === decoded);
      setImage(match || dummyImage);
      setSimilarImages(dummySimilarImages.filter((img) => img.name !== decoded));
    }
  }, [imageId]);

  if (!config) return <div className="text-center text-white">Loading config...</div>;

  return (
    <div className={`min-h-screen px-6 py-6 ${config.appBackground} ${config.textColor}`}>
      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 border border-gray-300 text-sm font-medium hover:bg-gray-100 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>

      {/* Title */}
      <h1 className={`text-3xl font-semibold mb-6 text-center tracking-tight ${config.headingColor}`}>
        Image Details
      </h1>

      {/* Queried Image */}
      <div className="w-full aspect-video overflow-hidden rounded-2xl shadow-md bg-gray-100 mb-6">
        <img src={image.src} alt={image.name} className="w-full h-full object-cover" />
      </div>

      {/* Image Info */}
      <div className="mb-12 text-center">
        <p className="text-lg font-medium">
          <span className="text-gray-700">Name:</span> {image.name}
        </p>
        <p className="text-lg font-medium">
          <span className="text-gray-700">Accuracy:</span> {image.accuracy}%
        </p>
      </div>

      {/* Similar Images */}
      <h2 className={`text-2xl font-semibold mb-4 mt-12 ${config.headingColor}`}>Similar Images</h2>
      <div className="flex overflow-x-auto space-x-6 pb-4">
        {similarImages.map((img) => (
          <div
            key={img.src}
            className={`flex-shrink-0 w-56 rounded-xl shadow hover:shadow-lg transition-shadow duration-300 border border-gray-200 ${config.cardBackground}`}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-40 object-cover rounded-t-xl cursor-pointer"
              onClick={() => router.push(`/imageGallery/${encodeURIComponent(img.src)}`)}
            />
            <div className="p-3">
              <p className="text-base font-semibold truncate">{img.name}</p>
              <p className="text-sm text-gray-500">{img.accuracy}% match</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}