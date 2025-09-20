"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import type { Category, Subcategory, Place } from '@/lib/types';

// Initialize Supabase client once
const supabase = createClient();

interface SearchResult {
  id: number;
  name: string;
  type: 'category' | 'place' | 'subcategory';
  description?: string;
  slug?: string;
  address?: string | null;
  image_url?: string;
  category_name?: string;
  subcategory_name?: string;
  category_slug?: string;
  subcategory_slug?: string;
}

interface SubcategoryWithCategory {
  id: number;
  name: string;
  slug: string;
  categories: {
    id: number;
    name: string;
    slug: string;
  } | null;
}

interface PlaceResult {
  id: number;
  name: string;
  description: string | null;
  address: string | null;
  subcategory_id: number;
  place_images: Array<{ id: number; image_url: string; alt_text: string | null }>;
  subcategories: {
    id: number;
    name: string;
    slug: string;
    categories: {
      id: number;
      name: string;
      slug: string;
    } | null;
  } | null;
}

interface SubcategoryResult {
  id: number;
  name: string;
  description: string;
  slug: string;
  image_url: string | null;
  categories: {
    name: string;
    slug: string;
  } | null;
}

function SearchPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const performSearch = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        // Search in categories
        const { data: categoryData, error: categoryError } = await supabase
          .from('categories')
          .select('id, name, description, slug, image_url')
          .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
          .order('name')
          .returns<Category[]>();

        if (categoryError) {
          console.error('Category search error:', categoryError);
        }

        // First get subcategories with their categories
        const { data: subcategoriesWithCategories, error: subcatError } = await supabase
          .from('subcategories')
          .select(`
            id,
            name,
            slug,
            categories (
              id,
              name,
              slug
            )
          `)
          .returns<SubcategoryWithCategory[]>();

        if (subcatError) {
          console.error('Error fetching subcategories:', subcatError);
        }

        // Search in places with proper error handling and logging
        let placeData: PlaceResult[] = [];
        try {
          // First, try a simple query to test the connection
          const testQuery = await supabase
            .from('places')
            .select('id, name')
            .limit(1);
          
          console.log('Test query result:', testQuery);
          
          if (testQuery.error) {
            console.error('Test query failed:', testQuery.error);
            throw new Error(`Test query failed: ${testQuery.error.message}`);
          }
          
          // Try a simpler query first without complex relationships
          const { data: simplePlaceData, error: simpleError } = await supabase
            .from('places')
            .select(`
              id,
              name,
              description,
              address,
              subcategory_id
            `)
            .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
            .order('name');

          if (simpleError) {
            console.error('Simple place search error:', simpleError);
            throw new Error(`Simple place search failed: ${simpleError.message}`);
          }

          console.log('Simple place data found:', simplePlaceData?.length || 0);

          // If simple query works, try to get the relationship data separately
          if (simplePlaceData && simplePlaceData.length > 0) {
            // Get subcategory data for the places
            const subcategoryIds = [...new Set(simplePlaceData.map(p => p.subcategory_id))];
            
            const { data: subcategoryData, error: subcatError } = await supabase
              .from('subcategories')
              .select(`
                id,
                name,
                slug,
                categories(
                  id,
                  name,
                  slug
                )
              `)
              .in('id', subcategoryIds);

            if (subcatError) {
              console.error('Subcategory fetch error:', subcatError);
            }

            // Create a map of subcategory data
            const subcategoryMap = new Map();
            if (subcategoryData) {
              subcategoryData.forEach(sub => {
                subcategoryMap.set(sub.id, sub);
              });
            }

            // Get place images
            const placeIds = simplePlaceData.map(p => p.id);
            const { data: imageData, error: imageError } = await supabase
              .from('place_images')
              .select('*')
              .in('place_id', placeIds)
              .order('order_index');

            if (imageError) {
              console.error('Image fetch error:', imageError);
            }

            // Create a map of place images
            const imageMap = new Map();
            if (imageData) {
              imageData.forEach(img => {
                if (!imageMap.has(img.place_id)) {
                  imageMap.set(img.place_id, []);
                }
                imageMap.get(img.place_id).push(img);
              });
            }

            // Combine the data
            placeData = simplePlaceData.map(place => ({
              ...place,
              place_images: imageMap.get(place.id) || [],
              subcategories: subcategoryMap.get(place.subcategory_id) || null
            })) as PlaceResult[];
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
          console.error('Place search error details:', {
            error: errorMessage,
            errorObject: error,
            query,
            timestamp: new Date().toISOString()
          });
        }

        // Search in subcategories
        const { data: subcategoryData, error: subcategoryError } = await supabase
          .from('subcategories')
          .select(`
            id,
            name,
            description,
            slug,
            image_url,
            categories(
              name,
              slug
            )
          `)
          .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
          .order('name')
          .returns<SubcategoryResult[]>();

        if (subcategoryError) {
          console.error('Subcategory search error:', subcategoryError);
        }

        // Map subcategories to their categories for places
        const subcategoryMap = new Map(
          subcategoriesWithCategories?.map(sub => [
            sub.id,
            {
              name: sub.name,
              slug: sub.slug,
              category: sub.categories
            }
          ]) || []
        );

        const formattedResults: SearchResult[] = [
          ...(categoryData?.map(cat => ({
            id: cat.id,
            name: cat.name,
            description: cat.description,
            type: 'category' as const,
            slug: cat.slug,
            image_url: cat.image_url
          })) || []),
          ...(placeData?.map(place => {
            // Create URL-friendly slug from name since it's not stored in DB
            const placeSlug = place.name.toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)/g, '');
              
            return {
              id: place.id,
              name: place.name,
              description: place.description || undefined,
              type: 'place' as const,
              address: place.address,
              slug: placeSlug,
              image_url: place.place_images?.[0]?.image_url,
              category_name: place.subcategories?.categories?.name,
              subcategory_name: place.subcategories?.name,
              category_slug: place.subcategories?.categories?.slug,
              subcategory_slug: place.subcategories?.slug
            };
          }) || []),
          ...(subcategoryData?.map(sub => ({
            id: sub.id,
            name: sub.name,
            description: sub.description,
            type: 'subcategory' as const,
            slug: sub.slug,
            image_url: sub.image_url || undefined,
            category_name: sub.categories?.name,
            category_slug: sub.categories?.slug
          })) || [])
        ];

        setResults(formattedResults);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    performSearch();
  }, [query]);

  const getResultUrl = (result: SearchResult) => {
    switch (result.type) {
      case 'category':
        return `/${result.slug}`;
      case 'place':
        // For places, we need both category and subcategory slugs
        if (result.category_slug && result.subcategory_slug) {
          return `/${result.category_slug}/${result.subcategory_slug}/${result.slug}`;
        }
        // Fallback if we don't have the full path
        return `/${result.slug}`;
      case 'subcategory':
        // For subcategories, we need the category slug
        if (result.category_slug) {
          return `/${result.category_slug}/${result.slug}`;
        }
        // Fallback if we don't have the category slug
        return `/${result.slug}`;
    }
  };

  const getResultTypeLabel = (type: string) => {
    switch (type) {
      case 'category':
        return 'Category';
      case 'place':
        return 'Place';
      case 'subcategory':
        return 'Subcategory';
      default:
        return type;
    }
  };

  return (
    <main className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Search Results for "{query}"
          </h1>
          <p className="text-lg text-gray-600">
            Found {results.length} results across categories, places, and subcategories
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {results.length > 0 ? (
              results.map((result) => (
                <Link
                  key={`${result.type}-${result.id}`}
                  href={getResultUrl(result)}
                  className="block bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <span className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-full">
                          {getResultTypeLabel(result.type)}
                        </span>
                        {result.category_name && (
                          <span className="ml-2 text-sm text-gray-500">
                            in {result.category_name}
                            {result.subcategory_name && ` › ${result.subcategory_name}`}
                          </span>
                        )}
                      </div>
                      <div className="flex justify-between items-start">
                        <div>
                          <h2 className="text-xl font-semibold text-gray-900 mb-2">
                            {result.name}
                          </h2>
                          {result.description && (
                            <p className="text-gray-600 line-clamp-2">
                              {result.description}
                            </p>
                          )}
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <svg
                            className="h-6 w-6 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-xl">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No results found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search terms or browse our categories instead
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPageContent />
    </Suspense>
  );
} 