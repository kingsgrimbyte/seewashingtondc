import React from 'react';
import type { Metadata } from 'next/types';
import { getPlacesByCategorySlug, getSubcategoriesByCategorySlug, getCategoryBySlug } from '@/lib/data-service';
import CategoryPageClient from './CategoryPageClient';

interface RouteParams {
  categorySlug: string;
}

interface Props {
  params: Promise<RouteParams>;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const categorySlug = decodeURIComponent(params.categorySlug);
  const category = await getCategoryBySlug(categorySlug);
  
  if (!category) {
    return {
      title: 'Category Not Found',
      description: 'The requested category could not be found.'
    };
  }

  return {
    title: `${category.name} in Washington DC - See Washington`,
    description: category.description || `Explore ${category.name} in Washington DC`,
    openGraph: {
      title: `${category.name} in Washington DC - See Washington`,
      description: category.description || `Explore ${category.name} in Washington DC`,
      images: [category.image_url],
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const resolvedParams = await params;
  const categorySlug = decodeURIComponent(resolvedParams.categorySlug);
  
  // Fetch initial data
  const category = await getCategoryBySlug(categorySlug);
  const subcategories = await getSubcategoriesByCategorySlug(categorySlug);
  const places = await getPlacesByCategorySlug(categorySlug);

  return (
    <CategoryPageClient 
      initialCategory={category}
      initialSubcategories={subcategories}
      initialPlaces={places}
      categorySlug={categorySlug}
    />
  );
} 