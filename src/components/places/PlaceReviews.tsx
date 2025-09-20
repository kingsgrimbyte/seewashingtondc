import { Place } from '@/lib/types';

interface PlaceReviewsProps {
  reviews: Place['reviews'];
}

export default function PlaceReviews({ reviews }: PlaceReviewsProps) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>
        </div>
        
        <div className="p-8 bg-primary/10 rounded-lg text-center">
          <div className="mb-3">
            <svg className="w-12 h-12 mx-auto text-primary/40" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-gray-600 mb-3">No reviews yet</p>
          <button className="px-4 py-2 bg-primary text-white rounded-full hover:bg-secondary transition font-medium text-sm">
            Write a Review
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>
        <button className="px-4 py-2 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition font-medium text-sm">
          View All Reviews
        </button>
      </div>
      
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
            <div className="flex items-center mb-2">
              <div className="flex mr-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg 
                    key={star}
                    className={`w-5 h-5 ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-500">
                {new Date(review.created_at).toLocaleDateString()}
              </span>
            </div>
            
            <h3 className="font-medium text-gray-900 mb-1">{review.title}</h3>
            <p className="text-gray-700">{review.content}</p>
            
            {review.author && (
              <div className="mt-3 flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm font-medium">
                  {review.author.charAt(0).toUpperCase()}
                </div>
                <span className="ml-2 text-sm text-gray-600">{review.author}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 