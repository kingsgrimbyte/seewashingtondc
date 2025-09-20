import { NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://seewashington.com';

export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# Important pages
Allow: /about
Allow: /contact
Allow: /privacy
Allow: /terms
Allow: /search

# Dynamic content
Allow: /*/
Allow: /*/*/
Allow: /*/*/*/

# Block admin or debug pages if they exist
Disallow: /debug-images
Disallow: /admin
Disallow: /api/
Disallow: /_next/
Disallow: /static/

# Block common bot traps
Disallow: /wp-admin/
Disallow: /wp-content/
Disallow: /wp-includes/
Disallow: /admin/
Disallow: /administrator/

# Sitemap location
Sitemap: ${BASE_URL}/sitemap.xml

# Crawl-delay for being respectful
Crawl-delay: 1`;

  return new NextResponse(robotsTxt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400', // Cache for 24 hours
    },
  });
}