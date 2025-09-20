import { Place } from '@/lib/types';

interface PlaceMapProps {
  place: Place;
}

export default function PlaceMap({ place }: PlaceMapProps) {
  // Extract coordinates from point data
  const extractCoordinates = (gpsPoint: string | null): { latitude: number; longitude: number } | null => {
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
  };

  const coordinates = extractCoordinates(place.gps_coordinates as unknown as string);

  if (!coordinates) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-bold mb-4 text-gray-900">Location</h3>
        <div className="relative h-48 bg-primary/10 rounded-lg overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="mb-2">
                <svg className="w-10 h-10 mx-auto text-primary/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span className="text-sm text-gray-600">Location not available</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-xl font-bold mb-4 text-gray-900">Location</h3>
      <div className="relative h-48 bg-primary/10 rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="mb-2">
                <svg className="w-10 h-10 mx-auto text-primary/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="text-sm text-gray-600">Map view will be displayed here</span>
          </div>
        </div>
      </div>
      
      {place.address && (
        <div className="mt-4 text-sm text-gray-600">
          <p>{place.address}</p>
          <a 
            href={`https://www.google.com/maps/search/?api=1&query=${coordinates.latitude},${coordinates.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-secondary hover:underline mt-1 inline-block"
          >
            View on Google Maps
          </a>
        </div>
      )}
    </div>
  );
} 