import Link from 'next/link';
import Image from 'next/image';
import { Subcategory } from '@/lib/types';

type SubcategoryGridProps = {
  subcategories: Subcategory[];
  categorySlug: string;
};

export default function SubcategoryGrid({ subcategories, categorySlug }: SubcategoryGridProps) {
  if (!subcategories.length) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No subcategories found for this category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {subcategories.map((subcategory) => (
        <Link
          key={subcategory.id}
          href={`/category/${categorySlug}/${subcategory.slug}`}
          className="group block"
        >
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
            <div className="relative h-48 bg-gray-200">
              {subcategory.image_url ? (
                <Image
                  src={subcategory.image_url.replace(/w\d+-h\d+-k-no/, 'w1280-h600-k-no')}
                  alt={subcategory.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-primary/10 text-primary">
                  <span className="text-lg font-medium">{subcategory.name}</span>
                </div>
              )}
              {subcategory.count !== undefined && (
                <div className="absolute bottom-0 right-0 bg-yellow-500 text-secondary px-3 py-1 rounded-tl-lg font-semibold">
                  {subcategory.count} Places
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary">
                {subcategory.name}
              </h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {subcategory.description}
              </p>
              <div className="mt-3 text-primary text-sm font-medium">
                Explore &rarr;
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
} 