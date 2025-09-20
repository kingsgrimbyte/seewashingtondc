import Link from 'next/link';
import ResponsiveImage from '@/components/ui/ResponsiveImage';

type CategoryCardProps = {
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  count: number;
};

export default function CategoryCard({ name, slug, description, imageUrl, count }: CategoryCardProps) {
  return (
    <Link href={`/${slug}`} className="block group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition transform group-hover:shadow-lg group-hover:-translate-y-1">
        <div className="relative h-48 w-full bg-gray-200">
          {imageUrl ? (
            <ResponsiveImage
              src={imageUrl.replace(/w\d+-h\d+-k-no/, 'w1280-h600-k-no')}
              alt={name}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-primary/10 text-primary">
              <span className="text-lg font-medium">{name}</span>
            </div>
          )}
          <div className="absolute bottom-0 right-0 bg-yellow-500 text-secondary px-3 py-1 rounded-tl-lg font-semibold">
            {count}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-primary">
            {name}
          </h3>
          <p className="text-gray-600 text-sm">
            {description}
          </p>
          <div className="mt-3 flex items-center text-primary">
            <span className="text-sm font-medium">Explore &rarr;</span>
          </div>
        </div>
      </div>
    </Link>
  );
} 