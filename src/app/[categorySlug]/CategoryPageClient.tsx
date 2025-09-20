'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Components
import CategoryHeader from '@/components/categories/CategoryHeader';
import SubcategoryButtons from '@/components/categories/SubcategoryButtons';
import ListingFilters from '@/components/listings/ListingFilters';
import ListingGrid from '@/components/listings/ListingGrid';

// Types
import { Place } from '@/lib/types';

interface CategoryPageClientProps {
  initialCategory: any;
  initialSubcategories: any[];
  initialPlaces: Place[];
  categorySlug: string;
}

export default function CategoryPageClient({
  initialCategory,
  initialSubcategories,
  initialPlaces,
  categorySlug
}: CategoryPageClientProps) {
  const [places, setPlaces] = useState<Place[]>(initialPlaces);
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>(initialPlaces);
  const [category] = useState(initialCategory);
  const [allSubcategories] = useState(initialSubcategories);

  // Update filtered places when places change
  useEffect(() => {
    setFilteredPlaces(places);
  }, [places]);

  const handleFilterChange = (filters: {
    price: string[];
    rating: number | null;
    amenities: string[];
  }) => {
    let filtered = [...places];

    // Apply price filter
    if (filters.price.length > 0) {
      filtered = filtered.filter(place => 
        place.price_range && filters.price.includes(place.price_range)
      );
    }

    // Apply rating filter
    if (filters.rating !== null) {
      filtered = filtered.filter(place => 
        place.rating && place.rating >= filters.rating!
      );
    }

    // Apply amenities filter
    if (filters.amenities.length > 0) {
      filtered = filtered.filter(place => 
        filters.amenities.every(amenity => 
          place.amenities?.some(a => a.name === amenity)
        )
      );
    }

    setFilteredPlaces(filtered);
  };

  if (!category) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-primary/5 via-white to-primary/5">
        {/* Decorative background elements */}
        <div aria-hidden="true" className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-primary/10 blur-3xl opacity-70" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-primary/10 blur-3xl opacity-70" />

        <div className="relative z-10 max-w-2xl w-full mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/70 px-4 py-1 text-xs font-medium text-primary shadow-sm backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            Error 404
          </div>

          <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Page not found</span>
          </h1>
          <p className="mt-4 text-base md:text-lg text-slate-600">
            We couldn't find the page you're looking for!
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center text-white rounded-md bg-primary px-6 py-3 text-primary-foreground shadow-sm transition hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Return Home
            </Link>
          </div>

          <div className="mt-8 text-xs text-primary/70">
            Or explore top sections:
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
              <Link href="/things-to-do" className="rounded-full bg-primary/10 text-primary px-3 py-1 hover:bg-primary/20 transition">Things to do</Link>
              <Link href="/eat-and-drink" className="rounded-full bg-primary/10 text-primary px-3 py-1 hover:bg-primary/20 transition">Eat & Drink</Link>
              <Link href="/entertainment" className="rounded-full bg-primary/10 text-primary px-3 py-1 hover:bg-primary/20 transition">Entertainment</Link>
              <Link href="/map" className="rounded-full bg-primary/10 text-primary px-3 py-1 hover:bg-primary/20 transition">Map</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <CategoryHeader 
        title={category.name}
        description={`Explore ${category.name} in Washington DC`}
        imageUrl={category.image_url}
      />
      
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <nav className="text-sm">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="text-blue-600 hover:text-blue-800 transition">Home</Link>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-gray-500">/</span>
              <span className="text-gray-600">{category.name}</span>
            </li>
          </ol>
        </nav>
      </div>
      
      {/* Related subcategories */}
      {allSubcategories.length > 0 && (
        <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="mb-8">
            <span className="px-4 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium mb-3 inline-block">Explore</span>
            <h2 className="text-3xl font-bold mb-2">Browse by Category</h2>
            <p className="text-lg text-gray-600 max-w-2xl">{category.site_description || 'Discover more categories in this section'}</p>
          </div>
          <SubcategoryButtons subcategories={allSubcategories} categorySlug={categorySlug} />
        </section>
      )}
      
      {/* Listings section */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <span className="px-4 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium mb-3 inline-block">Places</span>
          <h2 className="text-3xl font-bold mb-2">{filteredPlaces.length} Places in {category.name}</h2>
          <p className="text-lg text-gray-600 max-w-2xl">Browse through our curated selection of places</p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/4">
            <ListingFilters onFilterChange={handleFilterChange} />
          </div>
          
          <div className="w-full lg:w-3/4 overflow-y-auto max-h-[calc(110vh)] scrollbar-hide">
            <ListingGrid places={filteredPlaces} />
          </div>
        </div>
      </section>
    </div>
  );
} 