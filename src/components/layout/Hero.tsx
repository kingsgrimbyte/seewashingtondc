'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type HeroProps = {
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaLink?: string;
};

// Background image URLs - we'll rotate through these
const backgroundImages = [
  'https://ik.imagekit.io/h7rza8886p/architecture-2025-03-15-05-09-37-utc.jpg?updatedAt=1754465975568',
  // Add more background images if available
];

// Popular search suggestions
const searchSuggestions = [
  'Smithsonian Museums',
  'Lincoln Memorial',
  'Waterfront Restaurants',
  'National Mall',
  'Georgetown',
  'Tidal Basin',
];

export default function Hero({ title, subtitle, ctaText, ctaLink }: HeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Handle scroll for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Rotate background images every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Handle click outside of search suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchRef]);

  // Handle search term change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setIsFocused(false);
  };

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Navigate to search page with query
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className="relative h-[80vh] max-h-[800px] min-h-[600px] flex items-center justify-center ">
      {/* Parallax Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Main background image */}
        <div 
          className="h-full w-full relative transform transition-transform duration-1000 ease-out"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        >
          <Image
            src={`${backgroundImages[currentImageIndex].replace('public/', '')}`}
            alt="Washington DC"
            fill
            className="object-cover "
            priority
            sizes="100vw"
          />
        </div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/40 to-transparent z-1"></div>
        
        {/* Animated light particles effect */}
        <div className="absolute inset-0 z-2 opacity-30">
          <div className="firefly"></div>
          <div className="firefly"></div>
          <div className="firefly"></div>
          <div className="firefly"></div>
          <div className="firefly"></div>
          <div className="firefly"></div>
          <div className="firefly"></div>
        </div>
      </div>
      
      {/* Hero content */}
      <div 
        className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
        style={{ transform: `translateY(${scrollY * -0.2}px)` }}
      >
        <span className="px-4 py-1 bg-white/10 text-white rounded-full text-sm font-medium mb-6 inline-block backdrop-blur-sm">
          Welcome to the Capital
        </span>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          {title}
        </h1>
        
        <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
          {subtitle}
        </p>
        
        {/* Advanced Search box */}
        <div className="mt-12 max-w-2xl mx-auto relative" ref={searchRef}>
          <form onSubmit={handleSearch}>
            <div className="relative backdrop-blur-sm rounded-full shadow-2xl">
              <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input 
                ref={inputRef}
                type="text" 
                placeholder="Where would you like to explore in Washington, DC?" 
                className="w-full pl-14 pr-16 py-5 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary border-none transition-all duration-300 bg-white/95 placeholder-gray-400"
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={() => setIsFocused(true)}
              />
              <button 
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-primary text-white p-3 rounded-full hover:bg-secondary transition-colors duration-300 shadow-md"
              >
                Explore
              </button>
            </div>
          </form>
          
          {/* Search suggestions - fixed positioning to prevent overflow */}
          {isFocused && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl z-[9999] border border-gray-100 max-h-80 overflow-y-auto">
              <div className="mb-2">
                <p className="text-sm font-medium text-gray-500">Popular Searches</p>
              </div>
              <ul className="space-y-2">
                {searchSuggestions.map((suggestion, index) => (
                  <li key={index}>
                    <button 
                      className="w-full text-left px-3 py-2 hover:bg-primary/5 rounded-lg flex items-center text-gray-700"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <span className="h-8 w-8 flex items-center justify-center bg-primary/10 text-primary rounded-full mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                      {suggestion}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      
      {/* Wave divider at bottom with parallax effect - fixed positioning and styling */}
{/* Wave divider at bottom with parallax effect - fixed positioning and styling */}
{/* <div 
  className="absolute bottom-0 left-0 right-0 overflow-hidden z-10 pointer-events-none"
  style={{ transform: `translateY(${scrollY * 0.1}px)` }}
>
  <svg
    viewBox="0 0 1200 120"
    preserveAspectRatio="none"
    className="block h-16 w-full fill-white rotate-180"
    style={{ marginBottom: '0', paddingBottom: '0' }} // Adjust this to remove the black line
  >
    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path>
  </svg>
</div> */}


    </div>
  );
}