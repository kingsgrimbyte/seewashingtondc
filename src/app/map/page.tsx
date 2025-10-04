import StaticMap from '@/components/map/StaticMap'
import { Metadata } from 'next';
import React from 'react'
export const metadata: Metadata = {
  title: 'Washington DC Map | Tourist Attractions & City Guide',
  description: 'Use our Washington DC map to explore landmarks, attractions, museums, and neighborhoods. Plan your sightseeing routes with this easy city travel guide.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/map`,
  },
};


const page = () => {
  return (
    <div><StaticMap/></div>
  )
}

export default page