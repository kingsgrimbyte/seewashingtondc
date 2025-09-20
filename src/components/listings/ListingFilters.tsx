'use client';

import React, { useState, useEffect } from 'react';

interface ListingFiltersProps {
  onFilterChange: (filters: {
    price: string[];
    rating: number | null;
    amenities: string[];
  }) => void;
}

export default function ListingFilters({ onFilterChange }: ListingFiltersProps) {
  const [priceFilter, setPriceFilter] = useState<string[]>([]);
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [amenitiesFilter, setAmenitiesFilter] = useState<string[]>([]);

  // Debounce filter changes to prevent too many updates
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onFilterChange({
        price: priceFilter,
        rating: ratingFilter,
        amenities: amenitiesFilter
      });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [priceFilter, ratingFilter, amenitiesFilter, onFilterChange]);

  const handlePriceChange = (price: string) => {
    setPriceFilter(prev => 
      prev.includes(price) 
        ? prev.filter(p => p !== price)
        : [...prev, price]
    );
  };

  const handleRatingChange = (rating: number) => {
    setRatingFilter(prev => prev === rating ? null : rating);
  };

  const handleAmenityChange = (amenity: string) => {
    setAmenitiesFilter(prev => 
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const clearAllFilters = () => {
    setPriceFilter([]);
    setRatingFilter(null);
    setAmenitiesFilter([]);
  };

  const hasActiveFilters = priceFilter.length > 0 || ratingFilter !== null || amenitiesFilter.length > 0;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-primary hover:text-secondary transition"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Rating Filter */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-3">Rating</h4>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={ratingFilter === rating}
                onChange={() => handleRatingChange(rating)}
                className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
              />
              <span className="text-sm text-gray-700">
                {rating}+ stars
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-3">Price Range</h4>
        <div className="space-y-2">
          {['$', '$$', '$$$', '$$$$'].map((price) => (
            <label key={price} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={priceFilter.includes(price)}
                onChange={() => handlePriceChange(price)}
                className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
              />
              <span className="text-sm text-gray-700">{price}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Features Filter */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-3">Features</h4>
        <div className="space-y-2">
          {[
            'Wheelchair Accessible',
            'Family Friendly',
            'Free Entry',
            'Guided Tours',
            'Parking Available',
            'Restrooms Available'
          ].map((amenity) => (
            <label key={amenity} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={amenitiesFilter.includes(amenity)}
                onChange={() => handleAmenityChange(amenity)}
                className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
              />
              <span className="text-sm text-gray-700">{amenity}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
} 