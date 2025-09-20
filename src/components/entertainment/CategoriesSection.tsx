import React from "react";
import Link from "next/link";
import entertainmentContent from "@/lib/entertainmentContent.json";
import AppIcon from "@/components/ui/AppIcon";

const CategoriesSection = () => {
  const categories = entertainmentContent.categories;
  return (
    <section className="w-full max-w-4xl py-12 px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {categories.map((cat) => (
        <Link key={cat.name} href={cat.href} className="flex flex-col items-center justify-center bg-white rounded-xl shadow-md p-4 hover:bg-primary hover:text-white transition-all group border border-gray-100">
          <span className="mb-2 text-3xl group-hover:scale-110 transition-transform">
            <AppIcon name={cat.icon as any} variant="primary" className="text-3xl" />
          </span>
          <span className="font-semibold text-sm md:text-base text-center group-hover:text-white">{cat.name}</span>
        </Link>
      ))}
    </section>
  );
};

export default CategoriesSection;
