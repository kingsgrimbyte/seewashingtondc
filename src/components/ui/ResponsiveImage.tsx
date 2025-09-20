'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { 
  processGooglePhotosUrl, 
  checkImageAccessibility, 
  isGooglePhotosUrl, 
  GOOGLE_PHOTOS_CONFIG 
} from '@/lib/utils';

const DEFAULT_IMAGE = '/images/sample_image.png';

// Function to proxy Google Maps images through a service
const getProxiedImageUrl = (url: string, width: number, height: number) => {
  if (url.includes('googleusercontent.com')) {
    // Use a proxy service to handle Google Maps images
    return `https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=${width}&h=${height}&fit=cover`;
  }
  return url;
};

interface ResponsiveImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  sizes?: string;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
}

export default function ResponsiveImage({
  src,
  alt,
  fill = true,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  className = "object-cover",
  priority = false,
  width = 1280,
  height = 600
}: ResponsiveImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(DEFAULT_IMAGE);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (src) {
      try {
        if (isGooglePhotosUrl(src)) {
          // Use the improved Google Photos URL processing
          const processedUrl = processGooglePhotosUrl(src, 0);
          setImgSrc(processedUrl);
        } else {
          setImgSrc(src);
        }
        setError(null);
        setRetryCount(0);
        setIsLoading(false);
      } catch (err) {
        console.error('Error processing image URL:', err);
        setImgSrc(DEFAULT_IMAGE);
        setError('Failed to process image URL');
        setIsLoading(false);
      }
    }
  }, [src]);

  const handleError = async (e: any) => {
    console.error('Image load error:', {
      attemptedSrc: imgSrc,
      error: e?.message || 'Unknown error',
      originalSrc: src,
      event: e,
      retryCount
    });

    if (retryCount < GOOGLE_PHOTOS_CONFIG.MAX_RETRIES && isGooglePhotosUrl(src)) {
      // Retry with a different URL format
      const newRetryCount = retryCount + 1;
      setRetryCount(newRetryCount);
      setIsLoading(true);
      
      const newUrl = processGooglePhotosUrl(src, newRetryCount);
      console.log(`Retrying with URL format ${newRetryCount}:`, newUrl);
      
      // Check if the new URL is accessible before setting it
      const isAccessible = await checkImageAccessibility(newUrl);
      
      if (isAccessible) {
        setImgSrc(newUrl);
      } else {
        // If not accessible, try the next format
        handleError(e);
      }
      setIsLoading(false);
    } else {
      setError('Failed to load image');
      if (imgSrc !== DEFAULT_IMAGE) {
        setImgSrc(DEFAULT_IMAGE);
      }
      setIsLoading(false);
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div style={{ position: 'relative', width: '100%', height: fill ? '100%' : 'auto' }}>
        <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
          <span className="text-gray-500 text-sm">Loading...</span>
        </div>
      </div>
    );
  }

  // If we're using fill mode, we don't need width and height
  const imageProps = fill ? {
    fill,
    sizes,
    className,
    priority,
    src: imgSrc,
    alt,
    onError: handleError,
    unoptimized: isGooglePhotosUrl(src), // Skip optimization for Google Photos
    loading: priority ? 'eager' as const : 'lazy' as const
  } : {
    width,
    height,
    className,
    priority,
    src: imgSrc,
    alt,
    onError: handleError,
    unoptimized: isGooglePhotosUrl(src), // Skip optimization for Google Photos
    loading: priority ? 'eager' as const : 'lazy' as const
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: fill ? '100%' : 'auto' }}>
      <Image {...imageProps} />
      {error && (
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: '#f0f0f0',
          color: '#666'
        }}>
          {error}
        </div>
      )}
    </div>
  );
} 