"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// Components
import CategoryHeader from "@/components/categories/CategoryHeader";
import ListingFilters from "@/components/listings/ListingFilters";
import ListingGrid from "@/components/listings/ListingGrid";

// Types
import { Place, Subcategory } from "@/lib/types";
import SubcategoryNotFound from "@/components/layout/SubcategoryNotFound";

interface SubcategoryPageClientProps {
  initialSubcategory: Subcategory | null;
  initialPlaces: Place[];
  subcategorySlug: string;
  categorySlug: string;
  site_description?: string;
}

export default function SubcategoryPageClient({
  initialSubcategory,
  initialPlaces,
  subcategorySlug,
  categorySlug,
}: SubcategoryPageClientProps) {
  const [places, setPlaces] = useState<Place[]>(initialPlaces);
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>(initialPlaces);
  const [subcategory] = useState<any>(initialSubcategory);

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
      filtered = filtered.filter(
        (place) =>
          place.price_range && filters.price.includes(place.price_range)
      );
    }

    // Apply rating filter
    if (filters.rating !== null) {
      filtered = filtered.filter(
        (place) => place.rating && place.rating >= filters.rating!
      );
    }

    // Apply amenities filter
    if (filters.amenities.length > 0) {
      filtered = filtered.filter((place) =>
        filters.amenities.every((amenity) =>
          place.amenities?.some((a) => a.name === amenity)
        )
      );
    }

    setFilteredPlaces(filtered);
  };

  if (!subcategory) {
    return (
      <>
        <SubcategoryNotFound />
      </>
    );
  }

  return (
    <div className="min-h-screen">
      <CategoryHeader
        title={subcategory.name}
        description={`Explore ${subcategory.name} in Washington DC`}
        imageUrl={subcategory.image_url}
      />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <nav className="text-sm">
          <ol className="flex items-center space-x-2">
            <li>
              <Link
                href="/"
                className="text-blue-600 hover:text-blue-800 transition"
              >
                Home
              </Link>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-gray-500">/</span>
              <Link
                href={`/${categorySlug}`}
                className="text-blue-600 hover:text-blue-800 transition"
              >
                {subcategory.categoryName}
              </Link>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-gray-500">/</span>
              <span className="text-gray-600">{subcategory.name}</span>
            </li>
          </ol>
        </nav>
      </div>

      {/* Listings section */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <span className="px-4 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium mb-3 inline-block">
            Places
          </span>
          <h2 className="text-3xl font-bold mb-2">
            {filteredPlaces.length} Places in {subcategory.name}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl">
            {subcategory?.site_description ||
              "Discover more categories in this section"}
          </p>
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
