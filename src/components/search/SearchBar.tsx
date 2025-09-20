"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useDebounce } from '@/hooks/useDebounce';
import type { Category, Subcategory, Place } from '@/lib/types';

interface SearchResult {
  id: number;
  name: string;
  type: 'category' | 'place' | 'subcategory';
  description?: string;
  slug: string;
}

interface CategoryResult {
  id: number;
  name: string;
  description: string;
  slug: string;
}

interface PlaceResult {
  id: number;
  name: string;
  description: string | null;
  slug: string;
  subcategory_id: number;
  subcategories: {
    categories: {
      slug: string;
    };
  };
}

interface SubcategoryResult {
  id: number;
  name: string;
  description: string;
  slug: string;
  category_id: number;
}

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const debouncedSearch = useDebounce(searchTerm, 300);
  const supabase = createClient();

  useEffect(() => {
    const performSearch = async () => {
      if (!debouncedSearch.trim()) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        // Search in categories
        const { data: categoryData, error: categoryError } = await supabase
          .from('categories')
          .select('id, name, description, slug')
          .or(`name.ilike.%${debouncedSearch}%,description.ilike.%${debouncedSearch}%`)
          .limit(5)
          .returns<CategoryResult[]>();

        if (categoryError) {
          console.error('Category search error:', categoryError);
          return;
        }

        // Search in places
        const { data: placeData, error: placeError } = await supabase
          .from('places')
          .select('id, name, description, slug, subcategory_id, subcategories!inner(categories!inner(slug))')
          .or(`name.ilike.%${debouncedSearch}%,description.ilike.%${debouncedSearch}%`)
          .limit(5)
          .returns<PlaceResult[]>();

        if (placeError) {
          console.error('Place search error:', placeError);
          return;
        }

        // Search in subcategories
        const { data: subcategoryData, error: subcategoryError } = await supabase
          .from('subcategories')
          .select('id, name, description, slug, category_id')
          .or(`name.ilike.%${debouncedSearch}%,description.ilike.%${debouncedSearch}%`)
          .limit(5)
          .returns<SubcategoryResult[]>();

        if (subcategoryError) {
          console.error('Subcategory search error:', subcategoryError);
          return;
        }

        const formattedResults: SearchResult[] = [
          ...(categoryData?.map(cat => ({
            id: cat.id,
            name: cat.name,
            description: cat.description,
            type: 'category' as const,
            slug: cat.slug
          })) || []),
          ...(placeData?.map(place => ({
            id: place.id,
            name: place.name,
            description: place.description || undefined,
            type: 'place' as const,
            slug: place.slug
          })) || []),
          ...(subcategoryData?.map(sub => ({
            id: sub.id,
            name: sub.name,
            description: sub.description,
            type: 'subcategory' as const,
            slug: sub.slug
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
  }, [debouncedSearch]);

  const handleResultClick = (result: SearchResult) => {
    setIsOpen(false);
    setSearchTerm('');
    
    switch (result.type) {
      case 'category':
        router.push(`/category/${result.slug}`);
        break;
      case 'place':
        router.push(`/place/${result.slug}`);
        break;
      case 'subcategory':
        router.push(`/subcategory/${result.slug}`);
        break;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      e.preventDefault();
      setIsOpen(false);
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          placeholder="Search categories, places, or activities..."
          className="w-full px-6 py-4 rounded-full shadow-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary border-2 border-transparent focus:border-primary transition-all duration-300 bg-white/90 placeholder-gray-400"
        />
        {isLoading && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
          </div>
        )}
      </div>

      {/* Results dropdown */}
      {isOpen && (searchTerm.trim() !== '') && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 max-h-96 overflow-y-auto z-50">
          {results.length > 0 ? (
            <ul className="py-2">
              {results.map((result) => (
                <li
                  key={`${result.type}-${result.id}`}
                  onClick={() => handleResultClick(result)}
                  className="px-6 py-3 hover:bg-primary/5 cursor-pointer transition-colors"
                >
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded-full mr-3">
                      {result.type}
                    </span>
                    <div>
                      <h4 className="font-medium text-gray-900">{result.name}</h4>
                      {result.description && (
                        <p className="text-sm text-gray-500 line-clamp-1">{result.description}</p>
                      )}
                    </div>
                  </div>
                </li>
              ))}
              <li className="px-6 py-3 border-t">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
                  }}
                  className="w-full text-center text-primary hover:text-secondary font-medium"
                >
                  View all results
                </button>
              </li>
            </ul>
          ) : (
            <div className="px-6 py-4 text-gray-500 text-center">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
} 