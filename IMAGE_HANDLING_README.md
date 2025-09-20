# Image Handling System - Google Photos URL Management

This document explains the improved image handling system for managing Google Photos URLs in the Washington DC project.

## Overview

The image handling system has been enhanced to properly manage Google Photos URLs with automatic retry logic, error handling, and fallback strategies. The system includes utility functions, reusable components, and comprehensive error handling.

## Components

### 1. ClientImage Component
Located at `src/components/ui/ClientImage.tsx` and `src/components/common/ClientImage.tsx`

**Features:**
- Automatic Google Photos URL detection and processing
- Multiple retry strategies with different URL formats
- Loading states with skeleton animation
- Error fallback to placeholder images
- Accessibility checking before setting new URLs

**Usage:**
```tsx
import ClientImage from '@/components/ui/ClientImage';

<ClientImage
  src="https://lh5.googleusercontent.com/p/AF1QipNxd9t8C-6gu3SNxvZpx0PIgnnnWyF5NcLwr20A=w800-h600-no"
  alt="Description"
  fill
  className="rounded-lg"
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

### 2. ResponsiveImage Component
Located at `src/components/ui/ResponsiveImage.tsx`

**Features:**
- Responsive image handling with proxy fallback
- Google Photos URL processing
- Error handling with visual feedback
- Optimized for responsive layouts

**Usage:**
```tsx
import ResponsiveImage from '@/components/ui/ResponsiveImage';

<ResponsiveImage
  src="https://lh5.googleusercontent.com/p/AF1QipNxd9t8C-6gu3SNxvZpx0PIgnnnWyF5NcLwr20A=w800-h600-no"
  alt="Description"
  fill
  className="rounded-lg"
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

## Utility Functions

Located at `src/lib/utils.ts`

### Core Functions

#### `processGooglePhotosUrl(url: string, retryCount: number = 0): string`
Processes Google Photos URLs with different parameter strategies based on retry count.

**Retry Strategies:**
- **Retry 0**: Standard parameters (`=w800-h600-no`)
- **Retry 1**: Public access parameters (`=w800-h600-p`)
- **Retry 2**: Larger size (`=w1200-h800-no`)
- **Retry 3**: No parameters (base URL)
- **Retry 4**: Different format (`=w800-h600-k`)

#### `checkImageAccessibility(url: string): Promise<boolean>`
Checks if a URL is accessible by making a HEAD request with timeout.

#### `isGooglePhotosUrl(url: string): boolean`
Validates if a URL is a Google Photos URL.

#### `extractGooglePhotosId(url: string): string | null`
Extracts the photo ID from a Google Photos URL.

#### `createGooglePhotosUrl(photoId: string, hostname?: string, params?: GooglePhotosUrlParams): string`
Creates a Google Photos URL with custom parameters.

**Parameters:**
```typescript
interface GooglePhotosUrlParams {
  width?: number;    // Default: 800
  height?: number;   // Default: 600
  format?: 'no' | 'p' | 'k';  // Default: 'no'
}
```

## Configuration

### Google Photos Configuration
```typescript
export const GOOGLE_PHOTOS_CONFIG = {
  MAX_RETRIES: 4,
  DEFAULT_WIDTH: 800,
  DEFAULT_HEIGHT: 600,
  LARGE_WIDTH: 1200,
  LARGE_HEIGHT: 800,
} as const;
```

### Next.js Image Configuration
The `next.config.ts` file includes proper domain configuration for Google Photos:

```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'lh3.googleusercontent.com',
    },
    {
      protocol: 'https',
      hostname: 'lh4.googleusercontent.com',
    },
    {
      protocol: 'https',
      hostname: 'lh5.googleusercontent.com',
    },
    {
      protocol: 'https',
      hostname: 'lh6.googleusercontent.com',
    },
    {
      protocol: 'https',
      hostname: '**',
    }
  ],
  // ... other config
}
```

## Error Handling

### Automatic Retry Logic
1. **Initial Load**: Tries the original URL
2. **Retry 1**: Changes format from `-no` to `-p` (public access)
3. **Retry 2**: Increases size to 1200x800
4. **Retry 3**: Removes all parameters
5. **Retry 4**: Tries different format `-k`
6. **Final Fallback**: Shows placeholder image

### Loading States
- Skeleton animation during retry attempts
- Visual feedback for loading states
- Graceful degradation to placeholder images

### Error Logging
Comprehensive error logging for debugging:
```typescript
console.error('ClientImage: Error loading image:', {
  attemptedSrc: imgSrc,
  error: error?.message || 'Unknown error',
  originalSrc: src,
  retryCount
});
```

## Best Practices

### 1. URL Format
Google Photos URLs should follow this pattern:
```
https://lh5.googleusercontent.com/p/{PHOTO_ID}=w{WIDTH}-h{HEIGHT}-{FORMAT}
```

**Format Options:**
- `no`: No optimization
- `p`: Public access
- `k`: Keep aspect ratio

### 2. Component Selection
- Use `ClientImage` for general image display
- Use `ResponsiveImage` for responsive layouts
- Both components handle Google Photos URLs automatically

### 3. Error Handling
- Always provide fallback images
- Use proper alt text for accessibility
- Monitor console logs for debugging

### 4. Performance
- Use `unoptimized={true}` for Google Photos URLs
- Implement lazy loading for better performance
- Use appropriate `sizes` attribute for responsive images

## Example Usage

### Basic Usage
```tsx
import ClientImage from '@/components/ui/ClientImage';

function MyComponent() {
  return (
    <div className="relative h-64 w-full">
      <ClientImage
        src="https://lh5.googleusercontent.com/p/AF1QipNxd9t8C-6gu3SNxvZpx0PIgnnnWyF5NcLwr20A=w800-h600-no"
        alt="Washington Monument"
        fill
        className="rounded-lg object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );
}
```

### Custom URL Creation
```tsx
import { createGooglePhotosUrl, extractGooglePhotosId } from '@/lib/utils';

function createCustomImageUrl(originalUrl: string) {
  const photoId = extractGooglePhotosId(originalUrl);
  if (photoId) {
    return createGooglePhotosUrl(photoId, 'lh5.googleusercontent.com', {
      width: 1200,
      height: 800,
      format: 'p'
    });
  }
  return originalUrl;
}
```

### Error Handling Example
```tsx
import ClientImage from '@/components/ui/ClientImage';

function ImageWithFallback({ src, alt }: { src: string; alt: string }) {
  return (
    <ClientImage
      src={src}
      alt={alt}
      fill
      className="rounded-lg"
      sizes="(max-width: 768px) 100vw, 50vw"
    />
  );
}
```

## Troubleshooting

### Common Issues

1. **Images Not Loading**
   - Check if the URL is accessible
   - Verify Next.js image domain configuration
   - Check browser console for CORS errors

2. **Retry Logic Not Working**
   - Ensure the URL is a valid Google Photos URL
   - Check network connectivity
   - Verify the photo ID is correct

3. **Performance Issues**
   - Use `unoptimized={true}` for Google Photos URLs
   - Implement proper lazy loading
   - Consider using CDN for better performance

### Debugging
Enable detailed logging by checking the browser console for:
- URL processing information
- Retry attempts
- Error messages
- Accessibility check results

## Migration Guide

### From Old Implementation
1. Replace direct `<Image>` usage with `ClientImage` or `ResponsiveImage`
2. Remove manual Google Photos URL processing
3. Update error handling to use the new system
4. Test with various Google Photos URLs

### Testing
Use the `ImageExample` component to test different scenarios:
- Valid Google Photos URLs
- Invalid URLs
- Empty URLs
- Regular image URLs

## Support

For issues or questions:
1. Check the console logs for detailed error information
2. Verify the URL format and accessibility
3. Test with the `ImageExample` component
4. Review the utility functions in `src/lib/utils.ts` 