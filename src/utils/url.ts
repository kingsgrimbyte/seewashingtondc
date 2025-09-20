import { headers } from 'next/headers';

export async function getCanonicalUrl(): Promise<string> {
  // Try to get URL from headers first (set by middleware)
  try {
    const headersList = await headers();
    const headerUrl = headersList.get('x-url');
    
    if (headerUrl) {
      return headerUrl;
    }
  } catch (error) {
    // Headers might not be available in some contexts
    console.error('Error accessing headers:', error);
  }
  
  // Fallback to default URL
  return 'https://seewashington.com';
}

/**
 * Creates a dynamic canonical URL for a specific path
 * @param path The path segment to append to the base URL
 * @returns The full canonical URL
 */
export function getDynamicCanonicalUrl(path: string): string {
  // Remove leading slash if present for consistency
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  // Return placeholder that will be replaced by client-side script
  // The path will be preserved while the domain will be dynamically replaced
  return `__DYNAMIC_URL_BASE__/${cleanPath}`;
} 