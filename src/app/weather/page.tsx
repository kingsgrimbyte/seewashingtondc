"use client"

import { useState, useEffect } from "react"
import { MdCalendarToday, MdEco, MdLightbulb, MdLocalFlorist, MdLuggage, MdOutlineAcUnit, MdOutlineCheckroom, MdOutlineWbSunny, MdVisibility } from "react-icons/md"
import { WiHumidity, WiStrongWind, WiBarometer } from "react-icons/wi"
import WeatherHero from "../weather/weather-hero"
import WeatherChart from "../weather/weather-chart"
import { Card } from "../../components/ui/card"
import { FaTshirt, FaUmbrella } from "react-icons/fa"

interface WeatherData {
  location: string
  temperature: number
  condition: string
  description: string
  humidity: number
  windSpeed: number
  pressure: number
  visibility: number
  feelsLike: number
}

interface CachedWeatherData {
  data: WeatherData
  timestamp: number
  requestCount: number
  lastResetDate: string
}

// Mock data for charts (in a real app, this would come from weather API)
const rainfallData = [
  { month: "Jan", value: 77.7 },
  { month: "Feb", value: 63 },
  { month: "Mar", value: 90.3 },
  { month: "Apr", value: 84.1 },
  { month: "May", value: 110.2 },
  { month: "Jun", value: 103.9 },
  { month: "Jul", value: 117.9 },
  { month: "Aug", value: 98.4 },
  { month: "Sep", value: 104.5 },
  { month: "Oct", value: 93.6 },
  { month: "Nov", value: 77.3 },
  { month: "Dec", value: 87.5 },
]

const snowfallData = [
  { month: "Jan", value: 133.9 },
  { month: "Feb", value: 85.6 },
  { month: "Mar", value: 38 },
  { month: "Apr", value: 0 },
  { month: "May", value: 0 },
  { month: "Jun", value: 0 },
  { month: "Jul", value: 0 },
  { month: "Aug", value: 0 },
  { month: "Sep", value: 0 },
  { month: "Oct", value: 0 },
  { month: "Nov", value: 7.9 },
  { month: "Dec", value: 38.8 },
]

const daylightData = [
  { month: "Jan", value: 10 },
  { month: "Feb", value: 10.5 },
  { month: "Mar", value: 12 },
  { month: "Apr", value: 13 },
  { month: "May", value: 14 },
  { month: "Jun", value: 15 },
  { month: "Jul", value: 14.5 },
  { month: "Aug", value: 13.5 },
  { month: "Sep", value: 12.5 },
  { month: "Oct", value: 11.5 },
  { month: "Nov", value: 10 },
  { month: "Dec", value: 9.5 },
]

export default function WeatherPage() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const getCachedData = (): CachedWeatherData | null => {
    try {
      const cached = localStorage.getItem("weatherCache")
      return cached ? JSON.parse(cached) : null
    } catch {
      return null
    }
  }

  const setCachedData = (data: WeatherData) => {
    const today = new Date().toDateString()
    const cached = getCachedData()

    const cacheData: CachedWeatherData = {
      data,
      timestamp: Date.now(),
      requestCount: cached?.lastResetDate === today ? cached.requestCount + 1 : 1,
      lastResetDate: today,
    }

    localStorage.setItem("weatherCache", JSON.stringify(cacheData))
  }

  const canMakeRequest = (): boolean => {
    const cached = getCachedData()
    if (!cached) return true

    const today = new Date().toDateString()
    if (cached.lastResetDate !== today) {
      return true
    }

    return cached.requestCount < 2
  }

  const shouldFetchData = (cached: CachedWeatherData | null): boolean => {
    if (!cached) return true

    const twelveHoursAgo = Date.now() - 12 * 60 * 60 * 1000
    return cached.timestamp < twelveHoursAgo && canMakeRequest()
  }

  const fetchWeatherData = async (lat: number, lon: number) => {
    try {
      setIsLoading(true)
      setError(null)

      const cached = getCachedData()

      if (cached && !shouldFetchData(cached)) {
        setWeatherData(cached.data)
        setIsLoading(false)
        return
      }

      if (!canMakeRequest()) {
        if (cached) {
          setWeatherData(cached.data)
        }
        setIsLoading(false)
        return
      }

      const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY || "217850bc72b6492557cc9a56a72ddce1"
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
      )

      if (!response.ok) {
        const fallbackData = {
          location: "Washington, DC",
          temperature: 22,
          condition: "partly cloudy",
          description: "Perfect weather for exploring the city",
          humidity: 65,
          windSpeed: 12,
          pressure: 1013,
          visibility: 10,
          feelsLike: 24,
        }
        setWeatherData(fallbackData)
        setCachedData(fallbackData)
        return
      }

      const data = await response.json()
      const weatherInfo = {
        location: `${data.name}, ${data.sys.country}`,
        temperature: data.main.temp,
        condition: data.weather[0].description,
        description: `Feels like ${Math.round(data.main.feels_like)}°C`,
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 3.6),
        pressure: data.main.pressure,
        visibility: Math.round(data.visibility / 1000),
        feelsLike: data.main.feels_like,
      }

      setWeatherData(weatherInfo)
      setCachedData(weatherInfo)
    } catch (err) {
      setError("Failed to fetch weather data")
      const fallbackData = {
        location: "Washington, DC",
        temperature: 22,
        condition: "partly cloudy",
        description: "Perfect weather for exploring the city",
        humidity: 65,
        windSpeed: 12,
        pressure: 1013,
        visibility: 10,
        feelsLike: 24,
      }
      setWeatherData(fallbackData)
      setCachedData(fallbackData)
    } finally {
      setIsLoading(false)
    }
  }

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser")
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeatherData(position.coords.latitude, position.coords.longitude)
      },
      (error) => {
        fetchWeatherData(38.9072, -77.0369)
      },
    )
  }

  useEffect(() => {
    getCurrentLocation()

    const interval = setInterval(
      () => {
        getCurrentLocation()
      },
      12 * 60 * 60 * 1000,
    ) // 12 hours in milliseconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <WeatherHero
        location={weatherData?.location || ""}
        temperature={weatherData?.temperature || 0}
        condition={weatherData?.condition || ""}
        description={weatherData?.description || ""}
        isLoading={isLoading}
      />

      <main className="max-w-7xl mx-auto px-6 py-12">
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-8">
            <p className="text-destructive text-center">{error}</p>
          </div>
        )}

        {/* Current Weather Details */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Current Conditions</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <WiHumidity className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Humidity</p>
                  <p className="text-xl font-semibold text-foreground">{weatherData?.humidity || 0}%</p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3">
                <WiStrongWind className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Wind Speed</p>
                  <p className="text-xl font-semibold text-foreground">{weatherData?.windSpeed || 0} km/h</p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3">
                <WiBarometer className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Pressure</p>
                  <p className="text-xl font-semibold text-foreground">{weatherData?.pressure || 0} hPa</p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3">
                <MdVisibility className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Visibility</p>
                  <p className="text-xl font-semibold text-foreground">{weatherData?.visibility || 0} km</p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Weather Charts */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Year-Round Weather Patterns</h2>

          <div className="grid lg:grid-cols-3 gap-6">
            <WeatherChart title="Rainfall" data={rainfallData} unit="millimeters" color="primary" />

            <WeatherChart title="Snowfall" data={snowfallData} unit="millimeters" color="secondary" />

            <WeatherChart title="Daylight" data={daylightData} unit="hours" color="primary" />
          </div>
        </section>
        {/* Travel Guide */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <MdLuggage className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-foreground mb-3">Travel Guide</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Plan your perfect trip with our seasonal packing recommendations and travel insights
            </p>
          </div>

          {/* Packing Tips */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-8">
              <MdLightbulb className="w-8 h-8 text-primary" />
              <h3 className="text-2xl font-semibold text-foreground">Packing Tips Based on Season</h3>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Spring & Fall */}
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex gap-1">
                    <MdLocalFlorist className="w-6 h-6 text-primary" />
                    <MdEco className="w-6 h-6 text-secondary" />
                  </div>
                  <h4 className="text-xl font-semibold text-foreground">Spring & Fall</h4>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Pack versatile layers that you can easily add or remove as temperatures shift throughout the day. A
                  light jacket or cardigan works well for cooler mornings and evenings.
                </p>
                <div className="flex items-center gap-2 text-sm text-primary">
                  <FaTshirt className="w-4 h-4" />
                  <span>Layered clothing recommended</span>
                </div>
              </Card>

              {/* Summer */}
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <MdOutlineWbSunny className="w-6 h-6 text-primary" />
                  <h4 className="text-xl font-semibold text-foreground">Summer</h4>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Go for breathable, lightweight fabrics like cotton or linen to handle the heat and humidity. Bring
                  sunscreen, sunglasses, and a hat to protect yourself from the sun.
                </p>
                <div className="flex items-center gap-2 text-sm text-primary">
                  <FaUmbrella className="w-4 h-4" />
                  <span>Light rain protection needed</span>
                </div>
              </Card>

              {/* Winter */}
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <MdOutlineAcUnit className="w-6 h-6 text-primary" />
                  <h4 className="text-xl font-semibold text-foreground">Winter</h4>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Choose a warm, insulated coat along with gloves, a scarf, and a hat to stay comfortable in cold winds.
                  Layering thermal tops or sweaters under your outerwear will help keep you warm.
                </p>
                <div className="flex items-center gap-2 text-sm text-primary">
                  <MdOutlineCheckroom className="w-4 h-4" />
                  <span>Heavy winter gear essential</span>
                </div>
              </Card>
            </div>
          </div>

          {/* Best Time to Visit */}
          <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <MdCalendarToday className="w-8 h-8 text-primary" />
              <h3 className="text-2xl font-semibold text-foreground">Best Time to Visit DC for Weather</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Many travelers find spring and fall to be the most comfortable and scenic seasons. Spring offers
                  cherry blossoms and outdoor festivals, while fall gives you colorful foliage and crisp, clear days.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  If you enjoy fewer crowds and don't mind cooler temperatures, winter can also be a peaceful time to
                  explore.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-background/50 rounded-lg">
                  <MdLocalFlorist className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold text-foreground mb-1">Spring</h4>
                  <p className="text-sm text-muted-foreground">Cherry blossoms & festivals</p>
                </div>
                <div className="text-center p-4 bg-background/50 rounded-lg">
                  <MdEco className="w-8 h-8 text-secondary mx-auto mb-2" />
                  <h4 className="font-semibold text-foreground mb-1">Fall</h4>
                  <p className="text-sm text-muted-foreground">Colorful foliage & crisp days</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
