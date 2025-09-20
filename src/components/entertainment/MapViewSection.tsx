import React from "react";
import Link from "next/link";
import { FaMapMarkerAlt, FaSearchLocation } from "react-icons/fa";
import entertainmentContent from "@/lib/entertainmentContent.json";

const MapViewSection = () => {
  const { title, description, ctaText, ctaLink } = entertainmentContent.mapSection;
  return (
    <section className="w-full max-w-4xl py-12 px-4 flex flex-col items-center">
      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4 text-center">{title}</h2>
      <p className="mb-6 text-gray-700 text-center max-w-2xl">{description}</p>
      <Link href={ctaLink} className="inline-flex items-center gap-2 bg-secondary text-white font-bold px-6 py-3 rounded-full shadow hover:bg-primary transition-all">
        <FaMapMarkerAlt /> {ctaText}
      </Link>
      <div className="w-full h-64 mt-8 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center">
        <FaSearchLocation className="text-6xl text-primary/30" />
      </div>
    </section>
  );
};

export default MapViewSection;
