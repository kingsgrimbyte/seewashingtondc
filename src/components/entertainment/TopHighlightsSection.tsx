import React from "react";
import Link from "next/link";
import entertainmentContent from "@/lib/entertainmentContent.json";
import AppIcon from "@/components/ui/AppIcon";

const TopHighlightsSection = () => {
  const highlights = entertainmentContent.highlights;
  return (
    <section className="w-full max-w-7xl py-12 px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center">
        Top Entertainment Experiences in Washington DC
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        {highlights.map((spot) => (
          <div key={spot.name} className="flex items-start gap-4 bg-gray-50 rounded-xl p-6 shadow hover:shadow-lg transition-all border border-gray-100">
            <span className="text-3xl">
              <AppIcon name={spot.icon as any} className="text-3xl" />
            </span>
            <div>
              <h3 className="font-bold text-lg text-secondary mb-1">{spot.name}</h3>
              <p className="text-gray-700 text-sm md:text-base">{spot.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Link href="/entertainment/events/" className="inline-flex items-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-full shadow hover:bg-secondary transition-all">
          Explore All Events
        </Link>
      </div>
    </section>
  );
};

export default TopHighlightsSection;
