import React from "react";
import entertainmentContent from "@/lib/entertainmentContent.json";

const GettingAroundSection = () => {
  const { title, description } = entertainmentContent.gettingAround;
  return (
    <section className="w-full max-w-4xl py-12 px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">{title}</h2>
      <p className="text-gray-700">{description}</p>
    </section>
  );
};

export default GettingAroundSection;
