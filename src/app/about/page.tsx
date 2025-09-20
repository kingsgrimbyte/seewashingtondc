import { Metadata } from "next/types";
import Link from "next/link";
import AppIcon from "@/components/ui/AppIcon";
import Hero from "@/components/layout/Hero";
import CategoryGrid from "@/components/categories/CategoryGrid";
import { getAboutContent } from "@/lib/aboutContent";

export const metadata: Metadata = {
  title: "About See Washington, DC | Exploring the Nation's Capital",
  description:
    "Discover Washington, DC with Us – your trusted online guide to attractions, events, neighborhoods, and hidden gems. Perfect for first-time visitors, repeat travelers, and locals looking to explore more.",
  openGraph: {
    title: "About See Washington, DC | Exploring the Nation's Capital",
    description:
      "Discover Washington, DC with Us – your trusted online guide to attractions, events, neighborhoods, and hidden gems. Perfect for first-time visitors, repeat travelers, and locals looking to explore more.",
    type: "website",
    locale: "en_US",
    siteName: "See Washington, DC",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutPage() {
  const content = getAboutContent();

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <Hero
        title={content.hero.title}
        subtitle={content.hero.subtitle}
        ctaText={content.hero.ctaText}
        ctaLink={content.hero.ctaLink}
      />

      {/* Intro Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {content.intro.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            {content.intro.description}
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-secondary rounded-full mb-8">
            <AppIcon name="target" className="text-3xl text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {content.mission.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            {content.mission.description}
          </p>
        </div>
      </section>

      {/* Who We're For Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {content.audience.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.audience.sections.map((section, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary/20"
              >
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center shadow-lg">
                    <AppIcon
                      name={section.icon as any}
                      className="text-2xl text-white"
                    />
                  </div>
                </div>

                <div className="pt-8 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {section.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {content.stats.title}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {content.stats.items.map((item, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-all duration-300">
                  <AppIcon
                    name={item.icon as any}
                    className="text-3xl text-white"
                  />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                  {item.number}
                </div>
                <div className="text-lg font-semibold text-white/90 mb-2">
                  {item.label}
                </div>
                <div className="text-sm text-white/70">{item.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {content.features.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.features.items.map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary/20 hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:from-primary/20 group-hover:to-secondary/20 transition-all duration-300">
                  <AppIcon
                    name={feature.icon as any}
                    className="text-2xl text-primary"
                  />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>

                {feature.link ? (
                  <Link
                    href={feature.link}
                    className="inline-flex items-center text-primary hover:text-secondary font-semibold transition-colors group/link"
                  >
                    {feature.linkText}
                    <svg
                      className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                ) : (
                  <span className="text-primary font-semibold">
                    {feature.linkText}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-secondary rounded-full mb-8">
            <AppIcon name="shield-check" className="text-3xl text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {content.trust.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            {content.trust.description}
          </p>
        </div>
      </section>

      {/* Popular Searches Section */}
      {/* <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {content.popularSearches.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {content.popularSearches.subtitle}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {content.popularSearches.searches.map((search, index) => (
              <Link 
                key={index}
                href={`/search?q=${encodeURIComponent(search)}`}
                className="group block p-4 bg-gray-50 rounded-xl hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300 border border-gray-100 hover:border-primary/20"
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 group-hover:text-primary font-medium transition-colors">
                    {search}
                  </span>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section> */}

      {/* Team Section */}
      {/* <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {content.team.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {content.team.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.team.members.map((member, index) => (
              <div key={index} className="text-center group">
                <div
                  className={`w-32 h-32 bg-gradient-to-br ${member.color} rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <AppIcon
                    name={member.icon as any}
                    className="text-4xl text-white"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">
                  {member.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {content.cta.title}
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            {content.cta.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={content.cta.primaryButton.link}
              className="bg-white text-primary px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              {content.cta.primaryButton.text}
            </Link>
            <Link
              href={content.cta.secondaryButton.link}
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-primary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              {content.cta.secondaryButton.text}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
