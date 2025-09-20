'use client';

import React, { useState, useEffect } from 'react';
import { getCategories } from '@/lib/data-service';
import { Category } from '@/lib/types';
import CategoryCard from '@/components/categories/CategoryCard';

export default function CategoriesContent() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch categories from Supabase
  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Filter categories based on search query
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (category.description && category.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-white">
      {/* Header Section */}
      <div className="bg-primary text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Explore Washington DC
            </h1>
            <p className="text-xl text-white/80">
              Discover all the amazing categories of attractions, activities, and places to visit in the nation's capital.
            </p>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <nav className="text-sm">
          <ol className="flex items-center space-x-2">
            <li>
              <a href="/" className="text-primary hover:text-secondary transition">
                Home
              </a>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-gray-500">/</span>
              <span className="text-gray-600">Categories</span>
            </li>
          </ol>
        </nav>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-12">
          <span className="px-4 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium mb-3 inline-block">
            Browse
          </span>
          <h2 className="text-3xl font-bold mb-4">All Categories</h2>
          <p className="text-lg text-gray-600 max-w-2xl mb-8">
            Find the perfect attractions and activities for your visit to Washington DC. Browse through our comprehensive list of categories.
          </p>

          {/* Search Input */}
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="overflow-y-auto max-h-[800px] pr-4 -mr-4">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-lg h-64 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <>
              {filteredCategories.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No categories found</h3>
                  <p className="text-gray-600">Try adjusting your search terms</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCategories.map((category) => (
                    <CategoryCard
                      key={category.id}
                      name={category.name}
                      slug={category.slug}
                      description={category.description}
                      imageUrl={category.image_url ? category.image_url.replace(/w\d+-h\d+-k-no/, 'w1280-h600-k-no') : '/images/sample_image.png'}
                      count={category.count || 0}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
} 