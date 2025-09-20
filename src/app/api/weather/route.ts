import { NextResponse } from 'next/server';

// Mock weather data - in a real app, this would fetch from a weather API
const weatherData = {
  current: {
    temperature: 72,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 8,
    feelsLike: 74
  },
  forecast: [
    { day: 'Today', high: 75, low: 58, condition: 'Partly Cloudy' },
    { day: 'Tomorrow', high: 78, low: 62, condition: 'Sunny' },
    { day: 'Wednesday', high: 82, low: 65, condition: 'Mostly Sunny' },
    { day: 'Thursday', high: 79, low: 63, condition: 'Partly Cloudy' },
    { day: 'Friday', high: 76, low: 60, condition: 'Sunny' }
  ]
};

export async function GET() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return NextResponse.json({
      success: true,
      data: weatherData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}
