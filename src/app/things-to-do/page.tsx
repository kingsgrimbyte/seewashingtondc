import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import {
  FaWater,
  FaFish,
  FaHiking,
  FaUmbrellaBeach,
  FaTicketAlt,
  FaSpa,
  FaMapMarkedAlt,
  FaArrowRight,
  FaCalendarAlt,
  FaTree,
  FaGolfBall 
} from "react-icons/fa"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Hero from "@/components/layout/Hero"
import MapSection from "@/components/ui/MapSection"
import SeoContentSection from "@/components/ui/SeoContentSection"

export const metadata: Metadata = {
  title: "Things to Do in Washington, DC – Top Attractions, Outdoor Activities & More",
  description:
    "Explore exciting things to do in Washington, DC, including outdoor activities, museums, events, and attractions. Plan your trip and find must-see spots and experiences in the capital city.",
  keywords:
    "Washington DC activities, things to do DC, Potomac River water sports, Rock Creek Park hiking, DC outdoor adventures, family activities DC",
  openGraph: {
    title: "Top Things to Do in Washington DC - Outdoor Adventures & More",
    description:
      "Explore Washington DC with outdoor adventures, water sports, hiking trails, and cultural experiences. Perfect for nature lovers and families.",
    url: "/things-to-do",
    siteName: "Washington DC Guide",
    locale: "en_US",
    type: "website",
  },
}

const pageContent = {
  header: {
    title: "Top Things to Do in Washington DC – Outdoor Adventures, Water Sports, Hiking & More",
    intro:
      "Washington DC offers a wide range of activities for all types of visitors. From outdoor adventures along the Potomac River to thrilling water sports, hiking trails, and unique cultural experiences, there's always something exciting to do in the nation's capital. Whether you're a nature lover, sports fan, or seeking family-friendly activities, you'll find plenty of ways to enjoy the city.",
    ctaText: "Find Activities",
    ctaLink: "/activities",
  },
  categories: [
    {
      title: "Water Sports",
      icon: FaWater,
      link: "/water-sports",
      description: "Kayaking, paddleboarding, and boating on the Potomac River",
    },
    {
      title: "Fishing Spots",
      icon: FaFish,
      link: "/fishing-spot",
      description: "Best fishing locations along DC waterways",
    },
    {
      title: "Garden",
      icon: FaTree,
      link: "/garden",
      description: "Scenic trails in Rock Creek Park and beyond",
    },
    {
      title: "Beaches",
      icon: FaUmbrellaBeach,
      link: "/beach",
      description: "Waterfront areas and beach-like experiences",
    },
    {
      title: "Golf Courses",
      icon: FaGolfBall,
      link: "/golf-courses",
      description: "Professional Golf Courses",
    },
    {
      title: "Spas",
      icon: FaSpa,
      link: "/spas",
      description: "Relaxation and wellness centers",
    },
  ],
  highlights: {
    title: "Top Activities to Try in Washington DC",
    intro:
      "Washington DC is a city that offers something for everyone, whether you're looking to relax or get active. Here are some of the best things to do that should be at the top of your list:",
    activities: [
      {
        title: "Water Sports on the Potomac River",
        description:
          "The Potomac River is a popular spot for outdoor activities. Whether you're into kayaking, paddleboarding, or just enjoying a boat ride, this scenic river provides plenty of opportunities for fun and relaxation with stunning views of DC landmarks.",
        image: "https://ik.imagekit.io/h7rza8886p/jefferson-memorial-surrounded-by-water-greenery-blue-sky-washington.jpg?updatedAt=1754994821591",
      },
      {
        title: "Hiking in Rock Creek Park",
        description:
          "Rock Creek Park is one of DC's largest urban green spaces, offering miles of trails perfect for hiking, biking, and nature walks. Whether you want a short stroll or a more challenging hike, this park offers an escape into nature while remaining close to the city.",
        image: "https://ik.imagekit.io/h7rza8886p/beautiful-view-city-seattle-usa-with-colorful-lighted-buildings-dusk.jpg?updatedAt=1754994821714",
      },
      {
        title: "Explore the Tidal Basin",
        description:
          "The Tidal Basin is an iconic outdoor space in DC, especially during cherry blossom season. Whether you're taking a boat ride or just strolling along the water, this is a perfect spot for outdoor relaxation and sightseeing. It's also home to several memorials, including the Jefferson Memorial.",
        image: "https://ik.imagekit.io/h7rza8886p/architecture-2025-03-15-05-09-37-utc.jpg?updatedAt=1754465975568",
      },
    ],
    ctaText: "Explore All Things to Do",
    ctaLink: "/activities-directory",
  },
  mapSection: {
    title: "Find Activities Near You",
    description:
      "Use our interactive map to discover things to do across Washington DC based on your location. Whether you're near the National Mall, Georgetown, or Dupont Circle, you can easily find nearby outdoor activities, cultural events, and more.",
    ctaText: "Open Interactive Map",
    ctaLink: "/map",
  },
  seoContent: {
    title: "Washington DC: A City Full of Things to Do for Every Type of Traveler",
    mainContent:
      "Washington DC is a vibrant city with plenty of things to do, offering a perfect mix of outdoor fun, cultural experiences, and family-friendly activities. Whether you're an adventure seeker, history buff, or nature lover, there's always something to enjoy.\n\nOne of the best ways to experience Washington DC is through its outdoor activities. With the Potomac River flowing through the city, water sports like kayaking and paddleboarding are popular options. For those who love hiking, Rock Creek Park is a hidden gem, providing miles of trails through wooded landscapes. You can explore the city's history while hiking through National Park Service sites, enjoying the peacefulness of nature.\n\nFor a more relaxed experience, the Tidal Basin offers picturesque views, especially during the cherry blossom season. Visitors can rent paddleboats or simply enjoy the memorials surrounding the water. DC also boasts numerous green spaces where you can picnic, bike, or enjoy outdoor events year-round.",
    sections: [
      {
        title: "Water Sports: Paddleboarding, Kayaking, and Boating on the Potomac",
        content:
          "DC's Potomac River offers endless opportunities for water sports. From paddleboarding to kayaking, it's the perfect way to see the city's landmarks from the water. Whether you're a beginner or an experienced kayaker, the Potomac provides a scenic and fun way to explore DC.",
      },
      {
        title: "Hiking Trails: Explore Rock Creek Park",
        content:
          "Rock Creek Park is a nature lover's paradise. With over 1,700 acres of parkland, it's the ideal spot for hiking, biking, and wildlife watching. The park offers trails for all levels of hikers, from easy walks to more challenging routes. It's also a great place to escape the hustle and bustle of the city.",
      },
      {
        title: "Family-Friendly Fun: Zoos, Aquariums, and Outdoor Adventures",
        content:
          "For families visiting DC, there's no shortage of fun activities. The Smithsonian National Zoo is home to giant pandas and other animals, providing an educational and entertaining experience for children and adults alike. Families can also enjoy outdoor adventures on the Potomac River or explore the many parks and gardens around the city.",
      },
      {
        title: "Fun Events: Seasonal Festivals and Local Attractions",
        content:
          "Washington DC hosts year-round events and festivals, including the National Cherry Blossom Festival in spring, outdoor concerts in the summer, and the DC Jazz Festival in the fall. These events offer visitors a chance to experience DC's vibrant culture and lively atmosphere.",
      },
    ],
  },
  finalCta: {
    title: "Ready to Explore Washington DC's Best Things to Do?",
    ctaText: "Start Planning Your Visit",
    ctaLink: "/plan-visit",
  },
}

export default function ThingsToDoPage() {
  return (
    <div className="min-h-screen bg-background">
      <Hero 
        title={`Top Things to Do in Washington DC`}
        subtitle={``}
      />
      {/* Header Section */}
      <section className="bg-gradient-to-br from-primary/5 to-secondary/5 pt-16 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {pageContent.header.title}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">{pageContent.header.intro}</p>
            <Link href={pageContent.header.ctaLink}>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg">
                {pageContent.header.ctaText}
                <FaArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pageContent.categories.map((category, index) => {
              const IconComponent = category.icon
              return (
                <Link key={index} href={category.link}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/20">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                        <IconComponent className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-foreground">{category.title}</h3>
                      <p className="text-muted-foreground text-sm">{category.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{pageContent.highlights.title}</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{pageContent.highlights.intro}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 " >
            {pageContent.highlights.activities.map((activity, index) => (
              <div key={index} className="bg-background rounded-lg overflow-hidden shadow-sm border">
                <div className="relative h-48">
                  <Image
                    src={activity.image || "/placeholder.svg"}
                    alt={activity.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-foreground">{activity.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>



      {/* SEO Content Section */}
      <SeoContentSection/>

      {/* Map Section */}
      <MapSection/>

      {/* Final CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-gradient-to-br from-secondary to-primary rounded-2xl p-8 md:p-12 text-center text-primary-foreground">
            <div className="w-20 h-20 mx-auto mb-6 bg-white/10 rounded-full flex items-center justify-center">
              <FaCalendarAlt className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">{pageContent.finalCta.title}</h2>
            <Link href={pageContent.finalCta.ctaLink}>
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90 px-8 py-3 text-lg"
              >
                {pageContent.finalCta.ctaText}
                <FaArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
