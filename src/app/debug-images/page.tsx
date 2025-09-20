'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  validateGooglePhotosUrl, 
  processGooglePhotosUrl, 
  checkImageAccessibility,
  extractGooglePhotosId,
  createGooglePhotosUrl,
  fixGooglePhotosUrl,
  isGooglePhotosUrl,
  GOOGLE_PHOTOS_CONFIG 
} from '@/lib/utils';

export default function DebugImagesPage() {
  const [testUrl, setTestUrl] = useState('https://lh5.googleusercontent.com/p/AF1QipNxd9t8C-6gu3SNxvZpx0PIgnnnWyF5NcLwr20A=w800-h600-no');
  const [results, setResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Same image handling logic as ImageGallery
  const getImageUrl = (imageUrl: string) => {
    if (!imageUrl) {
      return '/images/sample_image.png';
    }

    let url = imageUrl;
    
    // Handle Google image URLs
    if (url.includes('googleusercontent.com')) {
      // Ensure the URL has proper dimensions
      if (!url.includes('=w') || !url.includes('-h')) {
        url = url.replace(/\?.*$/, '') + '=w800-h600-no';
      } else {
        url = url.replace(/w\d+-h\d+(-k)?-no/, 'w800-h600-no');
      }
    }
    
    // Handle gps-proxy URLs
    if (url.includes('gps-proxy')) {
      return 'https://images.pexels.com/photos/2079438/pexels-photo-2079438.jpeg';
    }

    return url;
  };

  const runTest = async () => {
    setIsLoading(true);
    try {
      // Test 1: Basic validation
      const validation = validateGooglePhotosUrl(testUrl);
      
      // Test 2: Extract photo ID
      const photoId = extractGooglePhotosId(testUrl);
      
      // Test 3: Check accessibility
      const accessibility = await checkImageAccessibility(testUrl);
      
      // Test 4: Generate alternative URLs
      const alternatives = [];
      for (let i = 0; i <= GOOGLE_PHOTOS_CONFIG.MAX_RETRIES; i++) {
        const altUrl = processGooglePhotosUrl(testUrl, i);
        const altAccessibility = await checkImageAccessibility(altUrl);
        alternatives.push({
          retry: i,
          url: altUrl,
          accessible: altAccessibility.accessible,
          status: altAccessibility.status,
          error: altAccessibility.error
        });
      }
      
      // Test 5: Try to fix URL
      const fixedUrl = fixGooglePhotosUrl(testUrl);
      const fixedAccessibility = await checkImageAccessibility(fixedUrl);
      
      // Test 6: Create new URL
      const newUrl = photoId ? createGooglePhotosUrl(photoId) : null;
      const newUrlAccessibility = newUrl ? await checkImageAccessibility(newUrl) : null;
      
      setResults({
        originalUrl: testUrl,
        validation,
        photoId,
        accessibility,
        alternatives,
        fixedUrl: {
          url: fixedUrl,
          accessible: fixedAccessibility.accessible,
          status: fixedAccessibility.status,
          error: fixedAccessibility.error
        },
        newUrl: newUrl ? {
          url: newUrl,
          accessible: newUrlAccessibility?.accessible,
          status: newUrlAccessibility?.status,
          error: newUrlAccessibility?.error
        } : null,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Test error:', error);
      setResults({
        error: error instanceof Error ? error.message : 'Unknown error',
        originalUrl: testUrl
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (accessible: boolean, status?: number) => {
    if (accessible) return 'text-green-600';
    if (status === 403) return 'text-red-600';
    if (status === 404) return 'text-orange-600';
    return 'text-gray-600';
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6">Google Photos URL Debug Tool</h1>
      
      {/* Test URL Input */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Test URL</h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={testUrl}
            onChange={(e) => setTestUrl(e.target.value)}
            placeholder="Enter Google Photos URL to test"
            className="flex-1 p-3 border border-gray-300 rounded-lg"
          />
          <button 
            onClick={runTest}
            disabled={isLoading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? 'Testing...' : 'Run Test'}
          </button>
        </div>
      </div>

      {/* Results */}
      {results && (
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p><strong>Original URL:</strong></p>
                <p className="text-sm text-gray-600 break-all">{results.originalUrl}</p>
              </div>
              <div>
                <p><strong>Is Google Photos URL:</strong></p>
                <p className={isGooglePhotosUrl(results.originalUrl) ? 'text-green-600' : 'text-red-600'}>
                  {isGooglePhotosUrl(results.originalUrl) ? 'Yes' : 'No'}
                </p>
              </div>
              {results.photoId && (
                <div>
                  <p><strong>Photo ID:</strong></p>
                  <p className="text-sm text-gray-600">{results.photoId}</p>
                </div>
              )}
            </div>
          </div>

          {/* Validation Results */}
          {results.validation && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">URL Validation</h2>
              <div className="space-y-2">
                <p><strong>Valid:</strong> 
                  <span className={results.validation.isValid ? 'text-green-600' : 'text-red-600'}>
                    {results.validation.isValid ? ' Yes' : ' No'}
                  </span>
                </p>
                {results.validation.hostname && (
                  <p><strong>Hostname:</strong> {results.validation.hostname}</p>
                )}
                {results.validation.issues && results.validation.issues.length > 0 && (
                  <div>
                    <p><strong>Issues:</strong></p>
                    <ul className="list-disc list-inside text-red-600">
                      {results.validation.issues.map((issue: string, index: number) => (
                        <li key={index}>{issue}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Accessibility Results */}
          {results.accessibility && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Original URL Accessibility</h2>
              <div className="space-y-2">
                <p><strong>Accessible:</strong> 
                  <span className={getStatusColor(results.accessibility.accessible, results.accessibility.status)}>
                    {results.accessibility.accessible ? ' Yes' : ' No'}
                  </span>
                </p>
                {results.accessibility.status && (
                  <p><strong>Status Code:</strong> {results.accessibility.status}</p>
                )}
                {results.accessibility.error && (
                  <p><strong>Error:</strong> {results.accessibility.error}</p>
                )}
              </div>
            </div>
          )}

          {/* Alternative URLs */}
          {results.alternatives && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Alternative URL Formats</h2>
              <div className="space-y-3">
                {results.alternatives.map((alt: any, index: number) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <p><strong>Format {alt.retry}:</strong></p>
                    <p className="text-sm text-gray-600 break-all mb-2">{alt.url}</p>
                    <p className={getStatusColor(alt.accessible, alt.status)}>
                      Status: {alt.status || 'N/A'} ({alt.accessible ? 'Accessible' : 'Not Accessible'})
                    </p>
                    {alt.error && (
                      <p className="text-red-600 text-sm">Error: {alt.error}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Fixed URL */}
          {results.fixedUrl && results.fixedUrl.url !== results.originalUrl && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Suggested Fix</h2>
              <div className="space-y-2">
                <p><strong>Fixed URL:</strong></p>
                <p className="text-sm text-gray-600 break-all mb-2">{results.fixedUrl.url}</p>
                <p className={getStatusColor(results.fixedUrl.accessible, results.fixedUrl.status)}>
                  Status: {results.fixedUrl.status || 'N/A'} ({results.fixedUrl.accessible ? 'Accessible' : 'Not Accessible'})
                </p>
                {results.fixedUrl.error && (
                  <p className="text-red-600 text-sm">Error: {results.fixedUrl.error}</p>
                )}
              </div>
            </div>
          )}

          {/* Image Preview */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Image Preview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Original URL</h3>
                <div className="relative w-full h-64 border rounded-lg overflow-hidden">
                  <Image
                    src={getImageUrl(results.originalUrl)}
                    alt="Original URL Test"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              {results.fixedUrl && results.fixedUrl.url !== results.originalUrl && (
                <div>
                  <h3 className="text-lg font-medium mb-2">Fixed URL</h3>
                  <div className="relative w-full h-64 border rounded-lg overflow-hidden">
                    <Image
                      src={getImageUrl(results.fixedUrl.url)}
                      alt="Fixed URL Test"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-blue-800">Recommendations</h2>
            <ul className="space-y-2 text-blue-700">
              {!results.validation?.isValid && (
                <li>• The URL has validation issues. Check the photo ID format.</li>
              )}
              {!results.accessibility?.accessible && (
                <li>• The image is not accessible. It might be private or deleted.</li>
              )}
              {results.accessibility?.status === 403 && (
                <li>• Access forbidden. The image might be private or require authentication.</li>
              )}
              {results.accessibility?.status === 404 && (
                <li>• Image not found. The photo might have been deleted or moved.</li>
              )}
              {results.fixedUrl && results.fixedUrl.url !== results.originalUrl && results.fixedUrl.accessible && (
                <li>• Try using the suggested fixed URL.</li>
              )}
              {results.alternatives && results.alternatives.some((alt: any) => alt.accessible) && (
                <li>• Some alternative URL formats are accessible. Consider using one of them.</li>
              )}
              <li>• Consider using a different image source if the Google Photos URL is consistently failing.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
} 