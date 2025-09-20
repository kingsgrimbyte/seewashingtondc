import type { Metadata } from 'next/types';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

// Initialize React DevTools in development
if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  const ReactDevTools = require('react-devtools');
  ReactDevTools.connect();
}

// Using a function to generate metadata allows dynamic values
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Washington DC Directory',
    description: 'Discover the best attractions, restaurants, museums and more in Washington DC',
    openGraph: {
      title: 'Washington DC Directory',
      description: 'Discover the best attractions, restaurants, museums and more in Washington DC',
      type: 'website',
      locale: 'en_US',
      siteName: 'Washington DC Directory',
    },
    robots: {
      index: true,
      follow: true,
    },
    verification: {
      google: 'kojBw8twzaLKryeF_WDzb-0_EqA4fvDD3XOm5WbPSNk',
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script id="website-schema" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Washington DC Directory",
              "url": "/",
              "description": "Your ultimate guide to Washington DC - explore attractions, restaurants, museums, and more like a local",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }
          `}
        </Script>
        <Script id="canonical-url" strategy="afterInteractive">
          {`
            // Create a canonical link element if it doesn't exist
            let canonicalLink = document.head.querySelector('link[rel="canonical"]');
            if (!canonicalLink) {
              canonicalLink = document.createElement('link');
              canonicalLink.rel = 'canonical';
              document.head.appendChild(canonicalLink);
            }
            // Set the href to the current full URL (origin + pathname)
            canonicalLink.href = window.location.origin + window.location.pathname;

            // Replace dynamic URL placeholders in JSON-LD scripts
            document.querySelectorAll('script[type="application/ld+json"]').forEach(script => {
              try {
                let content = script.textContent;
                if (content && content.includes('__DYNAMIC_URL_BASE__')) {
                  content = content.replace(/__DYNAMIC_URL_BASE__/g, window.location.origin);
                  script.textContent = content;
                }
              } catch (e) {
                console.error('Error processing JSON-LD script:', e);
              }
            });
          `}
        </Script>
        <link rel="icon" href="https://ik.imagekit.io/h7rza8886p/seewashingtondcfavicon.ico?updatedAt=1753072382056" />
      </head>
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-grow ">
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
} 