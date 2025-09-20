import React from "react";
import { FaUtensils, FaStar, FaGem, FaEye } from "react-icons/fa";
import { GiFoodTruck, GiMeal } from "react-icons/gi";

const points = [
  {
    icon: <GiMeal className="text-primary text-2xl mt-1" />,
    title: "1. Washington DC’s Must-Try Cuisine",
    desc: (
      <>
        Washington DC is famous for its diverse culinary scene, with top-notch restaurants offering everything from Mediterranean to Asian fusion. Local specialties like <span className="font-semibold text-primary">half-smokes at Ben’s Chili Bowl</span> and <span className="font-semibold text-secondary">crab cakes in Georgetown</span> are definitely worth trying. Don't forget to check out the city’s <GiFoodTruck className="inline text-lg text-primary" /> food trucks for authentic street food!
      </>
    ),
    border: "border-primary",
  },
  {
    icon: <FaGem className="text-secondary text-2xl mt-1" />,
    title: "2. Discover Hidden Gems in DC’s Food Scene",
    desc: (
      <>
        While the iconic Smithsonian Museums and National Monuments often steal the spotlight, DC’s hidden food gems offer just as much excitement. Tucked away in neighborhoods like <span className="font-semibold text-primary">Shaw</span> and <span className="font-semibold text-secondary">Petworth</span>, you’ll find local favorites that serve up unique dishes and innovative drinks.
      </>
    ),
    border: "border-secondary",
  },
  {
    icon: <FaStar className="text-primary text-2xl mt-1" />,
    title: "3. Fine Dining in Washington DC",
    desc: (
      <>
        For those who prefer a more elevated dining experience, DC boasts several <span className="font-semibold text-secondary">Michelin-starred restaurants</span>. From <span className="font-semibold text-primary">Rasika</span>, known for its Indian-inspired cuisine, to <span className="font-semibold text-secondary">Minibar</span> offering avant-garde tasting menus, Washington DC is home to some of the best dining in the world.
      </>
    ),
    border: "border-primary",
  },
  {
    icon: <FaEye className="text-secondary text-2xl mt-1" />,
    title: "4. Dining with a View – Rooftop Bars and Restaurants",
    desc: (
      <>
        Washington DC also offers a variety of dining experiences with breathtaking views. From rooftop bars offering drinks with a view of the <span className="font-semibold text-primary">U.S. Capitol</span> to restaurants with scenic views of the <span className="font-semibold text-secondary">Potomac River</span>, dining in DC is as much about the atmosphere as it is about the food.
      </>
    ),
    border: "border-secondary",
  },
];

const SEOContentSection = () => (
  <section className="w-full max-w-4xl py-12 px-4">
    <h2 className="text-2xl md:text-3xl font-extrabold text-primary mb-6 flex items-center gap-2">
      <FaUtensils className="text-secondary text-2xl" />
      Washington DC’s Diverse Dining Scene – A Taste for Every Palate
    </h2>
    <p className="mb-10 text-gray-700 text-base md:text-lg leading-relaxed">
      Washington DC is a city that offers something for everyone when it comes to food. With a rich blend of cultures and culinary traditions, DC has transformed into a food lover’s paradise. From upscale, fine-dining restaurants to food trucks and casual eateries, the city’s dining options are as diverse as its people. Whether you're looking to indulge in gourmet dishes, enjoy local favorites like Ben’s Chili Bowl, or sample international flavors, DC has it all.<br /><br />
      Explore neighborhoods like <span className="font-semibold text-primary">Georgetown</span>, which is known for its fine dining and trendy cafes, or <span className="font-semibold text-primary">Adams Morgan</span>, where you can find authentic Latin American dishes and vibrant bars. The city also offers Michelin-starred restaurants, but also boasts a strong presence of comfort food, including some of the best BBQ joints, sandwich shops, and food markets like <span className="font-semibold text-secondary">Union Market</span>.<br /><br />
      Whether you’re in the mood for a high-end dining experience or a casual bite at a local cafe, Washington DC delivers on flavor, ambiance, and diversity. It’s a city that encourages culinary exploration and invites visitors to try something new.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {points.map((point, idx) => (
        <div
          key={idx}
          className={`flex items-start gap-4 bg-white rounded-lg shadow p-5 border-l-4 ${point.border}`}
        >
          {point.icon}
          <div>
            <h3 className="text-xl font-bold text-secondary mb-2 flex items-center gap-2">{point.title}</h3>
            <p className="text-gray-700">{point.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default SEOContentSection;
