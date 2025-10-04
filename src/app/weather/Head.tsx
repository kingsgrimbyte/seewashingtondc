

export default function Head() {
  return (
    <head>
      <title>Washington DC Weather | Forecast & Seasonal Travel Guide</title>
      <meta name="description" content={"Check Washington DC weather and seasonal forecasts. Get tips on the best times to visit, what to pack, and how to plan your trip for every season in the capital."} />
      <link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL}/weather`} />
    </head>
  );
} 