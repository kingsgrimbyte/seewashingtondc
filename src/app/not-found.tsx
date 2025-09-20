import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-xl p-8">
        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn't exist or has been moved.
          This could be a place that's not in our database yet.
        </p>
        <Link 
          href="/" 
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
} 