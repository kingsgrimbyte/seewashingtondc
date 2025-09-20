import Hero from '@/components/layout/Hero';
import { Metadata } from 'next/types';

export const metadata: Metadata = {
  title: 'Privacy Policy - Washington DC Directory',
  description: 'Learn how we collect, use, and protect your personal information when you use DC Directory to discover Washington DC.',
  openGraph: {
    title: 'Privacy Policy - Washington DC Directory',
    description: 'Learn how we collect, use, and protect your personal information when you use DC Directory to discover Washington DC.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Washington DC Directory',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <Hero
        title='Privacy Policy'
        subtitle='How we protect and handle your personal information'
      />
      {/* Content Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <p className="text-gray-600">
              <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="space-y-8">
            <section>
              <p className="text-gray-700 mb-6">
                We know your privacy is a big deal. At See Washington, DC, we're committed to protecting your information when you browse, search, or connect with our Washington, DC travel and attractions content. This page explains what we collect, why we collect it, how we use it, and the choices you have.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Information (you choose to share):</h3>
              <p className="text-gray-700 mb-4">
                When you interact with our site—whether you subscribe to our newsletter, use a contact form, leave feedback, or take part in a promotion—we may ask for details like your name, email address, phone number, or other contact information. This is always provided voluntarily by you.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Automatically Collected Information:</h3>
              <p className="text-gray-700 mb-4">
                Like most websites, we gather certain information automatically when you visit. This includes your IP address, device type, browser type, operating system, location data (if shared), pages you visit, the time spent on those pages, search terms you enter, and the site you came from. This helps us understand how people use our site so we can make it better.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">
                We use your information to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Provide, maintain, and improve our website and services</li>
                <li>Respond to your messages, questions, or support requests</li>
                <li>Personalize your experience and recommend content you might enjoy</li>
                <li>Send newsletters, updates, and marketing (if you've opted in)</li>
                <li>Monitor website usage and detect any technical or security issues</li>
                <li>Comply with legal or regulatory requirements</li>
              </ul>
              <p className="text-gray-700">
                We never use your personal data for purposes unrelated to what you signed up for.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Sharing Your Information</h2>
              <p className="text-gray-700 mb-4">
                We don't sell, rent, or trade your personal information to third parties. The only times we share it are:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>With trusted vendors or service providers who help us operate the website and deliver services (for example, email newsletter platforms, analytics tools)</li>
                <li>When required by law to respond to court orders, legal requests, or government regulations</li>
                <li>During a business transfer such as a merger, sale, or acquisition</li>
                <li>For security or legal protection to prevent fraud, safeguard our rights, and protect our users</li>
              </ul>
              <p className="text-gray-700">
                Any third party we work with is expected to handle your data responsibly and only for the purposes outlined here.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Cookies and Tracking</h2>
              <p className="text-gray-700 mb-4">
                We use cookies and similar tracking tools to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Remember your preferences and settings</li>
                <li>Analyze how our website is used</li>
                <li>Deliver content and recommendations tailored to your interests</li>
                <li>Improve site performance</li>
              </ul>
              <p className="text-gray-700 mb-4">
                Cookies are small data files stored on your device. You can disable them in your browser settings, but some parts of the site might not work as intended.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Data Security</h2>
              <p className="text-gray-700">
                We use a combination of technical and administrative measures—like encryption, firewalls, and limited access permissions—to protect your information from unauthorized access, alteration, disclosure, or loss. While no system is 100% secure, we take every reasonable step to safeguard your data.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Rights</h2>
              <p className="text-gray-700 mb-4">
                Depending on your location, you may have the right to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Request a copy of the personal data we have about you</li>
                <li>Ask for corrections or updates</li>
                <li>Request deletion of your data (subject to legal requirements)</li>
                <li>Restrict or object to certain types of data processing</li>
                <li>Unsubscribe from marketing communications at any time</li>
              </ul>
              <p className="text-gray-700">
                You can exercise these rights by contacting us directly.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Third-Party Links</h2>
              <p className="text-gray-700">
                Our site may link to other websites, including attractions, hotels, restaurants, booking services, or social media platforms. We do not control or endorse the privacy practices of these sites. Before sharing personal information with them, we recommend reading their privacy policies to understand how they handle your data.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
              <p className="text-gray-700 mb-4">
                This site is designed for travelers, event-goers, and DC enthusiasts—not for children under 13. We do not knowingly collect information from minors. If you believe a child has provided us with personal information, contact us immediately so we can remove it. Parents and guardians are encouraged to monitor children's online activity.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">International Users</h2>
              <p className="text-gray-700">
                If you're accessing our site from outside the United States, know that your information may be processed and stored in the US or other countries. We take steps to ensure your data is protected in line with applicable laws, but the privacy laws where your data is stored may differ from those in your country.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Policy Updates</h2>
              <p className="text-gray-700">
                We may update this Privacy Policy when necessary to reflect changes in our services, legal requirements, or business practices. When we make changes, we'll post the updated policy on this page with a revised "Last Updated" date. Continuing to use our site after changes are posted means you accept those changes.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have questions about this Privacy Policy or how we handle your data, you can reach us at:
              </p>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700 mb-2">
                  <strong>Email:</strong> privacy@dcdirectory.com
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Address:</strong> 
                </p>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
} 