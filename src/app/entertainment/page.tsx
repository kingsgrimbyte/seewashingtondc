import React from "react";
import HeroSection from "@/components/entertainment/HeroSection";
import CategoriesSection from "@/components/entertainment/CategoriesSection";
import TopHighlightsSection from "@/components/entertainment/TopHighlightsSection";
import MapViewSection from "@/components/entertainment/MapViewSection";
import SEOContentSection from "@/components/entertainment/SEOContentSection";
import WhenToVisitSection from "@/components/entertainment/WhenToVisitSection";
import GettingAroundSection from "@/components/entertainment/GettingAroundSection";
import FinalCTASection from "@/components/entertainment/FinalCTASection";
import MapSection from "@/components/ui/MapSection";
import SeoContentSection from "@/components/ui/SeoContentSection";
import Hero from "@/components/layout/Hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Entertainment in Washington DC | Nightlife, Music & Events',
  description: 'Experience Washington DC entertainment — live music, theaters, nightlife, and cultural events. Find the best spots for fun and unforgettable city experiences.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/entertainment`,
  },
};


export default function EntertainmentPage() {
  return (
    <main className="bg-white min-h-screen ">
      <Hero
      title="Entertainment in Washington DC"
      subtitle="Live Shows, Concerts, and Events"/>
      <div className="max-w-7xl mx-auto flex flex-col items-center">
      <CategoriesSection />
      <TopHighlightsSection />
        {/* SEO Content Section */}
        <SeoContentSection />
      {/* Map Section */}
      <MapSection />
      <FinalCTASection />
      </div>
      
    </main>
  );
}
