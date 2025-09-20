"use client"

import { WiDaySunny, WiCloudy, WiRain, WiSnow } from "react-icons/wi"
import { MdLocationOn } from "react-icons/md"

interface WeatherHeroProps {
  location: string
  temperature: number
  condition: string
  description: string
  isLoading: boolean
}

export default function WeatherHero({ location, temperature, condition, description, isLoading }: WeatherHeroProps) {
  const getWeatherIcon = (condition: string) => {
    const iconClass = "w-24 h-24 text-primary"

    if (condition.includes("clear") || condition.includes("sunny")) {
      return <WiDaySunny className={iconClass} />
    } else if (condition.includes("cloud")) {
      return <WiCloudy className={iconClass} />
    } else if (condition.includes("rain")) {
      return <WiRain className={iconClass} />
    } else if (condition.includes("snow")) {
      return <WiSnow className={iconClass} />
    }
    return <WiDaySunny className={iconClass} />
  }

  if (isLoading) {
    return (
      <section className="relative bg-gradient-to-br from-primary/5 to-secondary/10 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="w-24 h-24 bg-secondary rounded-full mx-auto mb-6"></div>
            <div className="h-8 bg-secondary rounded w-48 mx-auto mb-4"></div>
            <div className="h-12 bg-secondary rounded w-32 mx-auto mb-4"></div>
            <div className="h-4 bg-secondary rounded w-64 mx-auto"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative bg-gradient-to-br from-primary/5 to-secondary/10 py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4">
          <MdLocationOn className="w-5 h-5" />
          <span className="text-lg font-medium">{location}</span>
        </div>

        <div className="mb-6">{getWeatherIcon(condition)}</div>

        <h1 className="text-6xl font-bold text-primary mb-2">{Math.round(temperature)}°</h1>

        <p className="text-2xl font-semibold text-foreground mb-2 capitalize">{condition}</p>

        <p className="text-lg text-muted-foreground max-w-md mx-auto">{description}</p>
      </div>
    </section>
  )
}
