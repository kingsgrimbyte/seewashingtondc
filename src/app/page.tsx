import Link from 'next/link';
import { Suspense } from 'react';
import { Metadata } from 'next/types';
// Note: using AppIcon for calendar where needed; removing lucide import to stick to React Icons

import Hero from '@/components/layout/Hero';

// Category Components
import CategoryGrid from '@/components/categories/CategoryGrid';
// Listing Components
import FeaturedListings from '@/components/listings/FeaturedListings';
import InteractiveMap from '@/components/map/InteractiveMap';

// Content
import { 
  getHomeContent, 
  getQuickCategories, 
  getWhyVisitDC, 
  getSeasonalGuide, 
  getPopularNow, 
  getBookYourStay, 
  getNeighborhoods, 
  getBlogGuides,
  getFAQ 
} from '@/lib/homeContent';
import AppIcon from '@/components/ui/AppIcon';
import HorizontalScroller from '@/components/ui/HorizontalScroller';

export const metadata: Metadata = {
  title: 'Things to Do in Washington, DC | Best Washington, DC Attractions & Activities',
  description: 'Discover the best things to do in Washington, DC, including top attractions, museums, outdoor activities, and local events. Plan your perfect trip to Washington, DC today!',
  openGraph: {
    title: 'Things to Do in Washington, DC | Best Washington, DC Attractions & Activities',
    description: 'Discover the best things to do in Washington, DC, including top attractions, museums, outdoor activities, and local events. Plan your perfect trip to Washington, DC today!',
    type: 'website',
    locale: 'en_US',
    siteName: 'Washington DC Directory',
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    'application/ld+json': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Washington DC Directory',
      url: '__DYNAMIC_URL_BASE__',
      description: 'Discover the best things to do in Washington, DC, including top attractions, museums, outdoor activities, and local events. Plan your perfect trip to Washington, DC today!',
      potentialAction: {
        '@type': 'SearchAction',
        target: '__DYNAMIC_URL_BASE__/search?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    })
  }
};

export default function HomePage() {
  const homeContent = getHomeContent();
  const quickCategories = getQuickCategories();
  const whyVisitDC = getWhyVisitDC();
  const seasonalGuide = getSeasonalGuide();
  const popularNow = getPopularNow();
  const bookYourStay = getBookYourStay();
  const neighborhoods = getNeighborhoods();
  const blogGuides = getBlogGuides();
  const faq = getFAQ();

  return (
    <main className="min-h-screen">
      {/* Enhanced Hero Section */}
      <Hero 
        title={homeContent.hero.title}
        subtitle={homeContent.hero.subtitle}
        ctaText={homeContent.hero.ctaText}
        ctaLink={homeContent.hero.ctaLink}
      />
      
      {/* Search Section */}
      {/* <section className="relative -mt-8 px-4 md:px-8 max-w-7xl mx-auto z-10">
        <SearchBar />
      </section> */}
      
      {/* Quick Category Access - Horizontal Scrolling with Arrows */}
      <section className="py-8 px-4 md:px-8 max-w-7xl mx-auto">
        <HorizontalScroller contentClassName="pb-4">
          {quickCategories.map((category) => (
            <Link 
              key={category.name}
              href={category.href} 
              className="flex-none transition-all group hover:scale-105"
            >
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-md p-4 flex flex-col items-center justify-center w-28 h-28 border border-gray-100 backdrop-blur-sm hover:bg-primary/5">
                <span className="text-3xl mb-2"><AppIcon name={category.icon as any} className="text-3xl" /></span>
                <span className="text-sm font-medium text-gray-700 group-hover:text-primary">{category.name}</span>
              </div>
            </Link>
          ))}
        </HorizontalScroller>
      </section>
      
      {/* Why Washington DC is a Must-Visit City Section */}
      <section className="py-10 px-4 md:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content Side */}
            <div className="relative z-10">
              <span className={`px-4 py-1 bg-gradient-to-r ${whyVisitDC.badgeColor} ${whyVisitDC.badgeTextColor} rounded-full text-xs font-medium mb-6 inline-block shadow-sm`}>
                {whyVisitDC.badge}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 leading-tight">
                {whyVisitDC.title.split('Must-Visit City')[0]}
                <span className={`bg-clip-text text-transparent bg-primary ${whyVisitDC.titleGradient}`}>
                  {' '}Must-Visit City
                </span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
                {whyVisitDC.description}
              </p>
              

              
              {/* CTA Button */}
              <Link 
                href={whyVisitDC.ctaLink} 
                className="inline-flex items-center gap-2 text-sm md:text-base px-8 py-4 bg-secondary text-white font-semibold rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:scale-105 hover:from-secondary hover:to-primary group"
              >
                {whyVisitDC.ctaText}
               
              </Link>
            </div>
            
            {/* Image Side */}
            <div className="relative">
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-[1.02] hover:shadow-primary/20">
                {/* Background gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-secondary/20 z-10"></div>
                
                {/* Main image */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/40 to-gray-600/40 z-20"></div>
                <img 
                  src={whyVisitDC.image} 
                  alt="Washington DC skyline with monuments" 
                  className="w-full h-full object-cover"
                />
                
                
                {/* Decorative elements */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-white/20 rounded-full z-30"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 border-2 border-white/30 rounded-full z-30"></div>
              </div>
              
              
            </div>
          </div>
        </div>
        
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-secondary/10 to-primary/10 rounded-full blur-3xl -z-10"></div>
      </section>
      
      {/* When Are You Looking to Visit Washington DC Section */}
      <section className="py-10 px-4 md:px-8 bg-gradient-to-br from-gray-50 to-blue-50/30 relative overflow-hidden ">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="px-4 py-1 bg-gradient-to-r from-primary to-secondary text-white rounded-full text-xs font-medium mb-6 inline-block shadow-sm">
              {seasonalGuide.badge}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 leading-tight">
              {seasonalGuide.title.split('Washington DC?')[0]}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                {' '}Washington DC?
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {seasonalGuide.description}
            </p>
          </div>
          
          {/* Seasonal Tabs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {seasonalGuide.seasons.map((season, index) => (
              <div 
                key={season.season}
                className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 border border-gray-100 overflow-hidden"
              >
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-secondary/15 opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Season icon and title */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-secondary from-primary to-secondary flex items-center justify-center shadow-lg">
                      <span className="text-2xl"><AppIcon name={season.icon as any} className="text-2xl text-white" /></span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">{season.season}</h3>
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {season.description}
                  </p>
                  
                  {/* Highlights */}
                  <div className="space-y-2">
                    {season.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <span className="text-sm text-gray-700 font-medium">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl"></div>
                
                {/* Decorative corner element */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary to-secondary opacity-20 rounded-bl-full group-hover:opacity-30 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>
          
          {/* CTA Section */}
          <div className="text-center">
            <Link 
              href={seasonalGuide.ctaLink}
              className="inline-flex items-center text-sm md:text-base gap-3 px-8 py-4 bg-secondary text-white font-semibold rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:scale-105 group"
            >
              <span>{seasonalGuide.ctaText}</span>
            </Link>
          </div>
        </div>
        
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-tl from-secondary/10 to-primary/10 rounded-full blur-3xl -z-10"></div>
      </section>
      
    

      {/* Why Choose Washington, DC Over Other Cities */}
      <section className="py-10 px-4 md:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <span className="px-4 py-1 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 rounded-full text-xs font-medium mb-6 inline-block shadow-sm">
              {bookYourStay.badge}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 leading-tight">
              {bookYourStay.title}
            </h2>
            {/* <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
              {bookYourStay.description}
            </p> */}
          </div>
          
          {/* Feature Grid - 3x2 Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Rich in History & Culture */}
            <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 border border-gray-100 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                  <AppIcon name="landmark" className="text-3xl text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors duration-300">
                  Rich in History & Culture
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Washington, DC is home to iconic landmarks and world-class museums, offering visitors a unique cultural and historical experience.
                </p>
              </div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary to-secondary opacity-10 rounded-bl-full group-hover:opacity-20 transition-opacity duration-500"></div>
            </div>

            {/* Free Admission to Museums */}
            <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 border border-gray-100 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                  <AppIcon name="museum" className="text-3xl text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors duration-300">
                  Free Admission to Museums
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  DC's Smithsonian Museums provide free access to some of the most renowned collections of art, history, and science.
                </p>
              </div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary to-secondary opacity-10 rounded-bl-full group-hover:opacity-20 transition-opacity duration-500"></div>
            </div>

            {/* Diverse Dining Scene */}
            <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 border border-gray-100 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                  <AppIcon name="restaurant" className="text-3xl text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors duration-300">
                  Diverse Dining Scene
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  The city boasts a wide range of dining options, from upscale restaurants to trendy food markets, offering something for every taste.
                </p>
              </div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary to-secondary opacity-10 rounded-bl-full group-hover:opacity-20 transition-opacity duration-500"></div>
            </div>

            {/* Exciting Nightlife */}
            <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 border border-gray-100 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                  <AppIcon name="moon" className="text-3xl text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors duration-300">
                  Exciting Nightlife
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  DC's nightlife is buzzing with vibrant bars, lounges, and live music venues, ensuring something for everyone after dark.
                </p>
              </div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary to-secondary opacity-10 rounded-bl-full group-hover:opacity-20 transition-opacity duration-500"></div>
            </div>

            {/* Outdoor Activities */}
            <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 border border-gray-100 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                  <AppIcon name="park" className="text-3xl text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors duration-300">
                  Outdoor Activities
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Whether it's kayaking on the Potomac or hiking in Rock Creek Park, DC offers plenty of outdoor adventures for nature lovers and adventure seekers.
                </p>
              </div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary to-secondary opacity-10 rounded-bl-full group-hover:opacity-20 transition-opacity duration-500"></div>
            </div>

            {/* Convenient Transportation */}
            <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 border border-gray-100 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                  <AppIcon name="car" className="text-3xl text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors duration-300">
                  Convenient Transportation
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  With an efficient Metro system, DC Circulator, and easy access to major airports, getting around the city is hassle-free.
                </p>
              </div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary to-secondary opacity-10 rounded-bl-full group-hover:opacity-20 transition-opacity duration-500"></div>
            </div>
          </div>
          
          {/* CTA Section */}
        
        </div>
        
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-secondary/10 to-primary/10 rounded-full blur-3xl -z-10"></div>
      </section>
      
        {/* What's Popular Right Now in Washington, DC */}
        <section className="py-10 px-4 md:px-8 max-w-7xl mx-auto relative overflow-hidden ">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 to-transparent opacity-70 -z-10"></div>
        
        <div className="mb-8 relative">
          <span className="px-4 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium mb-3 inline-block">Trending Now</span>
          <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-primary ">What's Popular Right Now in Washington, DC</h2>
          <p className="text-lg text-gray-600 md:w-2/3">Washington, DC is always buzzing with exciting events, festivals, and activities. Depending on the time of year, you can experience the energy of local celebrations, art exhibitions, or outdoor adventures. From seasonal showcases to neighborhood happenings, there's always something new to discover—whether you're planning ahead or exploring on the fly.</p>
        </div>
        
        <Suspense fallback={<RecommendationSkeleton />}>
          <FeaturedListings limit={6} />
        </Suspense>

        <div className="mt-8 text-center">
          <Link 
            href="/attractions"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary to-secondary text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
          >
            <span>Discover What's Happening Right Now →</span>
          
          </Link>
        </div>
      </section>
      
      
      {/* What's Popular Right Now in DC Section  choice 2*/}
      <section id="categories" className="py-16 px-4 md:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 text-center">
            <span className="px-4 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium mb-3 inline-block">Discover DC</span>
            <h2 className="text-3xl font-bold mb-2">Find Your Perfect Experience</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">From iconic monuments to hidden gems, explore everything Washington DC has to offer</p>
          </div>
          
          <Suspense fallback={<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
            {Array(8).fill(0).map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-xl h-64"></div>
            ))}
          </div>}>
            <CategoryGrid />
          </Suspense>
        </div>
      </section>
      
      {/* Interactive Map Section with 3D effect */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <span className="px-4 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium mb-3 inline-block">Spatial Discovery</span>
            <h2 className="text-3xl font-bold mb-4">Explore DC By Location</h2>
            <p className="text-lg text-gray-600 mb-6">
            Easily find attractions, restaurants, museums, and more based on your location or areas of interest.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Filter by category and distance',
                'Save your favorite spots',
                'Get directions and transit options',
                'Check real-time availability and crowd levels'
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:w-1/2 h-[450px] rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-[1.02] hover:shadow-primary/20 perspective">
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
      </section>
     {/* FAQ Section */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="px-4 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium mb-4 inline-block">
              {faq.badge}
            </span>
            <h2 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
              {faq.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{faq.description}</p>
          </div>

          <div className="space-y-4">
            {faq.items.map((item, index) => (
              <details
                key={index}
                className="group rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-sm shadow-sm open:shadow-md open:border-primary/20 transition-all duration-300"
              >
                <summary className="list-none cursor-pointer flex items-start justify-between gap-4 p-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 group-open:text-gray-900">
                      {item.question}
                    </h3>
                  </div>
                  <div className="mt-1 shrink-0 h-9 w-9 rounded-full bg-secondary text-white flex items-center justify-center shadow group-open:rotate-45 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                    </svg>
                  </div>
                </summary>
                <div className="px-6 pb-6 -mt-2 text-gray-600 leading-relaxed">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
} 

// Skeleton loading component for recommendations
function RecommendationSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array(6).fill(0).map((_, i) => (
        <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
          <div className="h-48 bg-gray-200"></div>
          <div className="p-4">
            <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded mb-4 w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      ))}
    </div>
  );
} 


// {/* The DC Insider Blog & Travel Guides Section */}
// <section className="py-20 px-4 md:px-8 relative overflow-hidden">
// <div className="max-w-7xl mx-auto">
//   {/* Header Section */}
//   <div className="text-center mb-12">
//     <span className="px-4 py-1 bg-gradient-to-r from-primary to-secondary text-white rounded-full text-xs font-medium mb-6 inline-block shadow-sm">
//       {blogGuides.badge}
//     </span>
//     <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 leading-tight">
//       {blogGuides.title.split('Travel Guides')[0]}
//       <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
//         {' '}Travel Guides
//       </span>
//     </h2>
//     <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
//       {blogGuides.description}
//     </p>
//   </div>
  
//   {/* Blog Previews Grid */}
//   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
//     {blogGuides.blogPosts.map((blog, index) => (
//       <div 
//         key={blog.title}
//         className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 border border-gray-100 overflow-hidden"
//         style={{
//           animationDelay: `${index * 200}ms`
//         }}
//       >
//         {/* Background gradient */}
//         <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
        
//         {/* Image */}
//         <div className="relative h-48 overflow-hidden">
//           <div className="absolute inset-0 bg-gradient-to-br from-gray-900/40 to-gray-600/40 z-10"></div>
//           <img 
//             src={blog.image} 
//             alt={blog.title}
//             className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//           />
          
//           {/* Category badge */}
//           <div className="absolute top-4 left-4 z-20">
//             <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-medium text-gray-700">
//               {blog.category}
//             </span>
//           </div>
          
//           {/* Read time */}
//           <div className="absolute top-4 right-4 z-20">
//             <span className="px-2 py-1 bg-black/50 backdrop-blur-md rounded-full text-xs font-medium text-white">
//               {blog.readTime}
//             </span>
//           </div>
//         </div>
        
//         {/* Content */}
//         <div className="relative z-10 p-6">
//           {/* Icon and title */}
//           <div className="flex items-center gap-3 mb-4">
           
//             <div className="flex-1">
//               <h3 className="text-2xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors duration-300 line-clamp-2">
//                 {blog.title}
//               </h3>
//             </div>
//           </div>
          
//           {/* Description */}
//           <p className="text-gray-600 mb-4 leading-relaxed">
//             {blog.description}
//           </p>
          
//           {/* Read more link */}
//           <div className="flex items-center justify-between">
//               <Link 
//                 href={blog.link}
//                 className="inline-flex items-center gap-2 text-primary font-semibold hover:text-secondary transition-colors duration-300 group/link"
//               >
//               <span>Read More</span>
//               <svg 
//                 xmlns="http://www.w3.org/2000/svg" 
//                 className="h-4 w-4 group-hover/link:translate-x-1 transition-transform duration-300" 
//                 fill="none" 
//                 viewBox="0 0 24 24" 
//                 stroke="currentColor"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//               </svg>
//             </Link>
            
//             {/* Decorative element */}
//             <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
//           </div>
//         </div>
        
//         {/* Hover effect overlay */}
//         <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl"></div>
        
//         {/* Decorative corner element */}
//         <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary to-secondary opacity-20 rounded-bl-full group-hover:opacity-30 transition-opacity duration-500"></div>
//       </div>
//     ))}
//   </div>
  
//   {/* Additional Blog Preview - Featured */}
//   <div className="relative bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 mb-12 border border-primary/20">
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
//       <div>
//         <span className="px-4 py-1 bg-gradient-to-r from-primary to-secondary text-white rounded-full text-xs font-medium mb-4 inline-block shadow-sm">
//           {blogGuides.featuredGuide.badge}
//         </span>
//         <h3 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
//           {blogGuides.featuredGuide.title}
//         </h3>
//         <p className="text-lg text-gray-600 mb-6 leading-relaxed">
//           {blogGuides.featuredGuide.description}
//         </p>
//         <div className="flex items-center gap-4 mb-6">
//           <div className="flex items-center gap-2">
//             <span className="text-primary"><AppIcon name="star" className="text-sm" /></span>
//             <span className="text-sm text-gray-600">{blogGuides.featuredGuide.rating} rating</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <span className="text-primary"><AppIcon name="calendar" className="w-4 h-4" /></span>
//             <span className="text-sm text-gray-600">{blogGuides.featuredGuide.readTime}</span>
//           </div>
//         </div>
//         <Link 
//           href={blogGuides.featuredGuide.link}
//           className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-white font-semibold rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:scale-105 group"
//         >
//           <span>Read Full Guide</span>
//           <svg 
//             xmlns="http://www.w3.org/2000/svg" 
//             className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" 
//             fill="none" 
//             viewBox="0 0 24 24" 
//             stroke="currentColor"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//           </svg>
//         </Link>
//       </div>
//       <div className="relative">
//         <div className="relative h-64 rounded-xl overflow-hidden shadow-xl">
//           <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 z-10"></div>
//           <img 
//             src={blogGuides.featuredGuide.image} 
//             alt="DC Family Adventure"
//             className="w-full h-full object-cover"
//           />
          
//            {/* Floating elements */}
//           <div className="absolute top-4 right-4 z-20">
//             <div className="bg-white/90 backdrop-blur-md rounded-full p-2 shadow-lg">
//                 <AppIcon name="users" className="text-xl" />
//             </div>
//           </div>
//           <div className="absolute bottom-4 left-4 z-20">
//             <div className="bg-white/90 backdrop-blur-md rounded-full p-2 shadow-lg">
//                 <AppIcon name="bullseye" className="text-xl" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
  
//   {/* CTA Section */}
//   <div className="text-center">
//   <Link 
//     href={blogGuides.ctaLink} 
//     className="inline-flex items-center gap-3 px-8 py-4 bg-secondary text-white font-semibold rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:scale-105 group"
//   >
//       <span>{blogGuides.ctaText}</span>
//       <svg 
//         xmlns="http://www.w3.org/2000/svg" 
//         className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" 
//         fill="none" 
//         viewBox="0 0 24 24" 
//         stroke="currentColor"
//       >
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//       </svg>
//     </Link>
//   </div>
// </div>

// {/* Background decorative elements */}
// <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl -z-10"></div>
// <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tl from-secondary/10 to-primary/10 rounded-full blur-3xl -z-10"></div>
// </section>