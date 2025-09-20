import React from "react";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

const HeroSection = () => (
  <section className="w-full bg-gradient-to-br from-primary to-secondary py-16 px-4 text-white flex flex-col items-center text-center relative overflow-hidden">
    <div className="max-w-3xl z-10">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
        Best Places to Eat & Drink in Washington DC
      </h1>
      <p className="mb-8 text-lg md:text-xl font-medium opacity-90">
        Washington DC is home to an exciting and diverse food scene, from trendy restaurants and cozy cafes to vibrant bars and lounges. Whether you're craving gourmet dishes, street food, or classic American cuisine, DC offers a culinary experience to satisfy every taste. Explore the city’s best dining spots and plan your next meal in the heart of the nation’s capital.
      </p>
      <Link href="/eat-and-drink/restaurants/" className="inline-flex items-center gap-2 bg-white text-primary font-bold px-6 py-3 rounded-full shadow-lg hover:bg-secondary hover:text-white transition-all duration-200">
        Explore DC’s Dining Spots <FaChevronRight />
      </Link>
    </div>
    {/* Decorative SVGs or shapes for creativity */}
    <div className="absolute left-0 top-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -z-1 animate-pulse" />
    <div className="absolute right-0 bottom-0 w-52 h-52 bg-white/10 rounded-full blur-2xl -z-1 animate-pulse" />
  </section>
);

export default HeroSection;
