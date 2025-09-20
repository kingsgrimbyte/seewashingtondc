'use client';

import { useState, useEffect } from 'react';
import WeatherHero from './WeatherHero';
import SeasonalOverview from './SeasonalOverview';
import MonthlyWeatherTable from './MonthlyWeatherTable';
import PackingTips from './PackingTips';
import BestTimeToVisit from './BestTimeToVisit';
import WeatherChart from './WeatherChart';

export default function WeatherPageClient() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading weather data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#113b5c]/5 via-white to-[#b84435]/5">
      {/* Hero Section */}
      {/* <WeatherHero /> */}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 space-y-20">
        {/* Seasonal Overview */}
        <SeasonalOverview />

        {/* Monthly Weather Data */}
        <MonthlyWeatherTable />

        {/* Interactive Weather Chart */}
        <WeatherChart />

        {/* Packing Tips */}
        <PackingTips />

        {/* Best Time to Visit */}
        <BestTimeToVisit />
      </div>
    </div>
  );
}
