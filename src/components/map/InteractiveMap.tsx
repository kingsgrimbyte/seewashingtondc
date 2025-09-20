"use client";

import { useEffect, useRef, useState } from 'react';
import StaticMap from './page';

interface InteractiveMapProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  className?: string;
}

export default function InteractiveMap({ 
  center = { lat: 38.8937545, lng: -77.014576 }, // Washington DC coordinates
  zoom = 12,
  className = ''
}: InteractiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    // Load Google Maps script
    const loadGoogleMaps = () => {
      if (window.google && mapRef.current && !mapInstanceRef.current) {
        try {
          const mapOptions = {
            center,
            zoom,
            mapTypeControl: true,
            streetViewControl: true,
            fullscreenControl: true,
            zoomControl: true,
            styles: [
              {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }]
              }
            ]
          };

          mapInstanceRef.current = new google.maps.Map(mapRef.current, mapOptions);
          
          // Add a marker for Washington DC
          new google.maps.Marker({
            position: center,
            map: mapInstanceRef.current,
            title: "Washington DC"
          });
        } catch (error) {
          console.error("Error initializing Google Maps:", error);
          setMapError("Failed to initialize map. Please check your API key.");
        }
      }
    };

    // Check if Google Maps is already loaded
    if (window.google) {
      loadGoogleMaps();
    } else {
      // Check if API key is available
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
      if (!apiKey) {
        setMapError("Google Maps API key is missing. Please add it to your .env.local file.");
        return;
      }

      // Load Google Maps script
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
      script.async = true;
      script.defer = true;
      script.onload = loadGoogleMaps;
      script.onerror = () => {
        console.error("Failed to load Google Maps script");
        setMapError("Failed to load Google Maps. Please check your internet connection.");
      };
      document.head.appendChild(script);
    }

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        // Clean up the map instance if needed
        mapInstanceRef.current = null;
      }
    };
  }, [center, zoom]);

 
  return (
    <div 
      ref={mapRef} 
      className={`w-full h-full rounded-lg overflow-hidden ${className}`}
    />
  );
} 