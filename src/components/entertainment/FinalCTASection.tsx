import React from "react";
import Link from "next/link";
import { FaTicketAlt } from "react-icons/fa";
import entertainmentContent from "@/lib/entertainmentContent.json";

const FinalCTASection = () => {
  const { title, ctaText, ctaLink } = entertainmentContent.finalCTA;
  return (
    <section className="w-full max-w-3xl py-12 px-4 flex flex-col items-center text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4 flex items-center gap-2">
        {/* <FaTicketAlt className="text-secondary text-2xl" /> */}
        {title}
      </h2>
      <Link href={ctaLink} className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white font-bold px-8 py-4 rounded-full shadow-lg hover:scale-105 transition-all text-lg">
        {ctaText} <FaTicketAlt />
      </Link>
    </section>
  );
};

export default FinalCTASection;
