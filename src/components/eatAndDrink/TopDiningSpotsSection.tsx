import React from "react";
import Link from "next/link";
import { FaUtensils, FaGlassCheers, FaArrowRight } from "react-icons/fa";
import { MdRestaurantMenu } from "react-icons/md";
import { GiCupcake } from "react-icons/gi";

const topDiningSpots = [
  {
    name: "The Capital Grille",
    description:
      "Known for its upscale steakhouse atmosphere and exceptional service, The Capital Grille is perfect for those seeking a classic dining experience with perfectly prepared steaks and seafood.",
    icon: <FaUtensils className="text-primary text-3xl" />,
  },
  {
    name: "Founding Farmers",
    description:
      "A cozy, farm-to-table restaurant offering classic American comfort food with a modern twist. Perfect for breakfast, lunch, or dinner, and known for its delicious pancakes and hearty dishes.",
    icon: <MdRestaurantMenu className="text-secondary text-3xl" />,
  },
  {
    name: "Old Ebbitt Grill",
    description:
      "Located near the White House, this iconic DC restaurant offers fresh seafood and classic American fare, with a historic charm that has made it a local favorite for decades.",
    icon: <FaGlassCheers className="text-primary text-3xl" />,
  },
  {
    name: "Georgetown Cupcake",
    description:
      "If you have a sweet tooth, don’t miss the Georgetown Cupcake, known for its mouthwatering cupcakes in a variety of flavors that will satisfy any dessert craving.",
    icon: <GiCupcake className="text-secondary text-3xl" />,
  },
];

const TopDiningSpotsSection = () => (
  <section className="w-full py-12 px-4">
    <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center">
      Top Restaurants and Dining Experiences in Washington DC
    </h2>
    <div className="grid md:grid-cols-2 gap-8">
      {topDiningSpots.map((spot) => (
        <div key={spot.name} className="flex items-start gap-4 bg-gray-50 rounded-xl p-6 shadow hover:shadow-lg transition-all border border-gray-100">
          <div>{spot.icon}</div>
          <div>
            <h3 className="font-bold text-lg text-secondary mb-1">{spot.name}</h3>
            <p className="text-gray-700 text-sm md:text-base">{spot.description}</p>
          </div>
        </div>
      ))}
    </div>
    <div className="flex justify-center mt-8">
      <Link href="/eat-and-drink/restaurants/" className="inline-flex items-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-full shadow hover:bg-secondary transition-all">
        Explore All Restaurants <FaArrowRight />
      </Link>
    </div>
  </section>
);

export default TopDiningSpotsSection;
