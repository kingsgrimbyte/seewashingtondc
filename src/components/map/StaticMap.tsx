"use client";

import { useState, useEffect } from 'react';
import InteractiveMap from './InteractiveMap';
import { Search, MapPin, Navigation, Star, Clock, Users } from 'lucide-react';
import Hero from '../layout/Hero';

interface LocationCard {
  id: string;
  name: string;
  description: string;
  coordinates: { lat: number; lng: number };
  rating: number;
  category: string;
  visitTime: string;
  crowdLevel: string;
}

const popularLocations: LocationCard[] = [
  {
    id: '1',
    name: 'National Mall',
    description: 'Historic park featuring iconic monuments and museums',
    coordinates: { lat: 38.8895, lng: -77.0093 },
    rating: 4.8,
    category: 'Landmark',
    visitTime: '2-4 hours',
    crowdLevel: 'High'
  },
  {
    id: '2',
    name: 'Georgetown',
    description: 'Charming historic neighborhood with shopping and dining',
    coordinates: { lat: 38.9095, lng: -77.0654 },
    rating: 4.6,
    category: 'Neighborhood',
    visitTime: '3-5 hours',
    crowdLevel: 'Medium'
  },
  {
    id: '3',
    name: 'Capitol Hill',
    description: 'Home to the US Capitol and Supreme Court',
    coordinates: { lat: 38.8898, lng: -77.0090 },
    rating: 4.7,
    category: 'Government',
    visitTime: '2-3 hours',
    crowdLevel: 'Medium'
  },
  {
    id: '4',
    name: 'Tidal Basin',
    description: 'Famous for cherry blossoms and Jefferson Memorial',
    coordinates: { lat: 38.8815, lng: -77.0369 },
    rating: 4.9,
    category: 'Nature',
    visitTime: '1-2 hours',
    crowdLevel: 'Low'
  }
];

export default function StaticMap() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<LocationCard | null>(null);
  const [mapCenter, setMapCenter] = useState({ lat: 38.8937545, lng: -77.014576 });
  const [isSearching, setIsSearching] = useState(false);

  const handleLocationSelect = (location: LocationCard) => {
    setSelectedLocation(location);
    setMapCenter(location.coordinates);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearching(true);
      // Simulate search delay
      setTimeout(() => {
        setIsSearching(false);
      }, 1000);
    }
  };

  const filteredLocations = popularLocations.filter(location =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
   <Hero  title="Explore Washington DC" subtitle=""/>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-[#b84435]" />
                  Interactive Map
                </h2>
                <p className="text-gray-600 mt-2">
                  Navigate and explore Washington DC's most iconic locations
                </p>
              </div>
              <div className="h-[600px] w-full">
              <div className="h-full w-full relative">
            <iframe
                  src="https://maps.google.com/maps?q=washington%20dc&t=&z=12&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full rounded-2xl"
                  title="Washington DC Neighborhoods Map"
                ></iframe>
            </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">DC Quick Facts</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#113b5c] bg-opacity-10 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[#113b5c]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Population</p>
                    <p className="font-semibold text-gray-900">~700K</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#b84435] bg-opacity-10 rounded-full flex items-center justify-center">
                    <Star className="w-5 h-5 text-[#b84435]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Landmarks</p>
                    <p className="font-semibold text-gray-900">150+</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#113b5c] bg-opacity-10 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-[#113b5c]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Best Time</p>
                    <p className="font-semibold text-gray-900">Spring/Fall</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Popular Locations */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Popular Locations</h3>
              <div className="space-y-4">
                {filteredLocations.map((location) => (
                  <div
                    key={location.id}
                    onClick={() => handleLocationSelect(location)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-md ${
                      selectedLocation?.id === location.id
                        ? 'border-[#b84435] bg-[#b84435] bg-opacity-5'
                        : 'border-gray-100 hover:border-[#113b5c] hover:border-opacity-30'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{location.name}</h4>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium text-gray-700">{location.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{location.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="bg-[#113b5c] bg-opacity-10 text-[#113b5c] px-2 py-1 rounded-full">
                        {location.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {location.visitTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {location.crowdLevel}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-[#113b5c] to-[#b84435] rounded-2xl shadow-xl p-6 text-white text-center">
              <Navigation className="w-12 h-12 mx-auto mb-4 text-white" />
              <h3 className="text-xl font-bold mb-2">Ready to Explore?</h3>
              <p className="text-blue-100 mb-4">
                Get personalized recommendations and plan your perfect DC adventure
              </p>
              <button className="bg-white text-[#113b5c] px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300">
                Plan My Trip
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 