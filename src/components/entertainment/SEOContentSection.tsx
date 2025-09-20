import React from "react";
import { FaTheaterMasks } from "react-icons/fa";
import entertainmentContent from "@/lib/entertainmentContent.json";
import AppIcon from "@/components/ui/AppIcon";

const borderMap = {
  primary: "border-primary",
  secondary: "border-secondary",
};

const SEOContentSection = () => {
  const { title, intro, points } = entertainmentContent.seo;
  return (
    <section className="w-full max-w-4xl py-12 px-4">
      <h2 className="text-2xl md:text-3xl font-extrabold text-primary mb-6 flex items-center gap-2">
        <FaTheaterMasks className="text-secondary text-2xl" />
        {title}
      </h2>
      <p className="mb-10 text-gray-700 text-base md:text-lg leading-relaxed">{intro}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {points.map((point, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-4 bg-white rounded-lg shadow p-5 border-l-4 `}
          >
            <AppIcon name={point.icon as any} className="text-2xl mt-1" />
            <div>
              <h3 className="text-xl font-bold text-secondary mb-2 flex items-center gap-2">{point.title}</h3>
              <p className="text-gray-700">{point.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SEOContentSection;
