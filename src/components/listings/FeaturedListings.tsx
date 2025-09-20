'use client';

import { useState, useEffect } from 'react';
import { Place } from '../../lib/types';
import { getFeaturedPlaces, getFeaturedPlacesByCategory } from '../../lib/data-service';
import ListingGrid from './ListingGrid';

interface FeaturedListingsProps {
  limit?: number;
  categorySlug?: string;
}

export default function FeaturedListings({ limit = 3, categorySlug }: FeaturedListingsProps) {
  const [listings, setListings] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch featured listings from Supabase
  useEffect(() => {
    const fetchFeaturedListings = async () => {
      setIsLoading(true);
      try {
        let data;
        if (categorySlug) {
          data = await getFeaturedPlacesByCategory(categorySlug, limit);
        } else {
          data = await getFeaturedPlaces(limit);
        }
        setListings(data);
      } catch (error) {
        console.error('Error fetching featured listings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedListings();
  }, [limit, categorySlug]);

  if (isLoading) {
    return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(limit)].map((_, i) => (
        <div key={i} className="bg-gray-200 rounded-lg h-80 animate-pulse"></div>
      ))}
    </div>;
  }

  if (!listings.length) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No featured listings found for this category.</p>
      </div>
    );
  }

  return (
    <ListingGrid places={listings} />
  );
} 