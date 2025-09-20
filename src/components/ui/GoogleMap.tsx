'use client';

/// <reference types="google.maps" />
import { useEffect, useRef } from 'react';

interface GoogleMapProps {
  latitude?: number;
  longitude?: number;
  placeName?: string;
}

declare global {
  interface Window {
    google: typeof google;
  }
}

const GoogleMap = ({ latitude, longitude, placeName }: GoogleMapProps) => {
  // Create the map URL with the location and optional place name
  const mapUrl = placeName
    ? `https://maps.google.com/maps?q=${encodeURIComponent(placeName)}+washington+dc&ll=${latitude},${longitude}&z=14&t=m&output=embed`
    : `https://maps.google.com/maps?q=${latitude},${longitude}&z=14&t=m&output=embed`;

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden" style={{ border: '1px solid #e5e7eb' }}>
      <iframe
        title={`Map showing location of ${placeName || 'selected coordinates'}`}
        width="100%"
        height="100%"
        style={{ border: 'none' }}
        src={mapUrl}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

export default GoogleMap; 