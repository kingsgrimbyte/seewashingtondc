// components/WeatherWidget.tsx

import { useEffect } from "react";

const WeatherWidget = () => {
  useEffect(() => {
    // Dynamically load the weather widget script
    const script = document.createElement("script");
    script.src = "https://weatherwidget.io/js/widget.min.js";
    script.async = true;
    script.id = "weatherwidget-io-js";
    document.body.appendChild(script);

    return () => {
      // Cleanup the script when the component is unmounted
      const existingScript = document.getElementById("weatherwidget-io-js");
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <div className="weather-widget-container cursor-default">
      <a
        className="weatherwidget-io"
        href=""
        data-label_1="WASHINGTON D.C."
        data-label_2="WEATHER"
        data-theme="original"
      >
        WASHINGTON D.C. WEATHER
      </a>
    </div>
  );
};

export default WeatherWidget;
