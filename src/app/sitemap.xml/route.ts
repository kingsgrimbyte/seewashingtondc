import { NextResponse } from 'next/server';
import { getCategories, getSubcategories, getPlaces } from '@/lib/data-service';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://seewashington.com';

export async function GET() {
  try {
    // Fetch all data needed for sitemap
    const [categories, subcategories, places] = await Promise.all([
      getCategories(),
      getSubcategories(),
      getPlaces()
    ]);

    // Static routes
    const staticRoutes = [
      '',
      '/about',
      '/contact',
      '/privacy',
      '/terms',
      '/search'
    ];

    // Generate sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticRoutes.map(route => `
  <url>
    <loc>${BASE_URL}${route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('')}
  ${categories.map(category => `
  <url>
    <loc>${BASE_URL}/${encodeURIComponent(category.slug)}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`).join('')}
  ${subcategories.map(subcategory => {
    // Find the category for this subcategory
    const category = categories.find(cat => cat.id === subcategory.category_id);
    if (!category) return '';
    
    return `
  <url>
    <loc>${BASE_URL}/${encodeURIComponent(category.slug)}/${encodeURIComponent(subcategory.slug)}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
  }).join('')}
  ${places.map(place => {
    // Only include places that have all required slug data
    if (!place.categorySlug || !place.subcategorySlug || !place.slug) {
      return '';
    }
    
    return `
  <url>
    <loc>${BASE_URL}/${encodeURIComponent(place.categorySlug)}/${encodeURIComponent(place.subcategorySlug)}/${encodeURIComponent(place.slug)}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
  }).join('')}
</urlset>`;

    return new NextResponse(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    
    // Return a basic sitemap with just static routes if there's an error
    const basicSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${BASE_URL}/about</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${BASE_URL}/contact</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${BASE_URL}/privacy</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${BASE_URL}/terms</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${BASE_URL}/search</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`;

    return new NextResponse(basicSitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=300, s-maxage=300', // Shorter cache on error
      },
    });
  }
}