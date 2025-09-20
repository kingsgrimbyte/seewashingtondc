'use client';

import { useState } from 'react';

export default function MonthlyWeatherTable() {
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);

  const monthlyData = [
    { month: 'January', avgHigh: 44, avgLow: 28, avgRainfall: 3.1, season: 'winter', icon: '❄️' },
    { month: 'February', avgHigh: 48, avgLow: 30, avgRainfall: 2.7, season: 'winter', icon: '❄️' },
    { month: 'March', avgHigh: 56, avgLow: 37, avgRainfall: 3.6, season: 'spring', icon: '🌸' },
    { month: 'April', avgHigh: 67, avgLow: 46, avgRainfall: 3.0, season: 'spring', icon: '🌸' },
    { month: 'May', avgHigh: 76, avgLow: 55, avgRainfall: 3.9, season: 'spring', icon: '🌸' },
    { month: 'June', avgHigh: 84, avgLow: 64, avgRainfall: 3.5, season: 'summer', icon: '☀️' },
    { month: 'July', avgHigh: 88, avgLow: 69, avgRainfall: 3.8, season: 'summer', icon: '☀️' },
    { month: 'August', avgHigh: 86, avgLow: 68, avgRainfall: 3.4, season: 'summer', icon: '☀️' },
    { month: 'September', avgHigh: 80, avgLow: 61, avgRainfall: 3.4, season: 'fall', icon: '🍂' },
    { month: 'October', avgHigh: 69, avgLow: 49, avgRainfall: 3.1, season: 'fall', icon: '🍂' },
    { month: 'November', avgHigh: 58, avgLow: 40, avgRainfall: 3.0, season: 'fall', icon: '🍂' },
    { month: 'December', avgHigh: 48, avgLow: 32, avgRainfall: 3.2, season: 'winter', icon: '❄️' }
  ];

  const getSeasonColor = (season: string) => {
    switch (season) {
      case 'spring': return 'from-[#b84435]/10 to-[#113b5c]/10';
      case 'summer': return 'from-[#b84435]/15 to-[#113b5c]/15';
      case 'fall': return 'from-[#b84435]/12 to-[#113b5c]/12';
      case 'winter': return 'from-[#113b5c]/10 to-[#b84435]/10';
      default: return 'from-gray-100 to-gray-200';
    }
  };

  const getTemperatureColor = (temp: number, isHigh: boolean) => {
    if (isHigh) {
      if (temp >= 80) return 'text-[#b84435]';
      if (temp >= 70) return 'text-[#b84435]/80';
      if (temp >= 60) return 'text-[#113b5c]';
      if (temp >= 50) return 'text-[#113b5c]/80';
      return 'text-[#113b5c]/60';
    } else {
      if (temp >= 60) return 'text-[#b84435]/80';
      if (temp >= 50) return 'text-[#113b5c]';
      if (temp >= 40) return 'text-[#113b5c]/80';
      if (temp >= 30) return 'text-[#113b5c]/60';
      return 'text-[#113b5c]/40';
    }
  };

  return (
    <section className="py-16">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Monthly Average Weather in DC
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Plan your visit with detailed monthly weather data. See temperature ranges, 
          rainfall patterns, and seasonal changes throughout the year.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Weather Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-[#b84435] to-[#b84435]/80 text-white rounded-2xl p-6 text-center">
            <div className="text-3xl mb-2">🌡️</div>
            <h3 className="text-xl font-semibold mb-2">Temperature Range</h3>
            <p className="text-2xl font-bold">28°F - 88°F</p>
            <p className="text-[#b84435]/20 text-sm">-2°C to 31°C</p>
          </div>
          
          <div className="bg-gradient-to-br from-[#113b5c] to-[#113b5c]/80 text-white rounded-2xl p-6 text-center">
            <div className="text-3xl mb-2">🌧️</div>
            <h3 className="text-xl font-semibold mb-2">Annual Rainfall</h3>
            <p className="text-2xl font-bold">38.4"</p>
            <p className="text-[#113b5c]/20 text-sm">975mm</p>
          </div>
          
          <div className="bg-gradient-to-br from-[#b84435] to-[#113b5c] text-white rounded-2xl p-6 text-center">
            <div className="text-3xl mb-2">☀️</div>
            <h3 className="text-xl font-semibold mb-2">Sunny Days</h3>
            <p className="text-2xl font-bold">203</p>
            <p className="text-white/80 text-sm">per year</p>
          </div>
          
          <div className="bg-gradient-to-br from-[#113b5c] to-[#b84435] text-white rounded-2xl p-6 text-center">
            <div className="text-3xl mb-2">❄️</div>
            <h3 className="text-xl font-semibold mb-2">Snow Days</h3>
            <p className="text-2xl font-bold">13.7</p>
            <p className="text-white/80 text-sm">per year</p>
          </div>
        </div>

        {/* Monthly Weather Table */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#113b5c] to-[#b84435] p-8 text-white">
            <h3 className="text-3xl font-bold text-center">Monthly Weather Breakdown</h3>
            <p className="text-center text-white/80 mt-2">Hover over months for detailed information</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Month</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Season</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Avg High °F (°C)</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Avg Low °F (°C)</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Avg Rainfall (in)</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Weather Pattern</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {monthlyData.map((data, index) => (
                  <tr 
                    key={index}
                    className={`transition-all duration-300 ${
                      hoveredMonth === index 
                        ? `bg-gradient-to-r ${getSeasonColor(data.season)} shadow-lg` 
                        : 'hover:bg-gray-50'
                    }`}
                    onMouseEnter={() => setHoveredMonth(index)}
                    onMouseLeave={() => setHoveredMonth(null)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{data.icon}</span>
                        <span className="font-semibold text-gray-900">{data.month}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize ${
                        data.season === 'spring' ? 'bg-[#b84435]/10 text-[#b84435]' :
                        data.season === 'summer' ? 'bg-[#b84435]/15 text-[#b84435]' :
                        data.season === 'fall' ? 'bg-[#b84435]/12 text-[#b84435]' :
                        'bg-[#113b5c]/10 text-[#113b5c]'
                      }`}>
                        {data.season}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`text-lg font-bold ${getTemperatureColor(data.avgHigh, true)}`}>
                        {data.avgHigh}°F
                      </span>
                      <div className="text-sm text-gray-500">
                        ({(data.avgHigh - 32) * 5/9 | 0}°C)
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`text-lg font-bold ${getTemperatureColor(data.avgLow, false)}`}>
                        {data.avgLow}°F
                      </span>
                      <div className="text-sm text-gray-500">
                        ({(data.avgLow - 32) * 5/9 | 0}°C)
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-[#113b5c] h-2 rounded-full" 
                            style={{ width: `${(data.avgRainfall / 4) * 100}%` }}
                          ></div>
                        </div>
                        <span className="font-semibold text-gray-900">{data.avgRainfall}"</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="text-sm text-gray-600">
                        {data.season === 'spring' && '🌸 Blooming & Mild'}
                        {data.season === 'summer' && '☀️ Hot & Humid'}
                        {data.season === 'fall' && '🍂 Cool & Colorful'}
                        {data.season === 'winter' && '❄️ Cold & Crisp'}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Weather Insights */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-[#b84435]/5 to-[#b84435]/10 rounded-2xl p-6 border border-[#b84435]/10">
            <h4 className="text-xl font-semibold text-gray-900 mb-3">🌸 Spring Highlights</h4>
            <p className="text-gray-700">Cherry blossom season typically peaks in late March to early April, with temperatures perfect for outdoor activities.</p>
          </div>
          
          <div className="bg-gradient-to-br from-[#b84435]/8 to-[#b84435]/15 rounded-2xl p-6 border border-[#b84435]/10">
            <h4 className="text-xl font-semibold text-gray-900 mb-3">☀️ Summer Tips</h4>
            <p className="text-gray-700">July is typically the hottest month. Plan outdoor activities early morning or late evening to avoid peak heat.</p>
          </div>
          
          <div className="bg-gradient-to-br from-[#113b5c]/5 to-[#113b5c]/10 rounded-2xl p-6 border border-[#113b5c]/10">
            <h4 className="text-xl font-semibold text-gray-900 mb-3">❄️ Winter Notes</h4>
            <p className="text-gray-700">January and February are the coldest months. Snow is possible but not guaranteed, averaging 13.7 days per year.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
