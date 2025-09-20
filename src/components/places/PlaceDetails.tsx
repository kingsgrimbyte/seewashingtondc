import { Place } from '@/lib/types';

interface PlaceDetailsProps {
  place: Place;
}

export default function PlaceDetails({ place }: PlaceDetailsProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">About</h2>
      {place.description ? (
        <p className="text-gray-700 leading-relaxed">{place.description}</p>
      ) : (
        <p className="text-gray-500 italic">No description available.</p>
      )}
      
      {place.amenities && place.amenities.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4 text-gray-900">Amenities</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {place.amenities.map((amenity) => (
              <div key={amenity.id} className="flex items-center text-gray-700">
                <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {amenity.name}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {place.hours && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4 text-gray-900">Hours</h3>
          <div className="space-y-2">
            {Object.entries(place.hours).map(([day, hours]) => (
              <div key={day} className="flex justify-between">
                <span className="capitalize text-gray-700">{day}</span>
                <span className="text-gray-600">{hours}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {(place.phone || place.website) && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4 text-gray-900">Contact</h3>
          <div className="space-y-3">
            {place.phone && (
              <div className="flex items-center text-gray-700">
                <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {place.phone}
              </div>
            )}
            {place.website && (
              <div className="flex items-center text-primary hover:text-secondary">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <a href={place.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {place.website.replace(/https?:\/\/(www\.)?/, '')}
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 