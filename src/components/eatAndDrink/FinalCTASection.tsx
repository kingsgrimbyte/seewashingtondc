import React from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const FinalCTASection = () => (
  <section className="w-full max-w-3xl py-12 px-4 flex flex-col items-center text-center">
    <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
      Ready to Taste Washington DC’s Culinary Delights?
    </h2>
    <Link href="/eat-and-drink/restaurants/" className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white font-bold px-8 py-4 rounded-full shadow-lg hover:scale-105 transition-all text-lg">
      Find Your Next Meal <FaArrowRight />
    </Link>
  </section>
);

export default FinalCTASection;
