"use client"

interface WeatherChartProps {
  title: string
  data: { month: string; value: number }[]
  unit: string
  color: "primary" | "secondary" | "chart-1" | "chart-2"
}

export default function WeatherChart({ title, data, unit, color }: WeatherChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value))

  const getColorClass = (color: string) => {
    switch (color) {
      case "primary":
        return "bg-primary"
      case "secondary":
        return "bg-secondary"
      case "chart-1":
        return "bg-blue-600" // Using blue for rainfall/snowfall charts
      case "chart-2":
        return "bg-yellow-500" // Using yellow for daylight chart
      default:
        return "bg-primary"
    }
  }

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
      <div className="mb-6">
        <h3 className="text-base font-medium text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-500">({unit})</p>
      </div>

      <div className="relative">
        <div className="flex items-end justify-between gap-1 h-40 mb-4">
          {data.map((item, index) => {
            const height = maxValue > 0 ? Math.max((item.value / maxValue) * 100, 2) : 2

            return (
              <div key={index} className="flex flex-col items-center flex-1 relative">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700">
                  {item.value}
                </div>

                <div className="relative flex items-end h-32 w-full px-0.5">
                  <div
                    className={`${getColorClass(color)} rounded-sm w-full transition-all duration-300 hover:opacity-80`}
                    style={{ height: `${height}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>

        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-gray-600">Days</span>
            <div className="flex justify-between flex-1 ml-4">
              {data.map((item, index) => (
                <span key={index} className="text-xs text-gray-600 font-medium">
                  {item.value}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-between mt-2 ml-12">
            {data.map((item, index) => (
              <span key={index} className="text-xs text-gray-500">
                {item.month}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
