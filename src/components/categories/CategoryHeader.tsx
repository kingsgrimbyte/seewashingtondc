"use client";

import React, { useState, useEffect } from 'react';
import ResponsiveImage from '@/components/ui/ResponsiveImage';

interface CategoryHeaderProps {
  title: string;
  description?: string;
  imageUrl?: string;
  aiIntroText?: string;
  aiOutroText?: string;
}

export default function CategoryHeader({
  title,
  description,
  imageUrl,
  aiIntroText,
  aiOutroText
}: CategoryHeaderProps) {
  const [scrollY, setScrollY] = useState(0);
  // Handle scroll for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative">
      <div className="relative h-[50vh] min-h-[400px] max-h-[600px] w-full overflow-hidden">
        {/* Background image with parallax effect */}
        <div 
          className="h-full w-full relative transform transition-transform duration-1000 ease-out"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        >
          {imageUrl ? (
            <ResponsiveImage
              src={imageUrl}
              alt={title}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <ResponsiveImage
              src='https://ik.imagekit.io/h7rza8886p/united-states-capitol-with-reflection-night-washington-dc-usa.jpg'
              alt={title}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/40 to-transparent"></div>
          
          {/* Animated light particles effect */}
          <div className="absolute inset-0 opacity-30">
            <div className="firefly"></div>
            <div className="firefly"></div>
            <div className="firefly"></div>
          </div>
        </div>
        
        {/* Content */}
        <div 
          className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pt-20"
          style={{ transform: `translateY(calc(${scrollY * -0.1}px - 2rem))` }}
        >
          <div className="text-white mb-12">
            <span className="px-4 py-1 bg-white/10 text-white rounded-full text-sm font-medium mb-3 inline-block backdrop-blur-sm">
              Explore DC
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-3 capitalize">{title}</h1>
            {description && (
              <p className="text-xl max-w-3xl mx-auto text-white/90">{description}</p>
            )}
          </div>
        </div>
        
        {/* Wave divider at bottom */}
        <div 
        className="absolute bottom-[-1px] left-0 right-0 overflow-hidden z-10 pointer-events-none"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      >
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="block h-16 w-full fill-white rotate-180"
        >
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path>
        </svg>
      </div>
      </div>
      
      {aiIntroText && (
        <div className="max-w-4xl mx-auto mt-6 px-4 py-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-primary/20 md:-mt-16 relative z-10">
          <p className="text-gray-700 leading-relaxed">{aiIntroText}</p>
        </div>
      )}
      
      {aiOutroText && (
        <div className="max-w-4xl mx-auto mt-16 px-4 md:px-8">
          <div className="p-6 bg-primary/10 backdrop-blur-sm rounded-xl border border-primary/20 shadow-sm">
            <h3 className="text-lg font-medium text-primary mb-2">More About {title}</h3>
            <p className="text-gray-700">{aiOutroText}</p>
          </div>
        </div>
      )}
    </div>
  );
} 