'use client';

import Link from 'next/link';
import Image from 'next/image';

type ListingCardProps = {
  id: number;
  name: string;
  category: string;
  subcategory: string;
  description: string | null;
  address: string | null;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  priceRange: string;
  hours: string;
  slug?: string; // Optional slug for the listing
  useDirectLink?: boolean; // Option to use direct links for specific categories
  categorySlug?: string; // Add categorySlug prop
  subcategorySlug?: string; // Add subcategorySlug prop
  isFirstItem?: boolean; // Add this prop to identify first item
  priority?: boolean; // Add priority prop for LCP optimization
};

export default function ListingCard({
  id,
  name,
  category,
  subcategory,
  description,
  address,
  rating,
  reviewsCount,
  imageUrl,
  priceRange,
  hours,
  slug,
  useDirectLink = false,
  categorySlug,
  subcategorySlug,
  isFirstItem = false, // Default to false
  priority = false // Default to false
}: ListingCardProps) {
  
  const stars = [];
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  
  // Use provided slugs if available, otherwise generate them
  const sanitizeSlug = (text: string) => {
    if (!text) return '';
    return text
      .toLowerCase()
      .trim()
      .replace(/[\s_]+/g, '-')     // Replace spaces and underscores with hyphens
      .replace(/[^\w-]+/g, '')     // Remove all non-word chars except hyphens
      .replace(/--+/g, '-')        // Replace multiple hyphens with single hyphen
      .replace(/^-+|-+$/g, '');    // Remove leading/trailing hyphens
  };

  // First try to use the provided slugs, then try to generate them
  const finalCategorySlug = categorySlug || sanitizeSlug(category);
  const finalPlaceSlug = slug || sanitizeSlug(name);
  
  // Construct the link URL safely
  let linkUrl = '#';
  try {
    if (finalCategorySlug && finalPlaceSlug) {
      // Ensure both slugs are valid
      const validCategorySlug = sanitizeSlug(finalCategorySlug);
      const validPlaceSlug = sanitizeSlug(finalPlaceSlug);
      const validSubcategorySlug = sanitizeSlug(subcategory);
      
      if (validCategorySlug && validPlaceSlug && validSubcategorySlug) {
        // Use the provided slugs if available, otherwise use the generated ones
        linkUrl = `/${categorySlug || validCategorySlug}/${subcategorySlug || validSubcategorySlug}/${slug || validPlaceSlug}`;
      }
    }
  } catch (error) {
    console.error('Error constructing URL:', error);
  }

  // Handle image URL
  let finalImageUrl = '/images/sample_image.png';
  try {
    // If imageUrl is a JSON string, parse it
    if (typeof imageUrl === 'string' && imageUrl.startsWith('{')) {
      try {
        const parsedImage = JSON.parse(imageUrl);
        finalImageUrl = parsedImage.thumbnail || parsedImage.image_url || '/images/sample_image.png';
      } catch (e) {
        console.error('Error parsing JSON image:', e);
      }
    } else if (typeof imageUrl === 'string' && imageUrl.trim() !== '') {
      // Check if it's a Google-hosted image
      if (imageUrl.includes('googleusercontent.com')) {
        // Remove any existing size parameters
        const baseUrl = imageUrl.split('=')[0];
        // Add our desired size parameters
        finalImageUrl = `${baseUrl}=w800-h600-no`;
      } else if (imageUrl.startsWith('http')) {
        // Use the original URL directly if it's a valid HTTP(S) URL
        finalImageUrl = imageUrl;
      } else if (imageUrl.startsWith('/')) {
        // Use the URL as is if it's a local path
        finalImageUrl = imageUrl;
      }
    }

    // Only fallback to sample image if the URL is truly invalid
    if (!finalImageUrl || 
        finalImageUrl === 'undefined' || 
        finalImageUrl === 'null' ||
        finalImageUrl.includes('gps-proxy')) {
      finalImageUrl = '/images/sample_image.png';
    }
  } catch (e) {
    console.error('Error processing image URL:', e);
  }

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      // Full star
      stars.push(
        <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    } else if (i === fullStars + 1 && halfStar) {
      // Half star
      stars.push(
        <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#D1D5DB" />
            </linearGradient>
          </defs>
          <path fill="url(#half-gradient)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    } else {
      // Empty star
      stars.push(
        <svg key={i} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
  }
  
  return (
    <Link href={linkUrl} className="block group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition transform group-hover:shadow-lg group-hover:-translate-y-1 h-full">
        <div className="relative h-48 w-full bg-gray-200">
          {finalImageUrl ? (
            <div className="absolute inset-0">
              <Image
                src={finalImageUrl}
                alt={name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                priority={priority || isFirstItem}
                loading={priority || isFirstItem ? "eager" : "lazy"}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  console.error('Image failed to load:', {
                    src: target.src,
                    name: name,
                    originalUrl: imageUrl,
                    finalImageUrl: finalImageUrl,
                    timestamp: new Date().toISOString()
                  });
                  
                  // Set fallback image
                  if (target.src !== '/images/sample_image.png') {
                    target.src = '/images/sample_image.png';
                    target.onerror = null; // Prevent infinite error loop
                  }
                }}
              />
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-primary/10 text-primary">
              <span className="text-lg font-medium">{name}</span>
            </div>
          )}
          
          {/* Price indicator */}
          <div className="absolute top-0 left-0 bg-primary text-white px-3 py-1 rounded-br-lg font-semibold">
            {priceRange}
          </div>
          
          {/* Category tag */}
          <div className="absolute bottom-0 right-0 bg-black bg-opacity-70 text-white px-3 py-1 text-sm">
            {subcategory}
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary mb-1">
              {name}
            </h3>
          </div>
          
          <div className="flex items-center mb-2">
            <div className="flex mr-1">
              {stars}
            </div>
            <span className="text-sm text-gray-600">
              ({reviewsCount})
            </span>
          </div>
          
          <div className="text-xs text-gray-500">
            {address && (
              <div className="flex items-center mb-1">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {address}
              </div>
            )}
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {hours}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
} 