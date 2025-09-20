import React from "react";
import {
  FaBus,
  FaCalendarAlt,
  FaClock,
  FaLeaf,
  FaMapMarkerAlt,
  FaPlane,
  FaSubway,
  FaThermometerHalf,
  FaTrain,
  FaUmbrellaBeach,
} from "react-icons/fa";
import { GiCherry } from "react-icons/gi";
import { MdDirectionsBus, MdFlight } from "react-icons/md";

const SeoContentSection = ({hidden}:{hidden?:boolean}) => {
  return (
    <div>
      {" "}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-white to-secondary/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="prose prose-lg max-w-none">
            {/* Best Time to Visit Section */}
             {/* Best Time to Visit Section */}
             {!hidden && (
              <>
                <div className="text-center mb-16">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                    <FaCalendarAlt className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Best Time to Visit Washington, DC
                  </h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Discover the ideal season for your trip and experience DC at its finest
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-16">
                  {/* Summer Card */}
                  <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-8 rounded-2xl border border-primary/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                        <FaThermometerHalf className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Summer</h3>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Washington, DC is a city with something to offer year-round, but the best time to visit depends on what you want to experience. While summer is popular, especially with the Fourth of July celebrations, the city’s heat and humidity can make outdoor sightseeing a challenge.
                    </p>
                  </div>

                  {/* Fall Card */}
                  <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 p-8 rounded-2xl border border-secondary/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mr-4">
                        <FaLeaf className="w-6 h-6 text-secondary" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Fall</h3>
                    </div>
                    <p className="text-gray-700 mb-4">
                      For a more comfortable visit, consider planning your trip during fall. With cooler temperatures and vibrant foliage, fall is one of the best seasons to explore DC. The city comes alive with local events like Adams Morgan Day and the H Street Festival, offering an authentic taste of DC's culture and neighborhoods.
                    </p>
                  </div>

                  {/* Spring Card */}
                  <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-8 rounded-2xl border border-primary/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                        <GiCherry className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Spring</h3>
                    </div>
                    <p className="text-gray-700 mb-4">
                      If you're a fan of beautiful springtime blooms, consider visiting in spring to catch the peak of the cherry blossom season. The National Cherry Blossom Festival, held every year, is one of the most stunning sights in the city, drawing visitors from all over the world.
                    </p>
                  </div>
                </div>
                   {/* Getting Around Section */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-full mb-6">
                <FaMapMarkerAlt className="w-8 h-8 text-secondary" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Getting Around Washington, DC
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Washington, DC is known for being a well-connected city, making it easy for both locals and visitors to navigate. Whether you're flying in, taking a train, or hopping on the Metro, there are plenty of transportation options to explore the nation’s capital.
              </p>
            </div>
              </>
            )}

         

            <div className="space-y-8">
              {/* Airports */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <FaPlane className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Airports</h3>
                </div>
                <p className="text-lg text-gray-700 mb-6">
                  DC is served by two major airports:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 rounded-xl border border-primary/20 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center mb-3">
                      <MdFlight className="w-6 h-6 text-primary mr-3" />
                      <h4 className="text-xl font-bold text-gray-900">
                      Dulles International Airport (IAD)
                      </h4>
                    </div>
                    <p className="text-gray-700 mb-3">
                    Located about 26 miles from downtown, Dulles is a hub for international flights and is easily accessible by taxi, bus, or the Silver Line Metro.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 p-6 rounded-xl border border-secondary/20 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center mb-3">
                      <MdFlight className="w-6 h-6 text-secondary mr-3" />
                      <h4 className="text-xl font-bold text-gray-900">
                      Ronald Reagan Washington National Airport (DCA)
                      </h4>
                    </div>
                    <p className="text-gray-700 mb-3">
                    Situated just across the Potomac River in Virginia, Reagan Airport is only a short distance from downtown DC, offering quick access via the Metro’s Blue and Yellow lines.
                    </p>
                  </div>
                </div>
              </div>

              {/* Union Station */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <FaTrain className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Union Station
                  </h3>
                </div>
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 rounded-xl border border-primary/20">
                  <p className="text-lg text-gray-700">
                  For those traveling by train, Union Station is the main hub. It offers intercity Amtrak services, connecting DC with cities up and down the East Coast. Union Station also serves as a major hub for regional trains and buses, making it a convenient spot for getting around.
                  </p>
                </div>
              </div>

              {/* Washington Metro */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mr-4">
                    <FaSubway className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Washington Metro
                  </h3>
                </div>
                <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 p-6 rounded-xl border border-secondary/20">
                  <p className="text-lg text-gray-700 mb-4">
                  The Washington Metro system is one of the easiest ways to explore DC and its nearby suburbs. With six lines—Blue, Orange, Silver, Red, Yellow, and Green—the Metro connects neighborhoods across the region, giving you direct access to top attractions like the National Mall, Smithsonian museums, and buzzing local spots.
                  </p>
                </div>
              </div>

              {/* Buses & DC Circulator */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <FaBus className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Buses & The DC Circulator
                  </h3>
                </div>
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 rounded-xl border border-primary/20">
                  <p className="text-lg text-gray-700 mb-4">
                  In addition to the Metro, numerous buses operate throughout the city, providing both local and long-distance service. The DC Circulator, a low-cost shuttle service, is another great option for getting around the city. It connects key neighborhoods and attractions like the National Gallery of Art, Georgetown, and Capitol Hill, all for a reasonable fare.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SeoContentSection;
