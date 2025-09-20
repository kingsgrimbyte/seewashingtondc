"use client";
import React, { useState, useEffect, Suspense } from "react";
import {
  MapPin,
  Calendar as LuCalendar,
  Navigation,
  ExternalLink,
  Map,
  Star as LuStar,
  Clock,
  Users,
  ArrowRight,
  TrendingUp,
  Award,
  Globe,
  Star,
  Calendar,
} from "lucide-react";
import AppIcon from "@/components/ui/AppIcon";
import Hero from "@/components/layout/Hero";
import CategoryGrid from "@/components/categories/CategoryGrid";
import {
  FaCalendarAlt,
  FaLeaf,
  FaPlane,
  FaTrain,
  FaSubway,
  FaBus,
  FaMapMarkerAlt,
  FaClock,
  FaThermometerHalf,
  FaUmbrellaBeach,
} from "react-icons/fa";
import {
  MdFlight,
  MdDirectionsBus,
  MdDirectionsSubway,
  MdDirectionsWalk,
} from "react-icons/md";
import { GiCherry } from "react-icons/gi";
import SeoContentSection from "@/components/ui/SeoContentSection";
import MapSection from "@/components/ui/MapSection";

// Updated JSON data structure
const pageContent = {
  hero: {
    title: "Best Places For Attractions in DC",
    subtitle: "Discover the best restaurants and bars in Washington, DC",
    ctaText: "Start Exploring",
    ctaLink: "/explore",
  },
  categories: [
    { name: "Museums", link: "/museums/", icon: "museum", count: "15+" },
    { name: "Monuments", link: "/monuments", icon: "monument", count: "20+" },
    { name: "Memorials", link: "/memorials/", icon: "memorial", count: "12+" },
    { name: "Parks", link: "/parks/", icon: "park", count: "8+" },
    { name: "Gardens", link: "/gardens/", icon: "park", count: "5+" },
    { name: "Zoos", link: "/zoo/", icon: "zoo", count: "3+" },
    { name: "Islands", link: "/island/", icon: "island", count: "4+" },
    { name: "Beach", link: "/beach/", icon: "beach", count: "6+" },
    { name: "Rivers", link: "/river/", icon: "park", count: "3+" },
    { name: "Exhibits", link: "/exhibits/", icon: "theater", count: "25+" },
  ],
  topAttractions: [
    {
      name: "National Mall & Memorial Parks",
      description:
        "Visit the National Mall for iconic landmarks like the Washington Monument, Lincoln Memorial, and U.S. Capitol.",
      image:
        "https://images.unsplash.com/photo-1571266028243-fbe66956edc0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.8,
      visitors: "25M+ annually",
    },
    {
      name: "Smithsonian Museums",
      description:
        "Explore the Smithsonian museums, including the National Museum of American History, the National Museum of Natural History, and the National Air and Space Museum.",
      image:
        "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.7,
      visitors: "30M+ annually",
    },
    {
      name: "Lincoln Memorial",
      description:
        "Pay tribute to Abraham Lincoln at this grand memorial, one of DC's most iconic monuments.",
      image:
        "https://images.unsplash.com/photo-1571266028243-fbe66956edc0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.9,
      visitors: "8M+ annually",
    },
  ],
};

const WashingtonDCAttractionsPage = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleCategoryHover = (categoryName: string) => {
    setActiveCategory(categoryName);
  };

  const handleCategoryLeave = () => {
    setActiveCategory(null);
  };

  const homeContent = {
    hero: {
      title: pageContent.hero.title,
      subtitle: pageContent.hero.subtitle,
      ctaText: pageContent.hero.ctaText,
      ctaLink: pageContent.hero.ctaLink,
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <Hero
        title={homeContent.hero.title}
        subtitle={homeContent.hero.subtitle}
        ctaText={homeContent.hero.ctaText}
        ctaLink={homeContent.hero.ctaLink}
      />


      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-red-50 text-red-600 text-sm font-semibold rounded-full mb-4">
              <LuStar className="w-4 h-4 mr-2" />
              Featured Categories
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Explore by Category
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover curated collections of Washington DC's finest
              attractions, each offering unique experiences and unforgettable
              memories.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {pageContent.categories.map((category, index) => (
              <a
                key={category.name}
                href={category.link}
                className="group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border border-gray-100 hover:border-red-200"
                style={{ animationDelay: `${index * 75}ms` }}
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-4xl transform group-hover:scale-110 transition-transform duration-300">
                      <AppIcon
                        name={category.icon as any}
                        className="text-4xl"
                      />
                    </div>
                    {/* <div className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-semibold">
                      {category.count}
                    </div> */}
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors duration-300">
                    {category.name}
                  </h3>

                  <div className="flex items-center text-red-600 font-medium text-sm group-hover:translate-x-1 transition-transform duration-300">
                    <span>Explore</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-br from-red-50/0 to-blue-50/0 group-hover:from-red-50/50 group-hover:to-blue-50/30 rounded-3xl transition-all duration-500"></div>
              </a>
            ))}
          </div>
        </div>
      </section>
      <section
        id="categories"
        className="py-16 px-4 md:px-8 bg-gradient-to-b from-white to-gray-50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 text-center">
            <span className="px-4 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium mb-3 inline-block">
              Discover DC
            </span>
            <h2 className="text-4xl font-bold mb-2">
              Find Your Perfect Experience
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From iconic monuments to hidden gems, explore everything
              Washington DC has to offer
            </p>
          </div>

          <Suspense
            fallback={
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
                {Array(8)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="bg-gray-200 rounded-xl h-64"></div>
                  ))}
              </div>
            }
          >
            <CategoryGrid />
          </Suspense>
        </div>
      </section>

      {/* SEO Content Section */}
     <SeoContentSection/>

       {/* Map Section */}
   <MapSection/>
      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Explore Washington DC's Top Attractions?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Start planning your unforgettable journey through the nation's
            capital today.
          </p>
          <button className="bg-white text-blue-800 hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Start Planning Your Visit →
          </button>
        </div>
      </section>
    </div>
  );
};

export default WashingtonDCAttractionsPage;
