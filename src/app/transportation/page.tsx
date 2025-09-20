import Hero from '@/components/layout/Hero'
import React from 'react'
import SeasonalOverview from '../weather/SeasonalOverview'
import SeoContentSection from '@/components/ui/SeoContentSection'

const page = () => {
  return (
    <div>
      <Hero title='Transportation in Washington, D.C.' subtitle=''/>
      <SeoContentSection hidden={true}/>
    </div>
  )
}

export default page