import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Place } from '../../lib/types';

interface ListingGridProps {
  places: Place[];
}

export default function ListingGrid({ places }: ListingGridProps) {
  if (!places.length) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Places Found</h3>
        <p className="text-gray-600">Try adjusting your filters or search criteria.</p>
      </div>
    );
  }

  // Helper function to construct a valid URL
  const getValidUrl = (place: Place): string => {
    try {
      // Check if we have all required slugs
      if (!place.categorySlug) {
        console.warn('Missing categorySlug for place:', place.name, place.id);
        return '#';
      }
      
      if (!place.subcategorySlug) {
        console.warn('Missing subcategorySlug for place:', place.name, place.id);
        return '#';
      }
      
      if (!place.slug) {
        console.warn('Missing slug for place:', place.name, place.id);
        return '#';
      }
      
      // Construct the URL
      const url = `/${place.categorySlug}/${place.subcategorySlug}/${place.slug}`;
      
      // Validate the URL format
      if (url.includes('undefined') || url.includes('null')) {
        console.warn('Invalid URL constructed for place:', place.name, place.id, url);
        return '#';
      }
      
      return url;
    } catch (error) {
      console.error('Error constructing URL for place:', place.name, place.id, error);
      return '#';
    }
  };

  // Same image handling logic as ImageGallery
  const getImageUrl = (image: any) => {
    if (!image?.image_url) {
      return 'https://ik.imagekit.io/h7rza8886p/old-buildings-water-tower.jpg?updatedAt=1754994821722';
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {places.map((place, index) => (
        <Link
          key={place.id}
          href={getValidUrl(place)}
          className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
        >
          {/* Image */}
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={getImageUrl(place.images?.[0])}
              alt={`${place.name} - ${place.subcategory}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              priority={index < 3}
            />
            
            {/* Price indicator */}
            {place.price_range && (
              <div className="absolute top-0 left-0 bg-primary text-white px-3 py-1 rounded-br-lg font-semibold text-sm">
                {place.price_range}
              </div>
            )}
            
            {/* Category tag */}
            <div className="absolute bottom-0 right-0 bg-black bg-opacity-70 text-white px-3 py-1 text-sm">
              {place.subcategory}
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="font-semibold text-lg text-gray-900 group-hover:text-primary transition-colors">
              {place.name}
            </h3>
            
            <div className="mt-2 flex items-center text-sm text-gray-600">
              {place.rating && (
                <div className="flex items-center mr-4">
                  <span className="text-yellow-400 mr-1">★</span>
                  <span>{place.rating.toFixed(1)}</span>
                  {place.reviews_count && (
                    <span className="ml-1 text-gray-500">({place.reviews_count})</span>
                  )}
                </div>
              )}
              {place.price_range && (
                <span className="text-gray-500">{place.price_range}</span>
              )}
            </div>

            {place.description && (
              <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                {place.description}
              </p>
            )}
            
            {place.address && (
              <div className="mt-2 text-xs text-gray-500 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {place.address}
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}