import React from 'react';
import type { Metadata } from 'next/types';
import { getPlacesBySubcategorySlug, getSubcategoryBySlug } from '@/lib/data-service';
import SubcategoryPageClient from './SubcategoryPageClient';

interface Props {
  params: Promise<{
    categorySlug: string;
    subcategorySlug: string;
  }>;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const subcategorySlug = decodeURIComponent(params.subcategorySlug);
  const subcategory = await getSubcategoryBySlug(subcategorySlug);
  
  if (!subcategory) {
    return {
      title: 'Subcategory Not Found',
      description: 'The requested subcategory could not be found.'
    };
  }

  return {
    title: `${subcategory.name} in Washington DC - See Washington`,
    description: subcategory.description || `Explore ${subcategory.name} in Washington DC`,
    openGraph: {
      title: `${subcategory.name} in Washington DC - See Washington`,
      description: subcategory.description || `Explore ${subcategory.name} in Washington DC`,
      images: [subcategory.image_url],
    },
  };
}

export default async function SubcategoryPage({ params }: Props) {
  const resolvedParams = await params;
  const subcategorySlug = decodeURIComponent(resolvedParams.subcategorySlug);
  
  // Fetch initial data
  const subcategory = await getSubcategoryBySlug(subcategorySlug);
  const places = await getPlacesBySubcategorySlug(subcategorySlug);

  return (
    <SubcategoryPageClient 
      initialSubcategory={subcategory}
      initialPlaces={places}
      subcategorySlug={subcategorySlug}
      categorySlug={resolvedParams.categorySlug}
    />
  );
}
