import React from "react";
import Link from "next/link";
import { MdLocalDining, MdLocalBar, MdLocalCafe } from "react-icons/md";
import { FaCoffee, FaWineGlassAlt, FaStar } from "react-icons/fa";
import { GiBarbecue, GiMeal } from "react-icons/gi";

const categories = [
  {
    name: "Restaurants",
    href: "/restaurants/",
    icon: <MdLocalDining className="text-secondary text-2xl" />,
  },
  {
    name: "Bars",
    href: "/bar/",
    icon: <MdLocalBar className="text-secondary text-2xl" />,
  },
  {
    name: "Cafes",
    href: "/cafe/",
    icon: <MdLocalCafe className="text-secondary text-2xl" />,
  },
  {
    name: "Coffee Shops",
    href: "/coffee-shop/",
    icon: <FaCoffee className="text-secondary text-2xl" />,
  },
  {
    name: "Lounges",
    href: "/lounges/",
    icon: <FaWineGlassAlt className="text-secondary text-2xl" />,
  },
  {
    name: "BBQ",
    href: "/bbq/",
    icon: <GiBarbecue className="text-secondary text-2xl" />,
  },
  {
    name: "Cuisine",
    href: "/cuisine/",
    icon: <GiMeal className="text-secondary text-2xl" />,
  },
  {
    name: "Dining Experiences",
    href: "/dining/",
    icon: <FaStar className="text-secondary text-2xl" />,
  },
];

const CategoriesSection = () => (
  <section className="w-full  py-12 px-4 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-6">
    {categories.map((cat) => (
      <Link key={cat.name} href={cat.href} className="flex flex-col items-center justify-center bg-white rounded-xl shadow-md p-4 hover:bg-primary hover:text-white transition-all group border border-gray-100">
        <span className="mb-2 text-3xl group-hover:scale-110 transition-transform">{cat.icon}</span>
        <span className="font-semibold text-sm md:text-base text-center group-hover:text-white">{cat.name}</span>
      </Link>
    ))}
  </section>
);

export default CategoriesSection;
