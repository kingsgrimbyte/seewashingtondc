import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getPlaceBySlug, getRelatedPlaces } from '@/lib/data-service';
import { notFound } from 'next/navigation';
import RelatedPlaces from '@/components/places/RelatedPlaces';
import ImageGallery from '@/components/ui/ImageGallery';
import AmenitiesCategory from '@/components/ui/AmenitiesCategory';
import GoogleMap from '@/components/ui/GoogleMap';
import { Metadata } from 'next';

// Function to get day of week
function getDayOfWeek() {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const today = new Date().getDay();
  return days[today];
}

// Function to get coordinates from point data
function extractCoordinates(gpsPoint: string | null): { latitude: number; longitude: number } | null {
  if (!gpsPoint) return null;
  
  // Parse from the PostgreSQL point format "(x,y)"
  const match = gpsPoint.match(/\(([^,]+),([^)]+)\)/);
  if (match && match.length === 3) {
    const longitude = parseFloat(match[1]);
    const latitude = parseFloat(match[2]);
    
    if (!isNaN(longitude) && !isNaN(latitude)) {
      return { latitude, longitude };
    }
  }
  
  return null;
}

// Helper function to process image URLs like ImageGallery does
function getImageUrl(imageUrl: string): string {
  // Handle Google image URLs
  if (imageUrl.includes('googleusercontent.com')) {
    // Ensure the URL has proper dimensions
    if (!imageUrl.includes('=w') || !imageUrl.includes('-h')) {
      imageUrl = imageUrl.replace(/\?.*$/, '') + '=w1280-h600-no';
    } else {
      imageUrl = imageUrl.replace(/w\d+-h\d+(-k)?-no/, 'w1280-h600-no');
    }
  }
  
  // Handle gps-proxy URLs
  if (imageUrl.includes('gps-proxy')) {
    return 'https://images.pexels.com/photos/2079438/pexels-photo-2079438.jpeg';
  }

  return imageUrl;
}

// Define the params type
interface PlaceDetailPageParams {
  slug: string;
  subSlug: string;
  placeSlug: string;
}

// This is required by Next.js to properly handle dynamic route params
export async function generateMetadata(
  { params }: { params: Promise<PlaceDetailPageParams> }
): Promise<Metadata> {
  const decodedParams = await params;
  const decodedSlug = decodeURIComponent(decodedParams.placeSlug);
  const place = await getPlaceBySlug(decodedSlug);
  
  if (!place) {
    return {
      title: 'Place Not Found',
      description: 'The requested place could not be found.'
    };
  }
  
  return {
    title: `${place.name} - Washington DC Directory`,
    description: place.description?.substring(0, 160) || `Visit ${place.name} in Washington DC.`,
  };
}

export default async function PlaceDetailPage({ params }: { params: Promise<PlaceDetailPageParams> }) {
  const decodedParams = await params;
  const decodedSlug = decodeURIComponent(decodedParams.placeSlug);
  
  // Get the place data
  const place = await getPlaceBySlug(decodedSlug);
  
  if (!place) {
    return notFound();
  }
  // Get related places
  const relatedPlaces = await getRelatedPlaces(place.id, place.subcategory_id);
  
  // Extract coordinates for map
  const coordinates = extractCoordinates(place.gps_coordinates as unknown as string);
  const today = getDayOfWeek();
  
  // Get operating status based on the day's hours
  const todayHours = place.hours?.[today as keyof typeof place.hours] || 'Unknown';
  const isOpen = todayHours !== 'Closed' && todayHours !== 'Unknown';
  
  return (
    <main className="min-h-screen pb-16">
      {/* Hero Section - Using improved ClientImage */}
      <section className="relative h-[40vh] min-h-[300px] max-h-[500px] w-full overflow-hidden mt-10">
        {/* Main image with overlay */}
        <div className="h-full w-full relative">
          {place.images && place.images.length > 0 ? (
            <Image 
              src={getImageUrl(place.images[0].image_url)}
              alt={place.images[0].alt_text || place.name}
              fill
              className="object-cover"
              sizes="100vw"
              priority
              unoptimized={place.images[0].image_url.includes('googleusercontent.com')}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
              <span className="text-2xl font-bold text-white">{place.name}</span>
            </div>
          )}
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/40 to-transparent z-10"></div>
          
          {/* Content overlay */}
          <div className="absolute inset-0 z-10 flex flex-col justify-end px-4 sm:px-6 lg:px-8 pb-12">
            <div className="max-w-5xl mx-auto w-full text-white">
              <div className="mb-2">
                <Link 
                  href={`/${place.categorySlug}/${place.subcategorySlug}`}
                  className="px-3 py-1 bg-white/10 text-white rounded-full text-xs font-medium inline-block backdrop-blur-sm"
                >
                  {place.subcategory}
                </Link>
                
                {place.price_range && (
                  <span className="px-3 py-1 bg-primary text-white rounded-full text-xs font-medium ml-2 inline-block">
                    {place.price_range}
                  </span>
                )}
                
                <span className={`px-3 py-1 ${isOpen ? 'bg-green-600' : 'bg-red-600'} text-white rounded-full text-xs font-medium ml-2 inline-block`}>
                  {isOpen ? 'Open Now' : 'Closed'}
                </span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">{place.name}</h1>
              
              {place.rating && (
                <div className="flex items-center mb-3">
                  <div className="flex mr-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg 
                        key={star}
                        className={`w-5 h-5 ${star <= Math.round(place.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`} 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-white/90">({place.reviews_count || 0} reviews)</span>
                </div>
              )}
              
              {place.address && (
                <p className="text-white/80 flex items-center text-sm">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {place.address}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="text-sm">
          <ol className="flex items-center space-x-2">
            <li>
               <Link href="/" className="text-primary hover:text-secondary transition">Home</Link>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-gray-500">/</span>
               <Link href={`/${place.categorySlug}`} className="text-primary hover:text-secondary transition">
                {place.category}
              </Link>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-gray-500">/</span>
              <Link 
                href={`/${place.categorySlug}/${place.subcategorySlug}`} 
                 className="text-primary hover:text-secondary transition"
              >
                {place.subcategory}
              </Link>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-gray-500">/</span>
              <span className="text-gray-600">{place.name}</span>
            </li>
          </ol>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Description */}
            {place.description && (
              <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">About</h2>
                <p className="text-gray-700 leading-relaxed">
                  {place.description}
                </p>
              </div>
            )}
            
            {/* Photo Gallery - Using improved ImageGallery with ClientImage */}
            {place.images && place.images.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Photo Gallery</h2>
                  <span className="text-sm text-gray-500">{place.images.length} photos</span>
                </div>
                
                <ImageGallery images={place.images} placeName={place.name} />
              </div>
            )}
            
            
            {/* Amenities - Categorized */}
            {place.amenities && place.amenities.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Amenities</h2>
                
                <div className="space-y-6">
                  {/* Categorized amenities - this is just an example, adjust based on your actual data structure */}
                  <AmenitiesCategory 
                    title="Accessibility" 
                    amenities={place.amenities.filter(a => 
                      a.name.toLowerCase().includes('wheelchair') || 
                      a.name.toLowerCase().includes('accessible')
                    ).map(a => ({
                      ...a,
                      icon: '',
                      created_at: new Date().toISOString(),
                      updated_at: new Date().toISOString()
                    }))} 
                  />
                  
                  <AmenitiesCategory 
                    title="Food & Drinks" 
                    amenities={place.amenities.filter(a => 
                      ['vegetarian', 'vegan', 'dessert', 'dinner', 'lunch', 'brunch', 'food', 
                       'beer', 'wine', 'cocktails', 'alcohol', 'liquor', 'coffee'].some(term => 
                        a.name.toLowerCase().includes(term)
                      )
                    ).map(a => ({
                      ...a,
                      icon: '',
                      created_at: new Date().toISOString(),
                      updated_at: new Date().toISOString()
                    }))} 
                  />
                  
                  <AmenitiesCategory 
                    title="Facilities & Services" 
                    amenities={place.amenities.filter(a => 
                      ['wifi', 'wi-fi', 'parking', 'restroom', 'reservations', 'delivery', 
                       'takeout', 'service', 'catering', 'cards', 'seating'].some(term => 
                        a.name.toLowerCase().includes(term)
                      )
                    ).map(a => ({
                      ...a,
                      icon: '',
                      created_at: new Date().toISOString(),
                      updated_at: new Date().toISOString()
                    }))} 
                  />
                  
                  <AmenitiesCategory 
                    title="Special Features" 
                    amenities={place.amenities.filter(a => 
                      ['family', 'kids', 'children', 'lgbtq', 'groups', 'tourists', 
                       'trendy', 'romantic', 'cozy', 'dog', 'pet'].some(term => 
                        a.name.toLowerCase().includes(term)
                      )
                    ).map(a => ({
                      ...a,
                      icon: '',
                      created_at: new Date().toISOString(),
                      updated_at: new Date().toISOString()
                    }))} 
                  />
                  
                  {/* Catch-all for any uncategorized amenities */}
                  <AmenitiesCategory 
                    title="Other Amenities" 
                    amenities={place.amenities.filter(a => 
                      !(['wheelchair', 'accessible', 
                         'vegetarian', 'vegan', 'dessert', 'dinner', 'lunch', 'brunch', 'food',
                         'beer', 'wine', 'cocktails', 'alcohol', 'liquor', 'coffee',
                         'wifi', 'wi-fi', 'parking', 'restroom', 'reservations', 'delivery',
                         'takeout', 'service', 'catering', 'cards', 'seating',
                         'family', 'kids', 'children', 'lgbtq', 'groups', 'tourists', 
                         'trendy', 'romantic', 'cozy', 'dog', 'pet'].some(term => 
                          a.name.toLowerCase().includes(term))
                      )
                    ).map(a => ({
                      ...a,
                      icon: '',
                      created_at: new Date().toISOString(),
                      updated_at: new Date().toISOString()
                    }))} 
                  />
                </div>
              </div>
            )}

            {/* Add Google Map */}
            {coordinates && (
              <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Location</h2>
              
                <GoogleMap 
                  placeName={place.name}
                />
                {place.address && (
                  <p className="mt-4 text-gray-600 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {place.address}
                  </p>
                )}
              </div>
            )}
            
            {/* Reviews Section */}
            {/* <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>
                <button className="px-4 py-2 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition font-medium text-sm">
                  View All Reviews
                </button>
              </div>
              
              <div className="p-8 bg-primary/10 rounded-lg text-center">
                <div className="mb-3">
                  <svg className="w-12 h-12 mx-auto text-primary/40" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-600 mb-3">Reviews will be displayed here</p>
                <button className="px-4 py-2 bg-primary text-white rounded-full hover:bg-secondary transition font-medium text-sm">
                  Write a Review
                </button>
              </div>
            </div> */}
          </div>
          
          {/* Right Column - Info Card & Map */}
          <div className="lg:col-span-1">
            {/* Info Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8 sticky top-24">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Information</h3>
              
              {/* Hours */}
              <div className="mb-6">
                <h4 className="font-medium mb-2 text-gray-900 flex items-center">
                   <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Hours
                </h4>
                <div className="space-y-1.5">
                  {place.hours && Object.entries(place.hours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between text-sm">
                      <span className={`capitalize ${day === today ? 'font-bold text-primary' : 'text-gray-600'}`}>
                        {day}{day === today ? ' (Today)' : ''}
                      </span>
                      <span className={day === today ? 'font-bold text-primary' : 'text-gray-700'}>
                        {hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Contact */}
              {place.phone && (
                <div className="mb-6">
                  <h4 className="font-medium mb-2 text-gray-900 flex items-center">
                     <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Contact
                  </h4>
                  <div className="text-gray-700 text-sm ml-7">{place.phone}</div>
                </div>
              )}
              
              {/* Website if available */}
              {place.website && (
                <div className="mb-6">
                  <h4 className="font-medium mb-2 text-gray-900 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    Website
                  </h4>
                   <div className="text-primary hover:underline text-sm ml-7">
                    <a href={place.website} target="_blank" rel="noopener noreferrer">
                      {place.website.replace(/https?:\/\/(www\.)?/, '')}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Places */}
      {relatedPlaces.length > 0 && (
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <span className="px-4 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium mb-3 inline-block">Explore More</span>
              <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Similar Places</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">You might also like these places</p>
            </div>
            
            <RelatedPlaces places={relatedPlaces} />
          </div>
        </div>
      )}
    </main>
  );
} 