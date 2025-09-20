'use client';

import { useState } from 'react';
import { Amenity } from '@/lib/types';

interface AmenitiesCategoryProps {
  title: string;
  amenities: Amenity[];
}

export default function AmenitiesCategory({ title, amenities }: AmenitiesCategoryProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Don't render if there are no amenities in this category
  if (!amenities.length) return null;

  return (
    <div className="border border-gray-100 rounded-lg overflow-hidden">
      <button 
        className="w-full flex justify-between items-center p-4 bg-primary/10 hover:bg-primary/20 transition text-left"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <h3 className="font-medium text-gray-900 flex items-center">
          {getCategoryIcon(title)}
          <span className="ml-2">{title}</span>
          <span className="ml-2 text-sm text-gray-500">({amenities.length})</span>
        </h3>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-5 w-5 text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isExpanded && (
        <div className="p-4 bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3">
            {amenities.map((amenity) => (
              <div key={amenity.id} className="flex items-center text-gray-700">
            <span className="h-8 w-8 flex items-center justify-center bg-primary/10 text-primary rounded-full mr-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                {amenity.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Helper function to return the appropriate icon for each category
function getCategoryIcon(category: string) {
  switch (category.toLowerCase()) {
    case 'accessibility':
      return (
      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      );
    case 'food & drinks':
      return (
      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'facilities & services':
      return (
      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      );
    case 'special features':
      return (
      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      );
    default:
      return (
      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
  }
} 