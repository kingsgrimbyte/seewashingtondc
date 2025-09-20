import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names and merges Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Google Photos URL management utilities
export const GOOGLE_PHOTOS_CONFIG = {
  MAX_RETRIES: 4,
  DEFAULT_WIDTH: 800,
  DEFAULT_HEIGHT: 600,
  LARGE_WIDTH: 1200,
  LARGE_HEIGHT: 800,
} as const;

export interface GooglePhotosUrlParams {
  width?: number;
  height?: number;
  format?: 'no' | 'p' | 'k';
}

/**
 * Validates a Google Photos URL and extracts diagnostic information
 */
export function validateGooglePhotosUrl(url: string): {
  isValid: boolean;
  photoId: string | null;
  hostname: string | null;
  issues: string[];
} {
  const issues: string[] = [];
  
  if (!url.includes('googleusercontent.com')) {
    return { isValid: false, photoId: null, hostname: null, issues: ['Not a Google Photos URL'] };
  }

  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');
    const photoId = pathParts[pathParts.length - 1];
    
    // Validate photo ID format
    if (!photoId || photoId.length < 10) {
      issues.push('Photo ID is too short or missing');
    }
    
    // Check for common invalid patterns
    if (photoId.includes('undefined') || photoId.includes('null')) {
      issues.push('Photo ID contains invalid characters');
    }
    
    // Validate hostname
    if (!urlObj.hostname.match(/^lh[3-6]\.googleusercontent\.com$/)) {
      issues.push('Invalid Google Photos hostname');
    }
    
    return {
      isValid: issues.length === 0,
      photoId: photoId || null,
      hostname: urlObj.hostname,
      issues
    };
  } catch (error) {
    return { 
      isValid: false, 
      photoId: null, 
      hostname: null, 
      issues: ['Invalid URL format'] 
    };
  }
}

/**
 * Processes a Google Photos URL with different parameter strategies
 */
export function processGooglePhotosUrl(url: string, retryCount: number = 0): string {
  if (!url.includes('googleusercontent.com')) {
    return url;
  }

  try {
    // Parse the URL to extract the base and parameters
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');
    const photoId = pathParts[pathParts.length - 1];
    
    // Validate photo ID
    if (!photoId || photoId.length < 10) {
      console.warn('Invalid Google Photos ID detected:', photoId);
      return url; // Return original URL if ID is invalid
    }
    
    // Remove any existing parameters
    const baseUrl = `https://${urlObj.hostname}/p/${photoId}`;
    
    // Different parameter strategies based on retry count
    switch (retryCount) {
      case 0:
        // Original URL with standard parameters
        return `${baseUrl}=w${GOOGLE_PHOTOS_CONFIG.DEFAULT_WIDTH}-h${GOOGLE_PHOTOS_CONFIG.DEFAULT_HEIGHT}-no`;
      case 1:
        // Try with different parameters (public access)
        return `${baseUrl}=w${GOOGLE_PHOTOS_CONFIG.DEFAULT_WIDTH}-h${GOOGLE_PHOTOS_CONFIG.DEFAULT_HEIGHT}-p`;
      case 2:
        // Try with larger size
        return `${baseUrl}=w${GOOGLE_PHOTOS_CONFIG.LARGE_WIDTH}-h${GOOGLE_PHOTOS_CONFIG.LARGE_HEIGHT}-no`;
      case 3:
        // Try without size parameters
        return baseUrl;
      case 4:
        // Try with different format
        return `${baseUrl}=w${GOOGLE_PHOTOS_CONFIG.DEFAULT_WIDTH}-h${GOOGLE_PHOTOS_CONFIG.DEFAULT_HEIGHT}-k`;
      default:
        // Final fallback - try base URL
        return baseUrl;
    }
  } catch (error) {
    console.error('Error processing Google Photos URL:', error);
    return url;
  }
}

/**
 * Checks if a URL is accessible by making a HEAD request
 */
export async function checkImageAccessibility(url: string): Promise<{
  accessible: boolean;
  status?: number;
  error?: string;
}> {
  try {
    // Create a timeout controller
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(url, { 
      method: 'HEAD',
      signal: controller.signal,
      // Add headers to avoid CORS issues
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    clearTimeout(timeoutId);
    
    return {
      accessible: response.ok,
      status: response.status
    };
  } catch (error) {
    // Handle specific error types
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return {
          accessible: false,
          error: 'Request timeout (5 seconds)'
        };
      }
      if (error.message.includes('CORS')) {
        return {
          accessible: false,
          error: 'CORS error - image might be private or require authentication'
        };
      }
      if (error.message.includes('Failed to fetch')) {
        return {
          accessible: false,
          error: 'Network error - check internet connection'
        };
      }
      return {
        accessible: false,
        error: error.message
      };
    }
    
    return {
      accessible: false,
      error: 'Unknown error occurred'
    };
  }
}

/**
 * Validates if a URL is a Google Photos URL
 */
export function isGooglePhotosUrl(url: string): boolean {
  return url?.includes('googleusercontent.com') || false;
}

/**
 * Extracts the photo ID from a Google Photos URL
 */
export function extractGooglePhotosId(url: string): string | null {
  if (!isGooglePhotosUrl(url)) {
    return null;
  }

  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');
    const photoId = pathParts[pathParts.length - 1];
    
    // Validate the photo ID
    if (!photoId || photoId.length < 10 || photoId.includes('undefined') || photoId.includes('null')) {
      console.warn('Invalid Google Photos ID extracted:', photoId);
      return null;
    }
    
    return photoId;
  } catch (error) {
    console.error('Error extracting Google Photos ID:', error);
    return null;
  }
}

/**
 * Creates a Google Photos URL with custom parameters
 */
export function createGooglePhotosUrl(
  photoId: string, 
  hostname: string = 'lh5.googleusercontent.com',
  params: GooglePhotosUrlParams = {}
): string {
  // Validate photo ID
  if (!photoId || photoId.length < 10) {
    console.warn('Invalid photo ID provided to createGooglePhotosUrl:', photoId);
    return '';
  }
  
  const { 
    width = GOOGLE_PHOTOS_CONFIG.DEFAULT_WIDTH, 
    height = GOOGLE_PHOTOS_CONFIG.DEFAULT_HEIGHT, 
    format = 'no' 
  } = params;

  return `https://${hostname}/p/${photoId}=w${width}-h${height}-${format}`;
}

/**
 * Attempts to fix common Google Photos URL issues
 */
export function fixGooglePhotosUrl(url: string): string {
  if (!isGooglePhotosUrl(url)) {
    return url;
  }

  try {
    const validation = validateGooglePhotosUrl(url);
    
    if (validation.isValid) {
      return url; // URL is already valid
    }
    
    console.warn('Attempting to fix Google Photos URL:', {
      originalUrl: url,
      issues: validation.issues
    });
    
    // Try to extract a valid photo ID
    const photoId = extractGooglePhotosId(url);
    if (photoId) {
      // Create a new URL with the valid photo ID
      return createGooglePhotosUrl(photoId, 'lh5.googleusercontent.com');
    }
    
    return url; // Return original if we can't fix it
  } catch (error) {
    console.error('Error fixing Google Photos URL:', error);
    return url;
  }
} 

/**
 * Extracts a valid image URL from a place's image data.
 * Handles JSON strings, direct URLs, and provides fallbacks.
 */
export function getImageUrl(image: { image_url?: string } | undefined | null): string {
  const placeholderImage = '/images/sample_image.png';

  if (!image?.image_url) {
    return placeholderImage;
  }

  let imageUrl = image.image_url;

  // Check if imageUrl is a JSON string
  if (imageUrl.startsWith('{') && imageUrl.endsWith('}')) {
    try {
      const parsedImage = JSON.parse(imageUrl);
      imageUrl = parsedImage.thumbnail || placeholderImage;
    } catch (e) {
      console.error('Failed to parse image JSON:', imageUrl, e);
      return placeholderImage;
    }
  }
  
  // Handle gps-proxy URLs
  if (imageUrl.includes('gps-proxy')) {
    return 'https://images.pexels.com/photos/2079438/pexels-photo-2079438.jpeg';
  }

  // Basic validation to ensure it looks like a URL
  if (!imageUrl.startsWith('http') && !imageUrl.startsWith('/')) {
    return placeholderImage;
  }
  
  return imageUrl;
} 