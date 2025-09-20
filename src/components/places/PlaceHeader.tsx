import Link from 'next/link';
import ResponsiveImage from '@/components/ui/ResponsiveImage';
import { Place } from '@/lib/types';
import { getImageUrl } from '@/lib/utils';

interface PlaceHeaderProps {
  place: Place;
  categorySlug: string;
  subcategorySlug: string;
}

export default function PlaceHeader({ place, categorySlug, subcategorySlug }: PlaceHeaderProps) {
  const isOpen = place.hours?.[new Date().getDay()] !== 'Closed';
  
  return (
    <section className="relative h-[40vh] min-h-[300px] max-h-[500px] w-full overflow-hidden">
      <div className="h-full w-full relative">
        <ResponsiveImage 
          src={getImageUrl(place.images?.[0])}
          alt={place.images?.[0]?.alt_text || place.name}
          priority={true}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/40 to-transparent z-10"></div>
        
        <div className="absolute inset-0 z-10 flex flex-col justify-end px-4 sm:px-6 lg:px-8 pb-12">
          <div className="max-w-5xl mx-auto w-full text-white">
            <div className="mb-2">
              <Link 
                href={`/${categorySlug}/${subcategorySlug}`}
                className="px-3 py-1 bg-white/10 text-white rounded-full text-xs font-medium inline-block backdrop-blur-sm"
              >
                {place.subcategory}
              </Link>
              
              {place.price_range && (
                <span className="px-3 py-1 bg-primary text-white rounded-full text-xs font-medium ml-2 inline-block">
                  {place.price_range}
                </span>
              )}
              
              <span className={`px-3 py-1 ${isOpen ? 'bg-green-600' : 'bg-red-600'} text-white rounded-full text-xs font-medium ml-2 inline-block`}>
                {isOpen ? 'Open Now' : 'Closed'}
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">{place.name}</h1>
            
            {place.rating && (
              <div className="flex items-center mb-3">
                <div className="flex mr-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg 
                      key={star}
                      className={`w-5 h-5 ${star <= Math.round(place.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-white/90">({place.reviews_count || 0} reviews)</span>
              </div>
            )}
            
            {place.address && (
              <p className="text-white/80 flex items-center text-sm">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {place.address}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
} 