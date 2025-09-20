import Image from 'next/image';
import { Place } from '@/lib/types';

interface PlaceGalleryProps {
  images: Place['images'];
}

export default function PlaceGallery({ images }: PlaceGalleryProps) {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Photo Gallery</h2>
        <span className="text-sm text-gray-500">{images.length} photos</span>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => {
          // Handle Google image URLs
          let imageUrl = image.image_url;
          if (imageUrl.includes('googleusercontent.com/gps-proxy')) {
            imageUrl = 'https://images.pexels.com/photos/2079438/pexels-photo-2079438.jpeg';
          }
          
          return (
            <div key={image.id} className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src={imageUrl}
                alt={image.alt_text || `Image ${index + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
} 