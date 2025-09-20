'use client';

import { useState } from 'react';

export default function BestTimeToVisit() {
  const [activeFactor, setActiveFactor] = useState('weather');

  const visitFactors = {
    weather: {
      name: 'Weather & Comfort',
      icon: '🌤️',
      color: 'from-[#113b5c] to-[#b84435]',
      description: 'Optimal weather conditions for outdoor activities and sightseeing',
      recommendations: [
        {
          season: 'Spring (March-May)',
          rating: '⭐⭐⭐⭐⭐',
          pros: ['Mild temperatures (50-70°F)', 'Cherry blossoms in full bloom', 'Perfect for walking tours', 'Lower humidity', 'Outdoor festivals'],
          cons: ['Occasional rain showers', 'Higher hotel prices during peak bloom']
        },
        {
          season: 'Fall (September-November)',
          rating: '⭐⭐⭐⭐⭐',
          pros: ['Comfortable temperatures (60-75°F)', 'Beautiful fall foliage', 'Lower humidity', 'Fewer crowds than spring', 'Ideal for outdoor activities'],
          cons: ['Shorter daylight hours', 'Cooler evenings']
        },
        {
          season: 'Summer (June-August)',
          rating: '⭐⭐⭐',
          pros: ['Longest daylight hours', 'Outdoor concerts and events', 'Extended museum hours', 'Waterfront activities'],
          cons: ['Hot and humid (80-90°F)', 'Afternoon thunderstorms', 'Peak tourist season', 'Higher prices']
        },
        {
          season: 'Winter (December-February)',
          rating: '⭐⭐⭐',
          pros: ['Fewest crowds', 'Lower hotel prices', 'Indoor attractions perfect', 'Holiday decorations', 'Snow possible'],
          cons: ['Cold temperatures (30-45°F)', 'Shorter daylight hours', 'Some outdoor attractions closed']
        }
      ]
    },
    crowds: {
      name: 'Crowds & Prices',
      icon: '👥',
      color: 'from-[#b84435] to-[#113b5c]',
      description: 'Balance between manageable crowds and reasonable prices',
      recommendations: [
        {
          season: 'Late Fall (November)',
          rating: '⭐⭐⭐⭐⭐',
          pros: ['Lowest crowds of the year', 'Best hotel deals', 'Comfortable weather', 'Fall colors still present'],
          cons: ['Cooler temperatures', 'Some attractions may close early']
        },
        {
          season: 'Early Spring (March)',
          rating: '⭐⭐⭐⭐',
          pros: ['Moderate crowds', 'Good hotel prices', 'Cherry blossoms beginning', 'Mild weather'],
          cons: ['Unpredictable weather', 'Some attractions still closed']
        },
        {
          season: 'Summer (June-August)',
          rating: '⭐⭐',
          pros: ['Extended hours at attractions', 'Outdoor events and festivals', 'Full tourist experience'],
          cons: ['Peak crowds everywhere', 'Highest hotel prices', 'Long lines at attractions']
        },
        {
          season: 'Winter (January-February)',
          rating: '⭐⭐⭐⭐',
          pros: ['Minimal crowds', 'Lowest prices', 'Indoor attractions perfect', 'Unique winter experience'],
          cons: ['Cold weather', 'Limited outdoor activities']
        }
      ]
    },
    events: {
      name: 'Events & Festivals',
      icon: '🎉',
      color: 'from-[#113b5c] to-[#b84435]',
      description: 'Special events and cultural experiences throughout the year',
      recommendations: [
        {
          season: 'Spring (March-May)',
          rating: '⭐⭐⭐⭐⭐',
          pros: ['National Cherry Blossom Festival', 'White House Garden Tours', 'Smithsonian Folklife Festival', 'Memorial Day events'],
          cons: ['Peak tourist season', 'Higher prices during festivals']
        },
        {
          season: 'Summer (June-August)',
          rating: '⭐⭐⭐⭐',
          pros: ['Fourth of July celebrations', 'Outdoor concerts on the Mall', 'Food truck festivals', 'Waterfront activities'],
          cons: ['Hot weather', 'Large crowds at events']
        },
        {
          season: 'Fall (September-November)',
          rating: '⭐⭐⭐⭐',
          pros: ['Fall foliage tours', 'Veterans Day ceremonies', 'Thanksgiving events', 'Cultural festivals'],
          cons: ['Cooler weather', 'Some outdoor events weather-dependent']
        },
        {
          season: 'Winter (December-February)',
          rating: '⭐⭐⭐',
          pros: ['Holiday decorations and markets', 'New Year celebrations', 'Presidential inauguration (every 4 years)', 'Indoor cultural events'],
          cons: ['Cold weather', 'Limited outdoor activities']
        }
      ]
    }
  };

  const activeFactorData = visitFactors[activeFactor as keyof typeof visitFactors];

  return (
    <section className="py-16">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Best Time to Visit DC for Weather
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Many travelers find spring and fall to be the most comfortable and scenic seasons. 
          Spring offers cherry blossoms and outdoor festivals, while fall gives you colorful 
          foliage and crisp, clear days.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Factor Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.entries(visitFactors).map(([key, factor]) => (
            <button
              key={key}
              onClick={() => setActiveFactor(key)}
              className={`px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                activeFactor === key
                  ? `bg-gradient-to-r ${factor.color} text-white shadow-lg`
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
            >
              <span className="text-2xl mr-2">{factor.icon}</span>
              {factor.name}
            </button>
          ))}
        </div>

        {/* Active Factor Details */}
        {activeFactorData && (
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className={`bg-gradient-to-r ${activeFactorData.color} p-8 text-white`}>
              <div className="flex items-center">
                <span className="text-4xl mr-4">{activeFactorData.icon}</span>
                <div>
                  <h3 className="text-3xl font-bold mb-2">{activeFactorData.name}</h3>
                  <p className="text-xl opacity-90">{activeFactorData.description}</p>
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {activeFactorData.recommendations.map((rec, index) => (
                  <div key={index} className="bg-gray-50 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-xl font-semibold text-gray-900">{rec.season}</h4>
                      <span className="text-lg">{rec.rating}</span>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold text-green-700 mb-2">✅ Pros</h5>
                        <ul className="space-y-1">
                          {rec.pros.map((pro, proIndex) => (
                            <li key={proIndex} className="text-sm text-gray-700 flex items-start">
                              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-red-700 mb-2">⚠️ Cons</h5>
                        <ul className="space-y-1">
                          {rec.cons.map((con, conIndex) => (
                            <li key={conIndex} className="text-sm text-gray-700 flex items-start">
                              <span className="w-2 h-2 bg-red-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Overall Recommendations */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">🏆 Top Recommendations</h3>
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">Best Overall: Spring (March-May)</h4>
                  <span className="text-[#b84435] font-bold">⭐⭐⭐⭐⭐</span>
                </div>
                <p className="text-gray-700 text-sm">Perfect weather, cherry blossoms, and outdoor activities make this the ideal time to visit.</p>
              </div>
              
              <div className="bg-white rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">Best Value: Fall (September-November)</h4>
                  <span className="text-[#113b5c] font-bold">⭐⭐⭐⭐⭐</span>
                </div>
                <p className="text-gray-700 text-sm">Comfortable weather, beautiful foliage, and fewer crowds than spring.</p>
              </div>
              
              <div className="bg-white rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">Best Budget: Winter (January-February)</h4>
                  <span className="text-[#b84435] font-bold">⭐⭐⭐⭐</span>
                </div>
                <p className="text-gray-700 text-sm">Lowest prices and crowds, perfect for indoor attractions and museums.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-[#113b5c]/5 to-[#113b5c]/10 rounded-2xl p-8 border border-[#113b5c]/10">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">📅 Monthly Breakdown</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">January</span>
                <span className="text-[#113b5c] font-semibold">Cold, Quiet, Cheap</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">February</span>
                <span className="text-[#113b5c] font-semibold">Cold, Quiet, Cheap</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">March</span>
                <span className="text-[#b84435] font-semibold">Mild, Cherry Blossoms Begin</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">April</span>
                <span className="text-[#b84435] font-semibold">Peak Cherry Blossoms, Busy</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">May</span>
                <span className="text-[#b84435] font-semibold">Warm, Outdoor Activities</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">June</span>
                <span className="text-[#b84435] font-semibold">Hot, Humid, Busy</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">July</span>
                <span className="text-[#b84435] font-semibold">Hottest, 4th of July, Busy</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">August</span>
                <span className="text-[#b84435] font-semibold">Hot, Humid, Busy</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">September</span>
                <span className="text-[#b84435] font-semibold">Comfortable, Fewer Crowds</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">October</span>
                <span className="text-[#b84435] font-semibold">Fall Colors, Great Weather</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">November</span>
                <span className="text-[#b84435] font-semibold">Cool, Quiet, Good Value</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">December</span>
                <span className="text-[#113b5c] font-semibold">Cold, Holiday Decorations</span>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-[#113b5c] to-[#b84435] rounded-3xl p-8 text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Plan Your Visit?</h3>
            <p className="text-xl mb-6 opacity-90">
              No matter when you visit, Washington, DC offers incredible experiences year-round. 
              Use our weather guide to pack smart and make the most of your time in the capital.
            </p>
            <button className="bg-white text-[#113b5c] px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-100 transition-colors duration-300">
              Explore More DC Guides
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
