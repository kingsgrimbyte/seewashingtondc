-- Add slug column to the places table
ALTER TABLE public.places ADD COLUMN slug character varying(255);

-- Create a function to generate a slug from the name
CREATE OR REPLACE FUNCTION generate_slug(name text) RETURNS text AS $$
DECLARE
  slug text;
BEGIN
  -- First, replace ampersands and other common symbols with appropriate text
  slug := regexp_replace(name, '&', 'and', 'g');
  
  -- Then normalize: convert to lowercase, remove special characters, replace spaces with hyphens
  slug := lower(regexp_replace(regexp_replace(slug, '[^a-zA-Z0-9\s-]', '', 'g'), '\s+', '-', 'g'));
  
  -- Remove leading and trailing hyphens
  slug := regexp_replace(slug, '^-+|-+$', '', 'g');
  
  RETURN slug;
END;
$$ LANGUAGE plpgsql;

-- Update existing places with slugs generated from their names
UPDATE public.places SET slug = generate_slug(name) WHERE slug IS NULL;

-- Check for duplicates and make them unique by appending a number if needed
DO $$
DECLARE
  duplicate_record RECORD;
  new_slug TEXT;
  counter INTEGER;
BEGIN
  FOR duplicate_record IN 
    SELECT string_agg(id::text, ',') as ids, slug, count(*) 
    FROM public.places 
    GROUP BY slug 
    HAVING count(*) > 1
  LOOP
    counter := 1;
    FOR id IN SELECT unnest(string_to_array(duplicate_record.ids, ','))
    LOOP
      IF counter > 1 THEN
        new_slug := duplicate_record.slug || '-' || counter;
        EXECUTE 'UPDATE public.places SET slug = $1 WHERE id = $2' USING new_slug, id::uuid;
      END IF;
      counter := counter + 1;
    END LOOP;
  END LOOP;
END $$;

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_places_slug ON public.places USING btree (slug) TABLESPACE pg_default;

-- Make slug NOT NULL and add a unique constraint
ALTER TABLE public.places ALTER COLUMN slug SET NOT NULL;
ALTER TABLE public.places ADD CONSTRAINT places_slug_unique UNIQUE (slug); 