import React from "react";
import Link from "next/link";
import { FaTheaterMasks } from "react-icons/fa";
import entertainmentContent from "@/lib/entertainmentContent.json";

const HeroSection = () => {
  const { title, subtitle, ctaText, ctaLink } = entertainmentContent.hero;
  return (
    <section className="w-full bg-gradient-to-br from-primary to-secondary py-16 px-4 text-white flex flex-col items-center text-center relative overflow-hidden">
      <div className="max-w-3xl z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg flex items-center justify-center gap-3">
          <FaTheaterMasks className="text-secondary text-4xl" />
          {title}
        </h1>
        <p className="mb-8 text-lg md:text-xl font-medium opacity-90">{subtitle}</p>
        <Link href={ctaLink} className="inline-flex items-center gap-2 bg-white text-primary font-bold px-6 py-3 rounded-full shadow-lg hover:bg-secondary hover:text-white transition-all duration-200">
          {ctaText}
        </Link>
      </div>
      <div className="absolute left-0 top-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -z-1 animate-pulse" />
      <div className="absolute right-0 bottom-0 w-52 h-52 bg-white/10 rounded-full blur-2xl -z-1 animate-pulse" />
    </section>
  );
};

export default HeroSection;
