import { Metadata } from "next/types";
import Link from "next/link";
import AppIcon from "@/components/ui/AppIcon";
import Hero from "@/components/layout/Hero";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Write For Us | See Washington, DC - Share Your Story",
  description:
    "Join our community of writers and share your Washington DC stories. Contribute articles about local businesses, attractions, dining, and experiences to help visitors and locals discover the best of DC.",
  openGraph: {
    title: "Write For Us | See Washington, DC - Share Your Story",
    description:
      "Join our community of writers and share your Washington DC stories. Contribute articles about local businesses, attractions, dining, and experiences to help visitors and locals discover the best of DC.",
    type: "website",
    locale: "en_US",
    siteName: "See Washington, DC",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function WriteForUsPage() {
  const contributionTopics = [
    {
      icon: "restaurant",
      title: "Local Businesses & Services",
      description:
        "Share insights about your favorite local businesses, hidden gems, and must-visit establishments in Washington, DC.",
    },
    {
      icon: "utensils",
      title: "Lifestyle, Dining & Entertainment",
      description:
        "Write about the vibrant dining scene, entertainment venues, nightlife, and lifestyle experiences that make DC unique.",
    },
    {
      icon: "landmark",
      title: "Travel Tips & Attractions",
      description:
        "Help visitors discover hidden gems, provide insider tips, and showcase must-see attractions and experiences.",
    },
    {
      icon: "users",
      title: "Community Stories & Events",
      description:
        "Tell compelling community stories, cover local events, and share experiences that bring the DC community together.",
    },
  ];

  const benefits = [
    {
      icon: "trending",
      title: "Showcase Your Brand",
      description:
        "Get your business or personal brand in front of Washington locals and visitors looking for authentic recommendations.",
    },
    {
      icon: "users",
      title: "Engaged Audience",
      description:
        "Share your valuable insights with our growing community of DC enthusiasts, tourists, and local residents.",
    },
    {
      icon: "award",
      title: "Build Credibility",
      description:
        "Establish yourself as a local expert and build online visibility through our established platform.",
    },
  ];

  const guidelines = [
    {
      icon: "lightbulb",
      title: "Original Content",
      description:
        "All submissions must be original, unpublished content that provides genuine value to our readers.",
    },
    {
      icon: "star",
      title: "Quality Standards",
      description:
        "Articles should be well-written, informative, and maintain our high editorial standards.",
    },
    {
      icon: "map",
      title: "DC Focus",
      description:
        "Content should be relevant to Washington, DC and provide local insights or practical information.",
    },
    {
      icon: "clock",
      title: "Timely Response",
      description:
        "Our editorial team reviews all submissions and responds within 5-7 business days with feedback.",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <Hero
        title="Write For Us"
        subtitle="Join our community and share your Washington DC story with locals and visitors alike"
      />

      {/* Introduction Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-full mb-8">
            <AppIcon name="users" className="text-3xl text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Share Your Voice with Our Community
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
            At See Washington DC, we're always looking to feature fresh voices
            and local perspectives. Whether you're a business owner, creative
            entrepreneur, or passionate writer, this is your chance to share
            your story with our growing audience.
          </p>
        </div>
      </section>

      {/* Topics We Cover Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Topics We Welcome
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We welcome articles, guides, and insights related to these key
              areas of Washington, DC life:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {contributionTopics.map((topic, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary/20"
              >
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg">
                    <AppIcon
                      name={topic.icon as any}
                      className="text-2xl text-white"
                    />
                  </div>
                </div>

                <div className="pt-8 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">
                    {topic.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {topic.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Publish With Us?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Publishing on our platform allows you to:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary/20 hover:-translate-y-2 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:from-primary/20 group-hover:to-secondary/20 transition-all duration-300">
                  <AppIcon
                    name={benefit.icon as any}
                    className="text-2xl text-primary"
                  />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">
                  {benefit.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guidelines Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Submission Guidelines
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              To ensure the best experience for our readers, please follow these
              guidelines:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {guidelines.map((guideline, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-primary/20 text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:from-primary/20 group-hover:to-secondary/20 transition-all duration-300">
                  <AppIcon
                    name={guideline.icon as any}
                    className="text-lg text-primary"
                  />
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                  {guideline.title}
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed">
                  {guideline.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto text-center">
          {/* <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-8">
            <AppIcon name="external" className="text-3xl text-white" />
          </div> */}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Share Your Story?
          </h2>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-3xl mx-auto">
            If you're interested in contributing, please reach out to us with
            your article idea or business pitch. Our team will get back to you
            with the next steps and guidelines.
          </p>
          <p className="text-lg text-white/90 mb-8">
            We look forward to featuring your story and helping you connect with
            our readers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-4 text-lg min-w-[200px]"
              >
                <AppIcon name="users" className="mr-2 text-lg" />
                Contact Us
              </Button>
            </Link>
          </div>

          {/* <div className="mt-8 p-6 bg-white/10 backdrop-blur-sm rounded-2xl">
            <p className="text-white/90 text-sm">
              <strong>Email us at:</strong> hello@seewashingtondc.com
            </p>
            <p className="text-white/80 text-xs mt-2">
              Please include "Write For Us" in your subject line along with a brief description of your article idea.
            </p>
          </div> */}
        </div>
      </section>

      {/* FAQ Section */}
      {/* <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-8">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                What types of content do you accept?
              </h3>
              <p className="text-gray-600">
                We accept well-researched articles, guides, business features, event coverage, and personal experiences 
                related to Washington, DC. Content should be informative, engaging, and provide value to our readers.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                How long should my article be?
              </h3>
              <p className="text-gray-600">
                Articles should typically be between 800-2,000 words. We value quality over quantity, so focus on 
                providing comprehensive, useful information rather than meeting a specific word count.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Do you pay for contributions?
              </h3>
              <p className="text-gray-600">
                Currently, we offer exposure and backlinks rather than monetary compensation. This is a great opportunity 
                to build your portfolio, establish expertise, and gain visibility in the DC market.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Can I include links to my business or website?
              </h3>
              <p className="text-gray-600">
                Yes! We encourage relevant, non-spammy links that add value to the content. You can include a brief 
                author bio with links to your business or social media profiles.
              </p>
            </div>
          </div>
        </div>
      </section> */}
    </main>
  );
}
