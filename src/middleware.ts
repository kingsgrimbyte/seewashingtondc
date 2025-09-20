import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Map of listing IDs to their new slug paths for redirection
// In a production app, this would be fetched from a databas

// Special case subcategory redirect

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res });

  // Get the session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Protect dashboard routes
  if (pathname.startsWith('/dashboard')) {
    if (!session) {
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }
  
  // Handle URL structure for categories, subcategories, and places
  const segments = pathname.split('/').filter(Boolean);
  
  // Handle /category/[categorySlug] routes
  if (segments.length === 2 && segments[0] === 'category' && !pathname.startsWith('/dashboard') && 
      !pathname.startsWith('/login') && !pathname.startsWith('/api') && !pathname.startsWith('/_next') && 
      !pathname.includes('.')) {
    const categorySlug = segments[1];
    return NextResponse.redirect(new URL(`/${categorySlug}`, request.url));
  }

  // Handle /category/[categorySlug]/[subcategorySlug] routes
  if (segments.length === 3 && segments[0] === 'category' && !pathname.startsWith('/dashboard') && 
      !pathname.startsWith('/login') && !pathname.startsWith('/api') && !pathname.startsWith('/_next') && 
      !pathname.includes('.')) {
    const categorySlug = segments[1];
    const subcategorySlug = segments[2];
    return NextResponse.redirect(new URL(`/${categorySlug}/${subcategorySlug}`, request.url));
  }

  // Handle /category/[categorySlug]/[subcategorySlug]/[placeSlug] routes
  if (segments.length === 4 && segments[0] === 'category' && !pathname.startsWith('/dashboard') && 
      !pathname.startsWith('/login') && !pathname.startsWith('/api') && !pathname.startsWith('/_next') && 
      !pathname.includes('.')) {
    const categorySlug = segments[1];
    const subcategorySlug = segments[2];
    const placeSlug = segments[3];
    return NextResponse.redirect(new URL(`/${categorySlug}/${subcategorySlug}/${placeSlug}`, request.url));
  }

  // Redirect /listing/[id] to /category/[categorySlug]/[placeSlug]
  if (pathname.startsWith('/listing/')) {
    const id = pathname.split('/').pop();
    // TODO: Add logic to fetch category and place slugs from the listing ID
    return NextResponse.next();
  }

  const currentUrl = request.nextUrl.origin;
  
  // Clone the response and add the host header
  const response = NextResponse.next();
  response.headers.set('x-url', currentUrl);
  
  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/listing/:path*',
    '/category/:path*',
    '/:path*',
    '/:categorySlug/:subcategorySlug/:placeSlug',
    '/:categorySlug/:subcategorySlug',
    '/:categorySlug'
  ],
}; 