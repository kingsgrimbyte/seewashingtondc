import Link from 'next/link';
import Image from 'next/image';
import { Place } from '@/lib/types';

interface RelatedPlacesProps {
  places: Place[];
}

export default function RelatedPlaces({ places }: RelatedPlacesProps) {
  // Same image handling logic as ImageGallery
  const getImageUrl = (image: any) => {
    if (!image?.image_url) {
      return '/images/sample_image.png';
    }

    let imageUrl = image.image_url;
    
    // Handle Google image URLs
    if (imageUrl.includes('googleusercontent.com')) {
      // Ensure the URL has proper dimensions
      if (!imageUrl.includes('=w') || !imageUrl.includes('-h')) {
        imageUrl = imageUrl.replace(/\?.*$/, '') + '=w800-h600-no';
      } else {
        imageUrl = imageUrl.replace(/w\d+-h\d+(-k)?-no/, 'w800-h600-no');
      }
    }
    
    // Handle gps-proxy URLs
    if (imageUrl.includes('gps-proxy')) {
      return 'https://images.pexels.com/photos/2079438/pexels-photo-2079438.jpeg';
    }

    return imageUrl;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {places.map((place) => (
        <Link 
          key={place.id}
          href={`/${place.categorySlug}/${place.subcategorySlug}/${place.slug}`}
          className="group"
        >
          <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative aspect-video">
              <Image
                src={getImageUrl(place.images?.[0])}
                alt={place.images?.[0]?.alt_text || place.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            <div className="p-4">
              <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors">
                {place.name}
              </h3>
              
              {place.rating && (
                <div className="flex items-center mt-1">
                  <div className="flex mr-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg 
                        key={star}
                        className={`w-4 h-4 ${star <= Math.round(place.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`} 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">({place.reviews_count || 0})</span>
                </div>
              )}
              
              {place.price_range && (
                <span className="text-sm text-gray-600 mt-1 block">
                  {place.price_range}
                </span>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
} 