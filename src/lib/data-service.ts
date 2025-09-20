import { supabase } from './supabase';
import { Category, Subcategory, Place, PlaceWithDetails, PlaceImage, Amenity } from './types';

// Categories
export async function getCategories(): Promise<Category[]> {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*, subcategories(count)')
      .order('order_index');
      
    if (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
    
    if (!data || data.length === 0) {
      console.warn('No categories found in the database');
      return [];
    }
    
    // Transform to include count from subcategories
    return data.map((category: any) => ({
      ...category,
      count: category.subcategories?.reduce((acc: number, curr: any) => acc + (curr.count || 0), 0) || 0
    }));
  } catch (error) {
    console.error('Unexpected error fetching categories:', error);
    return [];
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    if (!slug) {
      console.error('getCategoryBySlug called with empty slug');
      return null;
    }

    // First get the basic category data
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .maybeSingle(); // Use maybeSingle instead of single to avoid throwing on not found
    
    if (error) {
      console.error(`Error fetching category with slug "${slug}":`, error);
      return null;
    }

    if (!data) {
      return null;
    }
    
    // Cast data as Category to ensure it has all required properties
    const category = data as Category;
    
    // Separately fetch subcategories to count them
    const { data: subcategories, error: subcategoriesError } = await supabase
      .from('subcategories')
      .select('places(count)')
      .eq('category_id', category.id);
      
    if (subcategoriesError) {
      console.error(`Error fetching subcategories for category ${slug}:`, subcategoriesError);
    }
    
    // Add the count property safely by handling the subcategories array with proper type checking
    let count = 0;
    if (subcategories && Array.isArray(subcategories)) {
      count = subcategories.reduce((acc: number, curr: any) => {
        const placesLength = curr.places?.length || 0;
        return acc + placesLength;
      }, 0);
    }
    
    category.count = count;
    
    return category;
  } catch (error) {
    console.error(`Unexpected error fetching category with slug "${slug}":`, error);
    return null;
  }
}

// Subcategories
export async function getSubcategories(categoryId?: number): Promise<Subcategory[]> {
  let query = supabase
    .from('subcategories')
    .select('*, categories(name), places(count)')
    .order('order_index');
    
  if (categoryId) {
    query = query.eq('category_id', categoryId);
  }
  
  const { data, error } = await query;
    
  if (error) {
    console.error('Error fetching subcategories:', error);
    return [];
  }
  
  // Transform data to match our type
  return data.map((subcategory: any) => ({
    ...subcategory,
    categoryName: subcategory.categories?.name,
    count: subcategory.places.length
  }));
}

export async function getSubcategoriesByCategorySlug(categorySlug: string): Promise<Subcategory[]> {
  try {
    const { data, error } = await supabase
      .from('subcategories')
      .select('*, categories!inner(slug), places(count)')
      .eq('categories.slug', categorySlug)
      .order('order_index');
      
    if (error) {
      console.error(`Error fetching subcategories for category ${categorySlug}:`, error);
      return [];
    }
    
    if (!data || data.length === 0) {
      console.log(`No subcategories found for category ${categorySlug}`);
      return [];
    }
    
    // Transform data to match our type
    return data.map((subcategory: any) => ({
      ...subcategory,
      categoryName: subcategory.categories?.name,
      count: subcategory.places.length
    }));
  } catch (error) {
    console.error(`Unexpected error fetching subcategories for category ${categorySlug}:`, error);
    return [];
  }
}

export async function getSubcategoryBySlug(slug: string): Promise<Subcategory | null> {
  try {
    // First check if a subcategory with this slug exists
    const { data, error } = await supabase
      .from('subcategories')
      .select('*, categories(name, slug)')
      .eq('slug', slug)
      .maybeSingle(); // Use maybeSingle instead of single to avoid throwing on not found
    
    if (error) {
      console.error(`Error fetching subcategory with slug ${slug}:`, error);
      return null;
    }
    
    if (!data) {
      console.log(`No subcategory found with slug ${slug}`);
      return null;
    }
    
    // Use type assertion to handle the nested categories data
    const subcategory = data as any;
    const categoryName = subcategory.categories?.name;
    const categorySlug = subcategory.categories?.slug;
    
    // Create a properly typed Subcategory object
    const result: Subcategory = {
      ...subcategory,
      categoryName,
      categorySlug
    };
    
    // Remove categories property to avoid type issues
    delete (result as any).categories;
    
    return result;
  } catch (error) {
    console.error(`Unexpected error fetching subcategory with slug ${slug}:`, error);
    return null;
  }
}

// Places
export async function getPlaces(subcategoryId?: number, limit?: number): Promise<Place[]> {
  let query = supabase
    .from('places')
    .select(`
      *,
      subcategories(name, slug, categories(name, slug)),
      images:place_images(*)
    `)
    .order('rating', { ascending: false });
    
  if (subcategoryId) {
    query = query.eq('subcategory_id', subcategoryId);
  }
  
  if (limit) {
    query = query.limit(limit);
  }
  
  const { data, error } = await query;
    
  if (error) {
    console.error('Error fetching places:', error);
    return [];
  }
  
  // Transform data to match our type
  return data.map((place: any) => ({
    ...place,
    subcategory: place.subcategories?.name,
    subcategorySlug: place.subcategories?.slug,
    category: place.subcategories?.categories?.name,
    categorySlug: place.subcategories?.categories?.slug,
    images: place.images || []
  }));
}

export async function getFeaturedPlaces(limit: number = 6): Promise<Place[]> {
  const { data, error } = await supabase
    .from('places')
    .select(`
      *,
      subcategories(name, slug, categories(name, slug)),
      images:place_images(*)
    `)
    .order('rating', { ascending: false })
    .limit(limit);
    
  if (error) {
    console.error('Error fetching featured places:', error);
    return [];
  }
  
  // Transform data to match our type and ensure valid slugs
  return data.map((place: any) => {
    // Generate a valid slug if one doesn't exist
    const validSlug = place.slug || generateSlug(place.name);
    const validCategorySlug = place.subcategories?.categories?.slug ? generateSlug(place.subcategories.categories.slug) : '';
    const validSubcategorySlug = place.subcategories?.slug ? generateSlug(place.subcategories.slug) : '';

    return {
      ...place,
      subcategory: place.subcategories?.name || '',
      subcategorySlug: validSubcategorySlug,
      category: place.subcategories?.categories?.name || '',
      categorySlug: validCategorySlug,
      images: place.images || [],
      slug: validSlug
    };
  });
}

export async function getFeaturedPlacesByCategory(categorySlug: string, limit: number = 6): Promise<Place[]> {
  const { data, error } = await supabase
    .from('places')
    .select(`
      *,
      subcategories!inner(name, slug, categories!inner(name, slug)),
      images:place_images(*)
    `)
    .eq('subcategories.categories.slug', categorySlug)
    .order('rating', { ascending: false })
    .limit(limit);
    
  if (error) {
    console.error(`Error fetching featured places for category ${categorySlug}:`, error);
    return [];
  }
  
  // Transform data to match our type and ensure valid slugs
  return data.map((place: any) => {
    // Generate a valid slug if one doesn't exist
    const validSlug = place.slug || generateSlug(place.name);
    const validCategorySlug = place.subcategories?.categories?.slug ? generateSlug(place.subcategories.categories.slug) : '';
    const validSubcategorySlug = place.subcategories?.slug ? generateSlug(place.subcategories.slug) : '';

    return {
      ...place,
      subcategory: place.subcategories?.name || '',
      subcategorySlug: validSubcategorySlug,
      category: place.subcategories?.categories?.name || '',
      categorySlug: validCategorySlug,
      images: place.images || [],
      slug: validSlug
    };
  });
}

export async function getPlacesBySubcategorySlug(subcategorySlug: string): Promise<Place[]> {
  try {
    // Decode the subcategory slug to handle special characters
    const decodedSlug = decodeURIComponent(subcategorySlug).replace(/\+/g, '-');
    
    const { data, error } = await supabase
      .from('places')
      .select(`
        *,
        subcategories!inner(name, slug, categories(name, slug)),
        images:place_images(*)
      `)
      .eq('subcategories.slug', decodedSlug)
      .order('rating', { ascending: false });
      
    if (error) {
      console.error(`Error fetching places for subcategory ${decodedSlug}:`, error);
      return [];
    }
    
    if (!data || data.length === 0) {
      console.log(`No places found for subcategory ${decodedSlug}`);
      return [];
    }
    
    // Transform data to match our type and ensure valid slugs
    return data.map((place: any) => {
      // Generate a valid slug if one doesn't exist
      const validSlug = place.slug || generateSlug(place.name);
      const validCategorySlug = place.subcategories?.categories?.slug ? generateSlug(place.subcategories.categories.slug) : '';
      const validSubcategorySlug = place.subcategories?.slug ? generateSlug(place.subcategories.slug) : '';

      return {
        ...place,
        subcategory: place.subcategories?.name || '',
        subcategorySlug: validSubcategorySlug,
        category: place.subcategories?.categories?.name || '',
        categorySlug: validCategorySlug,
        images: place.images || [],
        slug: validSlug
      };
    });
  } catch (error) {
    console.error(`Unexpected error fetching places for subcategory ${subcategorySlug}:`, error);
    return [];
  }
}

// Helper function to normalize text for comparison
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s&]/g, '') // Keep & symbol but remove other special chars
    .replace(/\s+/g, ' ')     // Normalize spaces
    .trim();
}

// Helper function to generate a valid URL-safe slug
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')     // Replace spaces with hyphens
    .replace(/-+/g, '-')      // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

export async function getPlacesByCategorySlug(categorySlug: string): Promise<Place[]> {
  const { data, error } = await supabase
    .from('places')
    .select(`
      *,
      subcategories!inner(name, slug, categories!inner(name, slug)),
      images:place_images(*)
    `)
    .eq('subcategories.categories.slug', categorySlug)
    .order('rating', { ascending: false });
    
  if (error) {
    console.error(`Error fetching places for category ${categorySlug}:`, error);
    return [];
  }
  
  // Transform data to match our type and ensure valid slugs
  return data.map((place: any) => {
    // Generate a valid slug if one doesn't exist
    const validSlug = place.slug || generateSlug(place.name);
    const validCategorySlug = place.subcategories?.categories?.slug ? generateSlug(place.subcategories.categories.slug) : '';
    const validSubcategorySlug = place.subcategories?.slug ? generateSlug(place.subcategories.slug) : '';

    return {
      ...place,
      subcategory: place.subcategories?.name || '',
      subcategorySlug: validSubcategorySlug,
      category: place.subcategories?.categories?.name || '',
      categorySlug: validCategorySlug,
      images: place.images || [],
      slug: validSlug
    };
  });
}

export async function getPlaceById(id: number): Promise<PlaceWithDetails | null> {
  // Get place details
  const { data: place, error: placeError } = await supabase
    .from('places')
    .select(`
      *,
      subcategories(name, slug, categories(name, slug))
    `)
    .eq('id', id)
    .single();
    
  if (placeError) {
    console.error(`Error fetching place with id ${id}:`, placeError);
    return null;
  }
  
  // Cast to any to handle the type errors with Supabase relations
  const typedPlace = place as any;
  
  // Get place images
  const { data: images, error: imagesError } = await supabase
    .from('place_images')
    .select('*')
    .eq('place_id', typedPlace.id)
    .order('order_index');
    
  if (imagesError) {
    console.error(`Error fetching images for place ${id}:`, imagesError);
  }
  
  // Get place amenities
  const { data: amenities, error: amenitiesError } = await supabase
    .from('place_amenities')
    .select('amenities(*)')
    .eq('place_id', typedPlace.id);
    
  if (amenitiesError) {
    console.error(`Error fetching amenities for place ${id}:`, amenitiesError);
  }
  
  // Transform hours into a more usable object
  const hours = {
    monday: typedPlace.hours_monday || 'Closed',
    tuesday: typedPlace.hours_tuesday || 'Closed',
    wednesday: typedPlace.hours_wednesday || 'Closed',
    thursday: typedPlace.hours_thursday || 'Closed',
    friday: typedPlace.hours_friday || 'Closed',
    saturday: typedPlace.hours_saturday || 'Closed',
    sunday: typedPlace.hours_sunday || 'Closed'
  };
  
  // Transform data to match our PlaceWithDetails type
  return {
    ...typedPlace,
    subcategory: typedPlace.subcategories?.name || null,
    subcategorySlug: typedPlace.subcategories?.slug || null,
    category: typedPlace.subcategories?.categories?.name || null,
    categorySlug: typedPlace.subcategories?.categories?.slug || null,
    images: images ? (images as PlaceImage[]).map((img: PlaceImage) => ({
      id: img.id,
      image_url: img.image_url,
      alt_text: img.alt_text || null
    })) : [],
    amenities: amenities?.map((item: any) => item.amenities) || [],
    hours
  };
}

export async function getPlaceBySlug(placeSlug: string): Promise<PlaceWithDetails | null> {
  try {
    // Make sure the slug is properly decoded and normalized
    const decodedSlug = decodeURIComponent(placeSlug);
    const normalizedSlug = generateSlug(decodedSlug);
    
    // First try direct match if slug exists in database
    const { data: placeBySlug, error: placeSlugError } = await supabase
      .from('places')
      .select(`
        *,
        subcategories(name, slug, categories(name, slug))
      `)
      .eq('slug', normalizedSlug)
      .maybeSingle();
      
    if (placeBySlug) {
      // We found it by slug, use this result
      // Cast to any to handle the type errors with Supabase relations
      const place = placeBySlug as any;
      
      // Get place images
      const { data: images, error: imagesError } = await supabase
        .from('place_images')
        .select('*')
        .eq('place_id', place.id)
        .order('order_index');
        
      if (imagesError) {
        console.error(`Error fetching images for place ${place.id}:`, imagesError);
      }
      
      // Get place amenities
      const { data: amenities, error: amenitiesError } = await supabase
        .from('place_amenities')
        .select('amenities(*)')
        .eq('place_id', place.id);
        
      if (amenitiesError) {
        console.error(`Error fetching amenities for place ${place.id}:`, amenitiesError);
      }
      
      // Transform hours into a more usable object
      const hours = {
        monday: place.hours_monday || 'Closed',
        tuesday: place.hours_tuesday || 'Closed',
        wednesday: place.hours_wednesday || 'Closed',
        thursday: place.hours_thursday || 'Closed',
        friday: place.hours_friday || 'Closed',
        saturday: place.hours_saturday || 'Closed',
        sunday: place.hours_sunday || 'Closed'
      };
      
      // Transform data to match our PlaceWithDetails type
      return {
        ...place,
        subcategory: place.subcategories?.name || null,
        subcategorySlug: place.subcategories?.slug || null,
        category: place.subcategories?.categories?.name || null,
        categorySlug: place.subcategories?.categories?.slug || null,
        images: images ? (images as PlaceImage[]).map((img: PlaceImage) => ({
          id: img.id,
          image_url: img.image_url,
          alt_text: img.alt_text || null
        })) : [],
        amenities: amenities?.map((item: any) => item.amenities) || [],
        hours,
      };
    }
    
    // If not found by direct slug match, try to convert slug to a name and search by name
    const potentialName = decodedSlug
      .split(/[-_]+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    // Try exact name match with normalized comparison
    const normalizedName = normalizeText(potentialName);
    const { data: exactMatches, error: exactMatchError } = await supabase
      .from('places')
      .select(`
        *,
        subcategories(name, slug, categories(name, slug))
      `)
      .or(`name.ilike.${potentialName},name.ilike.${normalizedName}`);
      
    if (exactMatches && exactMatches.length > 0) {
      // Found an exact match
      // Cast to any to handle the type errors with Supabase relations
      const place = exactMatches[0] as any;
      
      // Get place images, amenities, and prepare hours as before
      const { data: images } = await supabase
        .from('place_images')
        .select('*')
        .eq('place_id', place.id)
        .order('order_index');
        
      const { data: amenities } = await supabase
        .from('place_amenities')
        .select('amenities(*)')
        .eq('place_id', place.id);
        
      const hours = {
        monday: place.hours_monday || 'Closed',
        tuesday: place.hours_tuesday || 'Closed',
        wednesday: place.hours_wednesday || 'Closed',
        thursday: place.hours_thursday || 'Closed',
        friday: place.hours_friday || 'Closed',
        saturday: place.hours_saturday || 'Closed',
        sunday: place.hours_sunday || 'Closed'
      };
      
      // Generate a slug if needed
      const slug = place.slug || generateSlug(place.name);
      
      return {
        ...place,
        subcategory: place.subcategories?.name || null,
        subcategorySlug: place.subcategories?.slug || null,
        category: place.subcategories?.categories?.name || null,
        categorySlug: place.subcategories?.categories?.slug || null,
        images: images ? (images as PlaceImage[]).map((img: PlaceImage) => ({
          id: img.id,
          image_url: img.image_url,
          alt_text: img.alt_text || null
        })) : [],
        amenities: amenities?.map((item: any) => item.amenities) || [],
        hours,
        slug
      };
    }
    
    // If still not found, try a fuzzy search with multiple variations
    // Create variations of the name for fuzzy matching
    const nameVariations = [
      potentialName,
      potentialName.replace(/\s+and\s+/i, ' & '),
      potentialName.replace(/\s+&\s+/i, ' and '),
      normalizedName
    ];
    
    // Build the OR conditions for fuzzy search
    const fuzzyConditions = nameVariations
      .map(variation => `name.ilike.%${variation}%`)
      .join(',');
    
    const { data: fuzzyMatches, error: placesError } = await supabase
      .from('places')
      .select(`
        *,
        subcategories(name, slug, categories(name, slug))
      `)
      .or(fuzzyConditions)
      .order('name');
      
    if (placesError) {
      console.error(`Error in fuzzy search for ${potentialName}:`, placesError);
      return null;
    }
    
    let places = fuzzyMatches;
    
    if (!places || places.length === 0) {
      // Try one last attempt with a more lenient search
      const words = normalizedName.split(' ').filter(word => word.length > 2);
      if (words.length > 1) {
        const lenientConditions = words
          .map(word => `name.ilike.%${word}%`)
          .join(',');
        
        const { data: lenientMatches, error: lenientError } = await supabase
          .from('places')
          .select(`
            *,
            subcategories(name, slug, categories(name, slug))
          `)
          .or(lenientConditions)
          .order('name');
          
        if (!lenientError && lenientMatches && lenientMatches.length > 0) {
          places = lenientMatches;
        } else {
          console.error(`No places found with name similar to ${potentialName}`);
          return null;
        }
      } else {
        console.error(`No places found with name similar to ${potentialName}`);
        return null;
      }
    }
    
    // Take the first matching place
    // Cast to any to handle the type errors with Supabase relations
    const place = places[0] as any;
    
    // Get place images
    const { data: images, error: imagesError } = await supabase
      .from('place_images')
      .select('*')
      .eq('place_id', place.id)
      .order('order_index');
      
    if (imagesError) {
      console.error(`Error fetching images for place ${place.id}:`, imagesError);
    }
    
    // Get place amenities
    const { data: amenities, error: amenitiesError } = await supabase
      .from('place_amenities')
      .select('amenities(*)')
      .eq('place_id', place.id);
      
    if (amenitiesError) {
      console.error(`Error fetching amenities for place ${place.id}:`, amenitiesError);
    }
    
    // Transform hours into a more usable object
    const hours = {
      monday: place.hours_monday || 'Closed',
      tuesday: place.hours_tuesday || 'Closed',
      wednesday: place.hours_wednesday || 'Closed',
      thursday: place.hours_thursday || 'Closed',
      friday: place.hours_friday || 'Closed',
      saturday: place.hours_saturday || 'Closed',
      sunday: place.hours_sunday || 'Closed'
    };
    
    // Generate a slug from the name
    const slug = place.slug || generateSlug(place.name);
    
    // Transform data to match our PlaceWithDetails type
    return {
      ...place,
      subcategory: place.subcategories?.name || null,
      subcategorySlug: place.subcategories?.slug || null,
      category: place.subcategories?.categories?.name || null,
      categorySlug: place.subcategories?.categories?.slug || null,
      images: images ? (images as PlaceImage[]).map((img: PlaceImage) => ({
        id: img.id,
        image_url: img.image_url,
        alt_text: img.alt_text || null
      })) : [],
      amenities: amenities?.map((item: any) => item.amenities) || [],
      hours,
      slug
    };
  } catch (error: unknown) {
    let errorMessage: string;
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    } else {
      errorMessage = JSON.stringify(error);
    }
    console.error(`Unexpected error in getPlaceBySlug:`, error);
    return null;
  }
  // Ensure function always returns a value
  return null;
}

// Function to get related places within same subcategory
export async function getRelatedPlaces(placeId: string | number, subcategoryId: string | number, limit: number = 3): Promise<Place[]> {
  try {
    const { data, error } = await supabase
      .from('places')
      .select(`
        *,
        subcategories(name, slug, categories(name, slug)),
        images:place_images(*)
      `)
      .eq('subcategory_id', subcategoryId)
      .not('id', 'eq', placeId)
      .order('rating', { ascending: false })
      .limit(limit);
      
    if (error) {
      console.error(`Error fetching related places for place ${placeId}:`, error);
      return [];
    }
    
    // Transform data to match our type
    return data.map((place: any) => {
      // Generate a slug from the name if it doesn't exist
      const slug = place.slug || generateSlug(place.name);
      const categorySlug = place.subcategories?.categories?.slug || generateSlug(place.subcategories?.categories?.name || '');
      
      return {
        ...place,
        subcategory: place.subcategories?.name,
        subcategorySlug: place.subcategories?.slug,
        category: place.subcategories?.categories?.name,
        categorySlug: categorySlug,
        images: place.images || [],
        slug: slug
      };
    });
  } catch (error) {
    console.error(`Error in getRelatedPlaces:`, error);
    return [];
  }
}

// Search
export async function searchPlaces(query: string): Promise<Place[]> {
  const { data, error } = await supabase
    .from('places')
    .select(`
      *,
      subcategories(name, slug, categories(name, slug))
    `)
    .textSearch('name', query, { 
      type: 'websearch',
      config: 'english'
    })
    .order('rating', { ascending: false });
    
  if (error) {
    console.error(`Error searching places with query "${query}":`, error);
    return [];
  }
  
  // Transform data to match our type
  return data.map((place: any) => ({
    ...place,
    subcategory: place.subcategories?.name,
    subcategorySlug: place.subcategories?.slug,
    category: place.subcategories?.categories?.name,
    categorySlug: place.subcategories?.categories?.slug
  }));
}

// Function to check if we have any places in the database
export async function checkPlaces(): Promise<{ count: number; places: any[] }> {
  const { data, error } = await supabase
    .from('places')
    .select('id, name, slug, subcategories(name, slug, categories(name, slug))')
    .is('slug', null);
    
  if (error) {
    console.error('Error checking places:', error);
    return { count: 0, places: [] };
  }
  
  return { count: data?.length || 0, places: data || [] };
}

export async function fixMissingSlugs(): Promise<{ updated: number; errors: string[] }> {
  const errors: string[] = [];
  let updated = 0;
  
  try {
    // Get all places without slugs
    const { data: placesWithoutSlugs, error: fetchError } = await supabase
      .from('places')
      .select('id, name, slug')
      .is('slug', null);
      
    if (fetchError) {
      errors.push(`Error fetching places without slugs: ${fetchError.message}`);
      return { updated: 0, errors };
    }
    
    if (!placesWithoutSlugs || placesWithoutSlugs.length === 0) {
      return { updated: 0, errors: [] };
    }
    // Explicitly type the array
    const typedPlaces: { id: string; name: string }[] = placesWithoutSlugs as { id: string; name: string }[];
    // Update each place with a generated slug
    for (const place of typedPlaces) {
      if (!place.name) {
        errors.push(`Place ${place.id} has no name`);
        continue;
      }
      const newSlug = generateSlug(place.name);
      const { error: updateError } = await supabase
        .from('places')
        .update({ slug: newSlug })
        .eq('id', place.id);
      if (updateError) {
        errors.push(`Error updating place ${place.id} (${place.name}): ${updateError.message}`);
      } else {
        updated++;
      }
    }
    
    return { updated, errors };
  } catch (error: unknown) {
    let errorMessage: string;
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    } else {
      errorMessage = JSON.stringify(error);
    }
    errors.push(`Unexpected error: ${errorMessage}`);
    return { updated: 0, errors };
  }
} 