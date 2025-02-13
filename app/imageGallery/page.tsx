import ImageGrid from "../../components/imageGrid"
import {useEffect, useState} from "react"
import { pipeline } from "@huggingface/transformers"
import { useSearchParams } from "next/navigation"

const sampleImages = [
  { src: "/assets/cat.jpg", alt: "Sample Image 1", caption: "Image 1" },
  { src: "/assets/cat.jpg", alt: "Sample Image 2", caption: "Image 2" },
  { src: "/assets/cat.jpg", alt: "Sample Image 3", caption: "Image 3" },
  { src: "/assets/cat.jpg", alt: "Sample Image 4", caption: "Image 4" },
  { src: "/assets/cat.jpg", alt: "Sample Image 5", caption: "Image 5" },
  { src: "/assets/cat.jpg", alt: "Sample Image 6", caption: "Image 6" },
]

export default function imageDisplay() {
  const searchParams = useSearchParams()
  const base64Image = searchParams.get("image")

  const [similarImages, setSimilarImages] = useState<{src: string, alt: string}[]>([]);
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState<any | null>(null);

  // Load the model

  useEffect(() => {
     const loadModel = async () => {
      setLoading(true);
      try {
        const imagePipeline = await pipeline ("image-classification", "Qwen/Qwen2.5-VL-7B-Instruct");
        setModel(() => imagePipeline);
      } catch (error) {
        console.error("Error loading model:", error);

      } 
    } 
    loadModel();
  }, []);

  const base64ToBlob = (base64: string) => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: 'image/jpeg' });
  };

  useEffect(() => {
    if (base64Image && model) {
      fetchSimilarImages(base64Image);
    }
  }, [base64Image, model]);

  const fetchSimilarImages = async (image: string) => {
    setLoading(true);
    try {
      //convert base64 to blob
      const imageBlob = base64ToBlob(image);

      const results = await model(imageBlob);
      console.log(results);

      const similarImages = results.map((result: any) => {
        return { src: result.image, alt: result.label };
      });
      setSimilarImages(similarImages);
    } catch (error) {
      console.error("Error fetching similar images:", error);
    }
    setLoading(false);
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Image Gallery</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <ImageGrid images={sampleImages} />
        </div>
      </main>
    </div>
  )
}
