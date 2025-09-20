# Washington DC Directory Site - Project Plan

## Overview
A comprehensive directory website showcasing Washington DC's attractions, restaurants, museums, and other points of interest. The site will use Next.js for the frontend and Supabase for the database, providing users with an intuitive interface to explore and discover places in the city.

## 1. Project Setup and Infrastructure

### 1.1 Next.js Frontend Setup
- Initialize a new Next.js 14+ project with TypeScript
- Set up project structure (pages, components, services, hooks)
- Configure for App Router architecture
- Implement responsive design system
- Set up necessary dependencies:
  - UI framework (e.g., Tailwind CSS, Material UI, or Chakra UI)
  - State management (React Context or Redux)
  - Form handling (React Hook Form)
  - Data fetching utilities

### 1.2 Supabase Backend Setup
- Create a new Supabase project
- Configure authentication (for admin users, optional public users)
- Set up PostgreSQL database structure
- Define security rules and policies
- Set up storage buckets for images

## 2. Database Design

### 2.1 Core Tables
- **places**: Main table for all locations
  - id, name, description, address, phone, website, price_range, rating, reviews_count, gps_coordinates, place_id, subcategory_id, created_at, updated_at
  - hours_monday, hours_tuesday, hours_wednesday, hours_thursday, hours_friday, hours_saturday, hours_sunday (stored as formatted strings, e.g., "09:00-17:00" or "Closed")
- **categories**: Primary categories (e.g., Restaurants, Museums, Parks)
  - id, name, description, slug, image_url, order_index, ai_intro_text, ai_outro_text, last_ai_update, created_at, updated_at
- **subcategories**: For more specific classifications (e.g., Italian Restaurants, Art Museums)
  - id, name, description, category_id, slug, image_url, order_index, ai_intro_text, ai_outro_text, last_ai_update, created_at, updated_at
- **place_images**: Images for each place
  - id, place_id, image_url, alt_text, is_main, order_index, created_at
- **amenities**: Features offered by places
  - id, name, icon, created_at, updated_at
- **place_amenities**: Junction table linking places to amenities
  - id, place_id, amenity_id, created_at
- **reviews**: User or imported reviews (optional)
  - id, place_id, user_id, rating, content, created_at, updated_at

### 2.2 Data Relationships
- One-to-many: Category to Subcategories (a category has many subcategories)
- One-to-many: Subcategory to Places (a subcategory contains many places)
- Many-to-many: Places to Amenities (via place_amenities junction table)
- One-to-many: Place to Images (a place has multiple images)
- One-to-many: Place to Reviews (a place has multiple reviews)

### 2.3 Data Navigation Flow
- Users browse from Categories → Subcategories → Individual Places
- Each place belongs to exactly one subcategory
- Each subcategory belongs to exactly one main category
- This hierarchical structure enables intuitive navigation and organization
- Cross-referencing allows places to appear in search results across different contexts
- Amenities provide additional filtering capabilities across the entire database

## 3. Data Migration Strategy

### 3.1 Parse Existing JSON Files
- Create a Node.js script to read and parse all JSON files
- Map the current directory structure to the database schema:
  - Top-level directories (e.g., Restaurants_d, Museums_d) become main categories
  - Individual JSON files within directories become subcategories
  - Entries within JSON files become place records
- Transform data into a consistent format suitable for database import:
  - Parse operating hours from JSON into standardized day-by-day format
  - Handle variations in hours format (e.g., "9am-5pm" vs "09:00-17:00")
  - Account for special cases like "Closed" or "By appointment only"
- Extract common fields across different categories
- Normalize data to fit database schema
- Handle duplicate entries across different categories
- Generate unique identifiers to maintain referential integrity between tables

### 3.2 Database Import Process
- Set up migration scripts to populate Supabase tables
- Download and optimize images for storage
- Upload images to Supabase storage
- Create relationships between tables
- Add indexes for performance optimization

### 3.3 AI-Generated Content Integration
- Implement OpenAI API integration for generating category introductions and conclusions
- Create a content generation pipeline with the following steps:
  - Define prompt templates for different category types (restaurants, museums, attractions, etc.)
  - Include relevant data points in prompts (e.g., number of places, top-rated places, unique features)
  - Generate intro paragraphs that provide context, highlights, and overview of the category
  - Generate outro paragraphs with closing remarks, recommendations, and calls to action
  - Store generated content in the database with the category/subcategory data
  - Add a mechanism for manual review/editing of AI-generated content before publication
  - Implement a refresh cycle to update content periodically with new data insights
- Set up rate limiting and caching to optimize API usage costs
- Develop a fallback system with pre-written templates in case of API failures

## 4. Frontend Development

### 4.1 Core Pages
- Homepage with featured categories and places
- Category listing pages
- Subcategory listing pages
- Detailed place pages
- Search results page
- About/Contact pages

### 4.2 Components
- Navigation bar with search
- Category cards
- Place listing cards
- Map integration (Google Maps or Mapbox)
- Filters (by price, rating, amenities, etc.)
- Photo galleries
- Review sections
- Operating hours display:
  - User-friendly format showing all days of the week
  - Current day highlighting
  - "Open now" indicator based on current time
  - Expandable/collapsible for mobile view
- Related places section

### 4.3 Features
- Advanced search functionality with filters
- Geolocation to find nearby places
- Interactive maps showing multiple places
- Responsive image galleries
- Sorting options for listings
- Save favorites functionality (optional, if user accounts enabled)
- Share functionality

## 5. API Development

### 5.1 Supabase API Integration
- Set up API endpoints for retrieving places data
- Create filtered queries for categories and subcategories
- Implement search functionality with PostgreSQL full-text search
- Configure API caching for performance

### 5.2 External APIs
- Google Maps API for maps and directions
- (Optional) Reviews API integration if using external review sources

### 5.3 OpenAI API Integration
- Set up secure OpenAI API client with proper authentication
- Create a middleware service for handling OpenAI requests
- Implement prompt engineering module with templates for different content types
- Develop context generation utilities to extract relevant data for prompts
- Create API endpoints for:
  - Generating new category/subcategory intro and outro content
  - Refreshing existing content with updated data points
  - Manual trigger for content regeneration via admin panel
- Implement error handling, retry logic, and fallback mechanisms
- Set up monitoring for API usage and costs

## 6. Admin Panel

### 6.1 Admin Interface
- Secure login for administrators
- Dashboard with key metrics
- CRUD operations for all content
- Batch operations for data management
- Image upload and management
- Review moderation (if applicable)
- AI Content Management:
  - Preview AI-generated intros and outros before publishing
  - Edit/refine AI-generated content
  - Manual triggering of content generation
  - View history of previously generated content
  - Set schedule for periodic content refreshes
  - Configure prompt templates and parameters

## 7. SEO and Performance Optimization

### 7.1 SEO Implementation
- Server-side rendering or static generation for core pages
- Dynamic metadata for all pages
- Structured data (Schema.org) for places and categories
- XML sitemap generation
- Canonical URLs for duplicate content

### 7.2 Performance
- Image optimization pipeline
- Code splitting
- Lazy loading of images and components
- Caching strategy
- Core Web Vitals optimization

## 8. Testing

### 8.1 Testing Strategy
- Unit tests for components and utilities
- Integration tests for API endpoints
- End-to-end tests for critical user flows
- Responsive design testing
- Cross-browser compatibility testing
- Performance testing

## 9. Deployment and Infrastructure

### 9.1 Deployment Setup
- Vercel deployment for Next.js frontend
- Supabase project configuration
- Environment variables management
- CI/CD pipeline setup

### 9.2 Monitoring and Maintenance
- Error tracking (Sentry)
- Analytics implementation (Google Analytics or Plausible)
- Backup strategy
- Regular updates and maintenance schedule

## 10. Future Enhancements

### 10.1 Potential Features for V2
- User accounts and personalization
- User-generated reviews and ratings
- Itinerary builder for tourists
- Integration with booking/reservation systems
- Mobile app development
- Advanced filtering and search capabilities
- Multilingual support

## 11. Timeline and Milestones

### Phase 1: Setup and Planning (2 weeks)
- Project setup
- Database design
- API design

### Phase 2: Data Migration (2 weeks)
- Parse existing JSON data
- Import data to Supabase
- Image processing and storage

### Phase 3: Core Frontend Development (4 weeks)
- Homepage and navigation
- Listings pages
- Detail pages
- Search functionality

### Phase 4: Admin and Advanced Features (2 weeks)
- Admin interface
- Maps integration
- Advanced filtering

### Phase 5: Testing and Optimization (2 weeks)
- QA testing
- Performance optimization
- SEO implementation

### Phase 6: Launch Preparation (1 week)
- Final testing
- Deployment
- Documentation

Total estimated timeline: 13 weeks (approximately 3 months) 