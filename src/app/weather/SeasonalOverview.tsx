'use client';

import { useState } from 'react';

export default function SeasonalOverview() {
  const [activeSeason, setActiveSeason] = useState('spring');

  const seasons = [
    {
      id: 'spring',
      name: 'Spring',
      months: 'March – May',
      icon: '🌸',
      color: 'from-[#b84435] to-[#113b5c]',
      tempRange: 'Mid-50s to low 70s°F (10–22°C)',
      description: 'Spring in DC is mild, fresh, and famous for one thing: cherry blossoms. Temperatures generally range from the mid-50s to low 70s°F (10–22°C), making it perfect for walking tours, picnics, and outdoor festivals.',
      activities: ['Cherry blossom viewing', 'Walking tours', 'Outdoor festivals', 'Picnics in parks'],
      clothing: 'Light jackets and comfortable walking shoes',
      tips: 'Just be ready for occasional rain showers'
    },
    {
      id: 'summer',
      name: 'Summer',
      months: 'June – August',
      icon: '☀️',
      color: 'from-[#b84435] to-[#113b5c]',
      tempRange: 'Upper 80s°F (around 30°C)',
      description: 'Summers here are hot and humid, often reaching the upper 80s°F (around 30°C) with high humidity. Afternoon thunderstorms are common, so packing a light rain jacket or umbrella is smart.',
      activities: ['Morning sightseeing', 'Museum visits', 'Indoor galleries', 'Evening walks'],
      clothing: 'Breathable, lightweight fabrics',
      tips: 'Plan outdoor activities in the morning, head indoors during midday heat'
    },
    {
      id: 'fall',
      name: 'Fall',
      months: 'September – November',
      icon: '🍂',
      color: 'from-[#b84435] to-[#113b5c]',
      tempRange: '60s to mid-70s°F (15–24°C)',
      description: 'Fall brings comfortable temperatures, lower humidity, and stunning foliage. Ranging from the 60s to mid-70s°F (15–24°C), this season is ideal for outdoor attractions, hiking trails, and scenic evening walks.',
      activities: ['Outdoor attractions', 'Hiking trails', 'Scenic walks', 'Foliage viewing'],
      clothing: 'Sweaters and light layers',
      tips: 'A warmer jacket might be needed at night'
    },
    {
      id: 'winter',
      name: 'Winter',
      months: 'December – February',
      icon: '❄️',
      color: 'from-[#113b5c] to-[#b84435]',
      tempRange: '30–45°F (-1–7°C)',
      description: 'Winters in DC can be cold, with temperatures between 30–45°F (-1–7°C) and occasional snowfalls. It\'s a quieter tourist season, which means fewer crowds at popular spots.',
      activities: ['Smithsonian museums', 'Theaters', 'Cozy cafes', 'Indoor attractions'],
      clothing: 'Warm coat, gloves, and hat',
      tips: 'Indoor attractions are perfect for staying warm while exploring'
    }
  ];

  const activeSeasonData = seasons.find(s => s.id === activeSeason);

  return (
    <section className="py-12 sm:py-16">
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
          Four Distinct Seasons
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
          Each season in Washington, DC offers its own unique charm and activities.
          Knowing what to expect helps you plan better, pack smarter, and make the most of your time here.
        </p>
      </div>

      {/* Season Selector */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 px-4">
        {seasons.map((season) => (
          <button
            key={season.id}
            onClick={() => setActiveSeason(season.id)}
            className={`px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-2xl font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 ${
              activeSeason === season.id
                ? `bg-gradient-to-r ${season.color} text-white shadow-lg`
                : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-[#b84435] hover:shadow-md'
            }`}
          >
            <span className="text-xl sm:text-2xl mr-2">{season.icon}</span>
            {season.name}
          </button>
        ))}
      </div>

      {/* Active Season Details */}
      {activeSeasonData && (
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className={`bg-gradient-to-r ${activeSeasonData.color} p-6 sm:p-8 text-white`}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-4 sm:mb-0">
                  <h3 className="text-3xl sm:text-4xl font-bold mb-2">{activeSeasonData.name}</h3>
                  <p className="text-lg sm:text-xl opacity-90">{activeSeasonData.months}</p>
                </div>
                <div className="text-5xl sm:text-6xl">{activeSeasonData.icon}</div>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                <div>
                  <h4 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Overview</h4>
                  <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6">
                    {activeSeasonData.description}
                  </p>

                  <div className="bg-[#113b5c]/5 rounded-2xl p-4 sm:p-6 border border-[#113b5c]/10">
                    <h5 className="font-semibold text-gray-900 mb-3">Temperature Range</h5>
                    <p className="text-xl sm:text-2xl font-bold text-[#113b5c]">{activeSeasonData.tempRange}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Perfect For</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeSeasonData.activities.map((activity, index) => (
                        <div key={index} className="flex items-center bg-[#b84435]/5 rounded-xl p-3 border border-[#b84435]/10">
                          <div className="w-2 h-2 bg-[#b84435] rounded-full mr-3"></div>
                          <span className="text-gray-700 text-sm">{activity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">What to Pack</h4>
                    <div className="bg-[#113b5c]/5 rounded-2xl p-4 border border-[#113b5c]/10">
                      <p className="text-gray-700 font-medium">{activeSeasonData.clothing}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Pro Tips</h4>
                    <div className="bg-[#b84435]/5 rounded-2xl p-4 border border-[#b84435]/10">
                      <p className="text-gray-700">{activeSeasonData.tips}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
