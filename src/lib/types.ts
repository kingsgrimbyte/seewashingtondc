// Supabase database types
export type Category = {
  id: number;
  name: string;
  description: string;
  slug: string;
  image_url: string;
  order_index: number;
  ai_intro_text?: string;
  ai_outro_text?: string;
  last_ai_update?: string;
  created_at: string;
  updated_at: string;
  count?: number; // Not in DB, calculated for UI
};

export type Subcategory = {
  id: number;
  name: string;
  description: string;
  category_id: number;
  slug: string;
  image_url: string;
  order_index: number;
  ai_intro_text?: string;
  ai_outro_text?: string;
  last_ai_update?: string;
  created_at: string;
  updated_at: string;
  count?: number; // Not in DB, calculated for UI
  categoryName?: string; // Not in DB, joined for UI
};

export interface Place {
  id: number;
  name: string;
  description: string | null;
  address: string | null;
  phone: string | null;
  website: string | null;
  rating: number | null;
  reviews_count: number | null;
  price_range: string | null;
  gps_coordinates: string | null;
  category: string;
  subcategory: string;
  categorySlug: string;
  subcategorySlug: string;
  slug: string;
  hours: Record<string, string> | null;
  images: Array<{
    id: number;
    image_url: string;
    alt_text: string | null;
  }> | null;
  amenities: Array<{
    id: number;
    name: string;
  }> | null;
  reviews: Array<{
    id: number;
    title: string;
    content: string;
    rating: number;
    author: string | null;
    created_at: string;
  }> | null;
  // Raw database fields
  subcategory_id: number;
  subcategories?: {
    id: number;
    name: string;
    slug: string;
    categories?: {
      id: number;
      name: string;
      slug: string;
    };
  };
  hours_monday?: string;
  hours_tuesday?: string;
  hours_wednesday?: string;
  hours_thursday?: string;
  hours_friday?: string;
  hours_saturday?: string;
  hours_sunday?: string;
}

export type PlaceImage = {
  id: number;
  place_id: number;
  image_url: string;
  alt_text?: string;
  is_main: boolean;
  order_index: number;
  created_at: string;
};

export type Amenity = {
  id: number;
  name: string;
  icon: string; // AppIcon key
  created_at: string;
  updated_at: string;
};

export type PlaceAmenity = {
  id: number;
  place_id: number;
  amenity_id: number;
  created_at: string;
};

export type Review = {
  id: number;
  place_id: number;
  user_id?: string;
  rating: number;
  content: string;
  created_at: string;
  updated_at: string;
};

// UI types combining DB types
export type PlaceWithDetails = Place & {
  images: PlaceImage[];
  amenities: Amenity[];
  reviews?: Review[];
  hours?: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  // Raw database fields
  subcategory_id: number;
  subcategories?: {
    id: number;
    name: string;
    slug: string;
    categories?: {
      id: number;
      name: string;
      slug: string;
    };
  };
}; 