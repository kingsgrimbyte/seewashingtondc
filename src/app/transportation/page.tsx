import Hero from '@/components/layout/Hero'
import React from 'react'
import SeoContentSection from '@/components/ui/SeoContentSection'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Washington DC Transportation Guide | Metro, Bus & Travel Tips',
  description: 'Navigate Washington DC with ease using our transportation guide. Learn about metro, buses, taxis, and travel tips to explore the city conveniently and affordably.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/transportation`,
  },
};


const page = () => {
  return (
    <div>
      <Hero title='Transportation in Washington, D.C.' subtitle=''/>
      <SeoContentSection hidden={true}/>
    </div>
  )
}

export default page