'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  processGooglePhotosUrl, 
  checkImageAccessibility, 
  isGooglePhotosUrl, 
  validateGooglePhotosUrl,
  fixGooglePhotosUrl,
  GOOGLE_PHOTOS_CONFIG 
} from '@/lib/utils';

interface ClientImageProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  sizes?: string;
}

// Function to process image URLs like ImageGallery does
const processImageUrl = (imageUrl: string): string => {
  // Handle GPS proxy URLs - replace with fallback
  if (imageUrl.includes('gps-proxy')) {
    return 'https://images.pexels.com/photos/2079438/pexels-photo-2079438.jpeg';
  }
  
  // Handle Google Photos URLs
  if (imageUrl.includes('googleusercontent.com')) {
    // Ensure the URL has proper dimensions
    if (!imageUrl.includes('=w') || !imageUrl.includes('-h')) {
      imageUrl = imageUrl.replace(/\?.*$/, '') + '=w1280-h600-no';
    } else {
      // Handle both formats: =w800-h600-no and =w203-h135-k-no
      imageUrl = imageUrl
        .replace(/=w\d+-h\d+(-k)?-no/, '=w1280-h600-no')
        .replace(/-k-no/, '-no');
    }
  }
  
  return imageUrl;
};

export default function ClientImage({ src, alt, className, fill, sizes }: ClientImageProps) {
  const [imgSrc, setImgSrc] = useState(src || '/images/sample_image.png');
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const placeholderImage = '/images/sample_image.png';

  useEffect(() => {
    if (src && src !== imgSrc) {
      // Process the URL like ImageGallery does
      let processedSrc = processImageUrl(src);
      
      // For Google Photos URLs, apply additional validation and fixing
      if (isGooglePhotosUrl(processedSrc)) {
        const validation = validateGooglePhotosUrl(processedSrc);
        
        if (!validation.isValid) {
          console.warn('Invalid Google Photos URL detected:', {
            url: processedSrc,
            issues: validation.issues,
            photoId: validation.photoId
          });
          
          // Try to fix the URL
          const fixedUrl = fixGooglePhotosUrl(processedSrc);
          if (fixedUrl !== processedSrc) {
            console.log('Attempting to use fixed URL:', fixedUrl);
            processedSrc = fixedUrl;
          }
        }
      }
      
      setImgSrc(processedSrc);
      setHasError(false);
      setRetryCount(0);
      setIsLoading(false);
    }
  }, [src]);

  const handleError = async (error: any) => {
    console.error('ClientImage: Error loading image:', {
      attemptedSrc: imgSrc,
      error: error?.message || 'Unknown error',
      originalSrc: src,
      retryCount
    });
    
    // Add detailed diagnostics for Google Photos URLs
    if (isGooglePhotosUrl(src)) {
      const validation = validateGooglePhotosUrl(src);
      console.error('Google Photos URL diagnostics:', {
        url: src,
        validation,
        retryCount
      });
    }
    
    // Handle GPS proxy URLs - replace with fallback immediately
    if (src.includes('gps-proxy')) {
      console.log('GPS proxy URL detected, using fallback image');
      setHasError(true);
      setImgSrc('https://images.pexels.com/photos/2079438/pexels-photo-2079438.jpeg');
      setIsLoading(false);
      return;
    }
    
    if (retryCount < GOOGLE_PHOTOS_CONFIG.MAX_RETRIES && isGooglePhotosUrl(src)) {
      // Try different Google Photos URL formats
      const newRetryCount = retryCount + 1;
      setRetryCount(newRetryCount);
      
      const newUrl = processGooglePhotosUrl(src, newRetryCount);
      console.log(`Retrying with URL format ${newRetryCount}:`, newUrl);
      
      // Check if the new URL is accessible before setting it
      setIsLoading(true);
      const accessibilityResult = await checkImageAccessibility(newUrl);
      
      if (accessibilityResult.accessible) {
        setImgSrc(newUrl);
      } else {
        console.warn(`URL not accessible (attempt ${newRetryCount}):`, {
          url: newUrl,
          status: accessibilityResult.status,
          error: accessibilityResult.error
        });
        
        // If not accessible, try the next format
        handleError(error);
      }
      setIsLoading(false);
    } else {
      // Final fallback to placeholder
      setHasError(true);
      setImgSrc(placeholderImage);
      setIsLoading(false);
      
      // Log final failure for debugging
      if (isGooglePhotosUrl(src)) {
        console.error('All Google Photos URL attempts failed:', {
          originalUrl: src,
          totalRetries: retryCount,
          finalAttempt: imgSrc
        });
      }
    }
  };

  // Don't render the image if src is empty or null
  if (!src) {
    return (
      <div className={`relative ${className}`}>
        <Image
          src={placeholderImage}
          alt={alt}
          fill={fill}
          sizes={sizes}
          className="object-cover"
        />
      </div>
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className={`relative ${className}`}>
        <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
          <span className="text-gray-500 text-sm">Loading...</span>
        </div>
      </div>
    );
  }

  // For Google Photos URLs, use unoptimized to avoid Next.js optimization issues
  if (isGooglePhotosUrl(src) && !hasError) {
    return (
      <Image
        src={imgSrc}
        alt={alt}
        className={className}
        fill={fill}
        sizes={sizes}
        onError={handleError}
        unoptimized={true}
        priority={false}
        loading="lazy"
      />
    );
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      className={className}
      fill={fill}
      sizes={sizes}
      onError={handleError}
      unoptimized={hasError} // Skip optimization for fallback images
      loading="lazy"
    />
  );
} 