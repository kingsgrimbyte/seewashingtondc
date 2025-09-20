'use client';

import { useState, useEffect } from 'react';

export default function WeatherChart() {
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);

  const chartData = [
    { month: 'Jan', high: 44, low: 28, rainfall: 3.1, season: 'winter' },
    { month: 'Feb', high: 48, low: 30, rainfall: 2.7, season: 'winter' },
    { month: 'Mar', high: 56, low: 37, rainfall: 3.6, season: 'spring' },
    { month: 'Apr', high: 67, low: 46, rainfall: 3.0, season: 'spring' },
    { month: 'May', high: 76, low: 55, rainfall: 3.9, season: 'spring' },
    { month: 'Jun', high: 84, low: 64, rainfall: 3.5, season: 'summer' },
    { month: 'Jul', high: 88, low: 69, rainfall: 3.8, season: 'summer' },
    { month: 'Aug', high: 86, low: 68, rainfall: 3.4, season: 'summer' },
    { month: 'Sep', high: 80, low: 61, rainfall: 3.4, season: 'fall' },
    { month: 'Oct', high: 69, low: 49, rainfall: 3.1, season: 'fall' },
    { month: 'Nov', high: 58, low: 40, rainfall: 3.0, season: 'fall' },
    { month: 'Dec', high: 48, low: 32, rainfall: 3.2, season: 'winter' }
  ];

  const maxTemp = Math.max(...chartData.map(d => d.high));
  const minTemp = Math.min(...chartData.map(d => d.low));
  const maxRainfall = Math.max(...chartData.map(d => d.rainfall));

  const getSeasonColor = (season: string) => {
    switch (season) {
      case 'spring': return 'from-[#b84435] to-[#113b5c]';
      case 'summer': return 'from-[#b84435] to-[#113b5c]';
      case 'fall': return 'from-[#b84435] to-[#113b5c]';
      case 'winter': return 'from-[#113b5c] to-[#b84435]';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getTemperatureColor = (temp: number) => {
    if (temp >= 80) return 'text-[#b84435]';
    if (temp >= 70) return 'text-[#b84435]/80';
    if (temp >= 60) return 'text-[#113b5c]';
    if (temp >= 50) return 'text-[#113b5c]/80';
    return 'text-[#113b5c]/60';
  };

  return (
    <section className="py-16">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Interactive Weather Visualization
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Explore temperature trends and rainfall patterns throughout the year with our 
          interactive weather charts. Hover over data points for detailed information.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Temperature Chart */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Temperature Trends (°F)</h3>
          
          <div className="relative h-96 mb-8">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-sm text-gray-500">
              <span>90°F</span>
              <span>80°F</span>
              <span>70°F</span>
              <span>60°F</span>
              <span>50°F</span>
              <span>40°F</span>
              <span>30°F</span>
              <span>20°F</span>
            </div>
            
            {/* Chart area */}
            <div className="ml-16 h-full relative">
              {/* Grid lines */}
              <div className="absolute inset-0 grid grid-rows-8">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="border-b border-gray-200"></div>
                ))}
              </div>
              
              {/* Temperature lines */}
              <svg className="absolute inset-0 w-full h-full" style={{ marginLeft: '-16px' }}>
                {/* High temperature line */}
                <polyline
                  fill="none"
                  stroke="#b84435"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={chartData.map((d, i) => 
                    `${(i / (chartData.length - 1)) * 100},${100 - ((d.high - minTemp) / (maxTemp - minTemp)) * 100}`
                  ).join(' ')}
                />
                
                {/* Low temperature line */}
                <polyline
                  fill="none"
                  stroke="#113b5c"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={chartData.map((d, i) => 
                    `${(i / (chartData.length - 1)) * 100},${100 - ((d.low - minTemp) / (maxTemp - minTemp)) * 100}`
                  ).join(' ')}
                />
                
                {/* Data points */}
                {chartData.map((d, i) => (
                  <g key={i}>
                    {/* High temp point */}
                    <circle
                      cx={`${(i / (chartData.length - 1)) * 100}%`}
                      cy={`${100 - ((d.high - minTemp) / (maxTemp - minTemp)) * 100}%`}
                      r="6"
                      fill="#b84435"
                      className="cursor-pointer transition-all duration-200 hover:r-8"
                      onMouseEnter={() => setHoveredMonth(i)}
                      onMouseLeave={() => setHoveredMonth(null)}
                    />
                    
                    {/* Low temp point */}
                    <circle
                      cx={`${(i / (chartData.length - 1)) * 100}%`}
                      cy={`${100 - ((d.low - minTemp) / (maxTemp - minTemp)) * 100}%`}
                      r="6"
                      fill="#113b5c"
                      className="cursor-pointer transition-all duration-200 hover:r-8"
                      onMouseEnter={() => setHoveredMonth(i)}
                      onMouseLeave={() => setHoveredMonth(null)}
                    />
                  </g>
                ))}
              </svg>
              
              {/* Hover tooltip */}
              {hoveredMonth !== null && (
                <div 
                  className="absolute bg-white rounded-lg shadow-lg p-4 border border-gray-200 z-10"
                  style={{
                    left: `${(hoveredMonth / (chartData.length - 1)) * 100}%`,
                    top: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <div className="text-center">
                    <div className="font-bold text-gray-900">{chartData[hoveredMonth].month}</div>
                    <div className="text-[#b84435] font-semibold">High: {chartData[hoveredMonth].high}°F</div>
                    <div className="text-[#113b5c] font-semibold">Low: {chartData[hoveredMonth].low}°F</div>
                    <div className="text-[#113b5c] font-semibold">Rain: {chartData[hoveredMonth].rainfall}"</div>
                  </div>
                </div>
              )}
            </div>
            
            {/* X-axis labels */}
            <div className="ml-16 flex justify-between text-sm text-gray-500">
              {chartData.map((d, i) => (
                <span key={i} className="text-center" style={{ width: `${100 / chartData.length}%` }}>
                  {d.month}
                </span>
              ))}
            </div>
          </div>
          
          {/* Legend */}
          <div className="flex justify-center space-x-8">
            <div className="flex items-center">
              <div className="w-4 h-0.5 bg-[#b84435] mr-2"></div>
              <span className="text-gray-700">High Temperature</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-0.5 bg-[#113b5c] mr-2"></div>
              <span className="text-gray-700">Low Temperature</span>
            </div>
          </div>
        </div>

        {/* Rainfall Chart */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Monthly Rainfall (inches)</h3>
          
          <div className="grid grid-cols-12 gap-2 h-64 items-end">
            {chartData.map((d, i) => (
              <div key={i} className="relative group">
                <div 
                  className={`w-full rounded-t transition-all duration-300 cursor-pointer group-hover:opacity-80 ${
                    d.season === 'spring' ? 'bg-gradient-to-t from-[#b84435] to-[#113b5c]' :
                    d.season === 'summer' ? 'bg-gradient-to-t from-[#b84435] to-[#113b5c]' :
                    d.season === 'fall' ? 'bg-gradient-to-t from-[#b84435] to-[#113b5c]' :
                    'bg-gradient-to-t from-[#113b5c] to-[#b84435]'
                  }`}
                  style={{ height: `${(d.rainfall / maxRainfall) * 100}%` }}
                  onMouseEnter={() => setHoveredMonth(i)}
                  onMouseLeave={() => setHoveredMonth(null)}
                ></div>
                
                {/* Month label */}
                <div className="text-xs text-gray-600 text-center mt-2 font-medium">
                  {d.month}
                </div>
                
                {/* Rainfall value */}
                <div className="text-xs text-gray-700 text-center font-semibold">
                  {d.rainfall}"
                </div>
              </div>
            ))}
          </div>
          
          {/* Seasonal color legend */}
          <div className="mt-8 flex justify-center space-x-6">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gradient-to-t from-[#b84435] to-[#113b5c] rounded mr-2"></div>
              <span className="text-gray-700">Spring</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gradient-to-t from-[#b84435] to-[#113b5c] rounded mr-2"></div>
              <span className="text-gray-700">Summer</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gradient-to-t from-[#b84435] to-[#113b5c] rounded mr-2"></div>
              <span className="text-gray-700">Fall</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gradient-to-t from-[#113b5c] to-[#b84435] rounded mr-2"></div>
              <span className="text-gray-700">Winter</span>
            </div>
          </div>
        </div>

        {/* Weather Insights */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-[#113b5c]/5 to-[#113b5c]/10 rounded-2xl p-6 border border-[#113b5c]/10">
            <h4 className="text-xl font-semibold text-gray-900 mb-3">📊 Chart Insights</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• July is the hottest month with average high of 88°F</li>
              <li>• January is the coldest month with average low of 28°F</li>
              <li>• Rainfall is fairly consistent throughout the year</li>
              <li>• Spring and fall offer the most comfortable temperature ranges</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-[#b84435]/5 to-[#b84435]/10 rounded-2xl p-6 border border-[#b84435]/10">
            <h4 className="text-xl font-semibold text-gray-900 mb-3">🎯 Planning Tips</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• Best weather: March-May and September-November</li>
              <li>• Peak tourist season: Spring (cherry blossoms)</li>
              <li>• Quiet season: Winter (fewer crowds)</li>
              <li>• Always pack layers - temperatures can vary 20°F+ daily</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
