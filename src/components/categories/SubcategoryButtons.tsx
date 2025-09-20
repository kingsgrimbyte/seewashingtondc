'use client';

import React from 'react';
import Link from 'next/link';
import { Subcategory } from '@/lib/types';

interface SubcategoryButtonsProps {
  subcategories: Subcategory[];
  categorySlug: string;
}

export default function SubcategoryButtons({ subcategories, categorySlug }: SubcategoryButtonsProps) {
  if (!subcategories.length) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-500">No subcategories found for this category.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-3">
      {subcategories.map((subcategory) => (
        <Link
          key={subcategory.id}
          href={`/${categorySlug}/${subcategory.slug}`}
          className="group relative px-5 py-2.5 bg-white rounded-lg border border-gray-200 
            hover:border-primary hover:bg-primary/5 transition-all duration-200 
            text-gray-700 hover:text-primary font-medium text-[15px] min-w-[120px] text-center
            shadow-sm hover:shadow-md"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {subcategory.name}
            <svg 
              className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </Link>
      ))}
    </div>
  );
} 