import { Metadata } from 'next/types';

export const metadata: Metadata = {
  title: 'Terms of Service - Washington DC Directory',
  description: 'Read our terms of service to understand the rules and guidelines for using DC Directory to discover Washington DC.',
  openGraph: {
    title: 'Terms of Service - Washington DC Directory',
    description: 'Read our terms of service to understand the rules and guidelines for using DC Directory to discover Washington DC.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Washington DC Directory',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-secondary to-secondary text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Terms of Service
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Rules and guidelines for using DC Directory
          </p>
        </div>
      </section>

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
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Acceptance of Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing and using DC Directory ("the Website"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
              <p className="text-gray-700">
                These Terms of Service ("Terms") govern your use of our website and services. By using our website, you agree to these Terms in full.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Description of Service</h2>
              <p className="text-gray-700 mb-4">
                DC Directory is a comprehensive online directory and guide for Washington DC, providing information about:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Restaurants, cafes, and dining establishments</li>
                <li>Museums, monuments, and cultural attractions</li>
                <li>Parks, recreational areas, and outdoor activities</li>
                <li>Hotels, accommodations, and lodging options</li>
                <li>Entertainment venues and events</li>
                <li>Local businesses and services</li>
                <li>Interactive maps and location-based services</li>
              </ul>
              <p className="text-gray-700">
                Our service includes search functionality, user reviews, ratings, and detailed information about various establishments and attractions in Washington DC.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">User Accounts and Registration</h2>
              <p className="text-gray-700 mb-4">
                While many features of our website are available without registration, certain features may require you to create an account. When creating an account, you agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and update your account information</li>
                <li>Keep your password secure and confidential</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized use</li>
              </ul>
              <p className="text-gray-700">
                We reserve the right to terminate accounts that violate these terms or for any other reason at our sole discretion.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Acceptable Use Policy</h2>
              <p className="text-gray-700 mb-4">
                You agree to use our website only for lawful purposes and in accordance with these Terms. You agree not to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Use the website in any way that violates applicable laws or regulations</li>
                <li>Infringe upon the rights of others</li>
                <li>Submit false, misleading, or fraudulent information</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt the website's functionality</li>
                <li>Use automated systems to access the website without permission</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Upload or transmit viruses, malware, or other harmful code</li>
                <li>Use the website for commercial purposes without authorization</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Content and Intellectual Property</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Content</h3>
              <p className="text-gray-700 mb-4">
                The content on our website, including but not limited to text, graphics, images, logos, and software, is owned by DC Directory or its licensors and is protected by copyright, trademark, and other intellectual property laws.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">User-Generated Content</h3>
              <p className="text-gray-700 mb-4">
                When you submit content to our website (such as reviews, comments, or photos), you grant us a non-exclusive, royalty-free, perpetual, and worldwide license to use, modify, and display that content on our website and in our marketing materials.
              </p>
              <p className="text-gray-700 mb-4">
                You represent and warrant that you own or have the necessary rights to the content you submit and that it does not violate any third-party rights.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Third-Party Content</h3>
              <p className="text-gray-700 mb-4">
                Our website may contain content from third parties, including business listings, reviews, and advertisements. We do not endorse or guarantee the accuracy of third-party content and are not responsible for any third-party content.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Disclaimers and Limitations</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Information Accuracy</h3>
              <p className="text-gray-700 mb-4">
                While we strive to provide accurate and up-to-date information, we cannot guarantee the accuracy, completeness, or timeliness of all information on our website. Information about businesses, hours, prices, and availability may change without notice.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Service Availability</h3>
              <p className="text-gray-700 mb-4">
                We do not guarantee that our website will be available at all times or that it will be free from errors or interruptions. We may modify, suspend, or discontinue the website at any time without notice.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Limitation of Liability</h3>
              <p className="text-gray-700 mb-4">
                To the maximum extent permitted by law, DC Directory shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or use, arising out of or relating to your use of our website.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Privacy and Data Protection</h2>
              <p className="text-gray-700 mb-4">
                Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference. By using our website, you consent to our collection and use of information as described in our Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Third-Party Links and Services</h2>
              <p className="text-gray-700 mb-4">
                Our website may contain links to third-party websites and services, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Restaurant websites and booking platforms</li>
                <li>Hotel booking services</li>
                <li>Social media platforms</li>
                <li>Payment processors</li>
                <li>Advertising networks</li>
              </ul>
              <p className="text-gray-700 mb-4">
                We are not responsible for the content, privacy practices, or availability of these third-party sites. Your use of third-party services is subject to their respective terms and conditions.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Indemnification</h2>
              <p className="text-gray-700 mb-4">
                You agree to indemnify, defend, and hold harmless DC Directory and its officers, directors, employees, and agents from and against any claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys' fees) arising out of or relating to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Your use of our website</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any third-party rights</li>
                <li>Any content you submit to our website</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Governing Law and Jurisdiction</h2>
              <p className="text-gray-700 mb-4">
                These Terms shall be governed by and construed in accordance with the laws of the District of Columbia, United States, without regard to its conflict of law provisions. Any disputes arising out of or relating to these Terms or your use of our website shall be resolved in the courts of the District of Columbia.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to modify these Terms at any time. We will notify users of any material changes by posting the updated Terms on our website and updating the "Last updated" date. Your continued use of our website after any changes indicates your acceptance of the updated Terms.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Severability</h2>
              <p className="text-gray-700 mb-4">
                If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that these Terms will otherwise remain in full force and effect.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Entire Agreement</h2>
              <p className="text-gray-700 mb-4">
                These Terms, together with our Privacy Policy, constitute the entire agreement between you and DC Directory regarding your use of our website and supersede all prior agreements and understandings.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700 mb-2">
                  <strong>Email:</strong> legal@dcdirectory.com
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Address:</strong> Washington, DC
                </p>
                <p className="text-gray-700">
                  <strong>Contact Form:</strong> <a href="/contact" className="text-primary hover:text-secondary">Visit our contact page</a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
} 