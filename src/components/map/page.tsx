"use client";

import { useState } from 'react';

export default function MapPage() {
  const [selectedLocation, setSelectedLocation] = useState('washington-dc');

  const locations = [
    { id: 'washington-dc', name: 'Washington DC', coords: '38.9072,-77.0369' },
    { id: 'national-mall', name: 'National Mall', coords: '38.8895,-77.0093' },
    { id: 'georgetown', name: 'Georgetown', coords: '38.9095,-77.0654' },
    { id: 'capitol-hill', name: 'Capitol Hill', coords: '38.8898,-77.0090' },
    { id: 'tidal-basin', name: 'Tidal Basin', coords: '38.8815,-77.0369' }
  ];

  const getMapUrl = (coords: string) => {
    return `https://maps.google.com/maps?q=${coords}&z=14&t=m&output=embed`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#113b5c] to-[#b84435] text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Washington DC Map
          </h1>
          <p className="text-xl text-blue-100">
            Explore the nation's capital with our interactive map
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Location Selector */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {locations.map((location) => (
              <button
                key={location.id}
                onClick={() => setSelectedLocation(location.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedLocation === location.id
                    ? 'bg-[#b84435] text-white shadow-lg'
                    : 'bg-white text-[#113b5c] hover:bg-[#113b5c] hover:text-white border-2 border-[#113b5c]'
                }`}
              >
                {location.name}
              </button>
            ))}
          </div>
        </div>

        {/* Map Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900">
              {locations.find(loc => loc.id === selectedLocation)?.name}
            </h2>
            <p className="text-gray-600 mt-2">
              Interactive map view of the selected location
            </p>
          </div>
          
          {/* Responsive Map */}
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src={getMapUrl(locations.find(loc => loc.id === selectedLocation)?.coords || '38.9072,-77.0369')}
              className="absolute top-0 left-0 w-full h-full border-0"
              title="Washington DC Interactive Map"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Quick Info Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-[#113b5c] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🏛️</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Landmarks</h3>
            <p className="text-gray-600">150+ iconic sites</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-[#b84435] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🍽️</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Dining</h3>
            <p className="text-gray-600">World-class restaurants</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-[#113b5c] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎭</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Culture</h3>
            <p className="text-gray-600">Museums & theaters</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-[#b84435] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🌳</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Nature</h3>
            <p className="text-gray-600">Parks & gardens</p>
          </div>
        </div>
      </div>
    </div>
  );
}
