"use client";
import React from "react";
import HeroSection from "@/components/eatAndDrink/HeroSection";
import CategoriesSection from "@/components/eatAndDrink/CategoriesSection";
import TopDiningSpotsSection from "@/components/eatAndDrink/TopDiningSpotsSection";
import MapViewSection from "@/components/eatAndDrink/MapViewSection";
import SEOContentSection from "@/components/eatAndDrink/SEOContentSection";
import WhenToVisitSection from "@/components/eatAndDrink/WhenToVisitSection";
import GettingAroundSection from "@/components/eatAndDrink/GettingAroundSection";
import FinalCTASection from "@/components/eatAndDrink/FinalCTASection";
import SeoContentSection from "@/components/ui/SeoContentSection";
import MapSection from "@/components/ui/MapSection";
import Hero from "@/components/layout/Hero";

export default function EatAndDrinkPage() {
  return (
    <main className="bg-white min-h-screen ">
      <Hero
      title="Entertainment in Washington DC"
      subtitle="Live Shows, Concerts, and Events"/>
      <div className="max-w-7xl mx-auto flex flex-col items-center">
      <CategoriesSection />
      <TopDiningSpotsSection />
      {/* SEO Content Section */}
      <SeoContentSection />
      {/* Map Section */}
      <MapSection />
      <FinalCTASection />
      </div>
    </main>
  );
}
