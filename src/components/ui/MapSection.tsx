import { Map, MapPin, Navigation } from "lucide-react";
import React from "react";

const MapSection = () => {
  return (
    <div>
      {" "}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center px-4 py-2 bg-green-50 text-primary text-sm font-semibold rounded-full mb-6">
                <MapPin className="w-4 h-4 mr-2" />
                Location-Based Discovery
              </div>

              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Find Attractions Near You
              </h2>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Use our intelligent interactive map to discover DC's top
                attractions based on your current location. Whether you're
                exploring the historic National Mall or wandering through
                charming Georgetown, uncover hidden gems and must-see
                destinations nearby.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-primary rounded-full mr-4"></div>
                  <span>Real-time location-based recommendations</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-secondary rounded-full mr-4"></div>
                  <span>Detailed attraction information and reviews</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-primary rounded-full mr-4"></div>
                  <span>Interactive route planning and directions</span>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 relative">
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
                <div className="aspect-square bg-gradient-to-br from-blue-100 via-purple-50 to-red-100 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  {/* Map visualization elements */}
                  <div className="absolute inset-4 bg-white/80 rounded-xl backdrop-blur-sm"></div>
                  <div className="relative z-10 text-center h-full w-full">
                    <iframe
                      src="https://maps.google.com/maps?q=washington%20dc&t=&z=12&ie=UTF8&iwloc=&output=embed"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full h-full rounded-2xl"
                      title="Washington DC Neighborhoods Map"
                    ></iframe>
                  </div>

                  {/* Floating map pins */}
                  <div className="absolute top-6 right-8 w-4 h-4 bg-red-500 rounded-full animate-pulse shadow-lg"></div>
                  <div
                    className="absolute bottom-8 left-6 w-3 h-3 bg-blue-500 rounded-full animate-pulse shadow-lg"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                  <div
                    className="absolute top-1/3 left-8 w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg"
                    style={{ animationDelay: "1s" }}
                  ></div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-red-200 to-red-300 rounded-full opacity-60 animate-pulse"></div>
              <div
                className="absolute -bottom-6 -right-6 w-20 h-20 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full opacity-60 animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MapSection;
