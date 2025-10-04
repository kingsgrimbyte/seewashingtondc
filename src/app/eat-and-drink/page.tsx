import React from "react";
import CategoriesSection from "@/components/eatAndDrink/CategoriesSection";
import TopDiningSpotsSection from "@/components/eatAndDrink/TopDiningSpotsSection";
import FinalCTASection from "@/components/eatAndDrink/FinalCTASection";
import SeoContentSection from "@/components/ui/SeoContentSection";
import MapSection from "@/components/ui/MapSection";
import Hero from "@/components/layout/Hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Best Places to Eat & Drink in Washington DC | Food & Nightlife',
  description: 'Discover Washington DC’s best restaurants, bars, and local eats. From fine dining to casual bites and nightlife spots, explore DC’s vibrant food scene today.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/eat-and-drink`,
  },
};

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
