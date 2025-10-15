-- Supabase Database Schema for Solar Data
-- Run this SQL in your Supabase SQL Editor

-- =====================================================
-- Table 1: Central Government Subsidies (PM Surya Ghar)
-- =====================================================
CREATE TABLE IF NOT EXISTS central_subsidies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source text NOT NULL DEFAULT 'pmsuryaghar.gov.in',
  
  -- Subsidy rates
  up_to_2kw integer NOT NULL,           -- ₹30,000 per kW
  from_2_to_3kw integer NOT NULL,       -- ₹18,000 per kW
  above_3kw integer NOT NULL,           -- ₹78,000 fixed
  special_category_bonus integer NOT NULL DEFAULT 10, -- 10% extra
  
  -- Metadata
  last_updated timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now(),
  is_active boolean DEFAULT true
);

-- Index for quick lookups
CREATE INDEX IF NOT EXISTS idx_central_subsidies_active 
ON central_subsidies(is_active, last_updated DESC);

-- =====================================================
-- Table 2: State-Specific Subsidies
-- =====================================================
CREATE TABLE IF NOT EXISTS state_subsidies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- State information
  state_code text UNIQUE NOT NULL,      -- e.g., 'gujarat', 'maharashtra'
  state_name text NOT NULL,             -- e.g., 'Gujarat', 'Maharashtra'
  
  -- Subsidy details
  additional_subsidy integer,           -- Additional ₹/kW from state
  max_capacity_kw integer,              -- Max kW eligible for state subsidy
  
  -- Source & verification
  source_url text,                      -- Where data was scraped from
  verified boolean DEFAULT false,       -- Manual verification flag
  notes text,                           -- Additional information
  
  -- Special category
  is_special_category boolean DEFAULT false,  -- Gets 10% central bonus
  
  -- Metadata
  last_updated timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now(),
  is_active boolean DEFAULT true
);

-- Index for state lookups
CREATE INDEX IF NOT EXISTS idx_state_subsidies_code 
ON state_subsidies(state_code, is_active);

-- =====================================================
-- Table 3: Solar Panel Prices (Daily Updates)
-- =====================================================
CREATE TABLE IF NOT EXISTS solar_prices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Price data
  property_type text NOT NULL CHECK (property_type IN ('residential', 'commercial')),
  price_per_kw integer NOT NULL,        -- Average price per kW
  min_price integer NOT NULL,           -- Lowest price found
  max_price integer NOT NULL,           -- Highest price found
  
  -- Source information
  total_sources integer NOT NULL,       -- Number of sources scraped
  source_names text[],                  -- Array of source names
  
  -- Metadata
  scrape_date date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamp with time zone DEFAULT now()
);

-- Index for date-based queries
CREATE INDEX IF NOT EXISTS idx_solar_prices_date 
ON solar_prices(property_type, scrape_date DESC);

-- =====================================================
-- Table 4: Price History (For Analytics)
-- =====================================================
CREATE TABLE IF NOT EXISTS price_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Source and price
  source_name text NOT NULL,            -- 'IndiaMART', 'Tata Power', etc.
  property_type text NOT NULL,
  price_per_kw integer NOT NULL,
  system_size_kw integer DEFAULT 1,
  
  -- What's included
  includes text[],                      -- ['Panels', 'Inverter', 'Installation']
  
  -- Metadata
  scraped_at timestamp with time zone DEFAULT now(),
  scrape_date date NOT NULL DEFAULT CURRENT_DATE
);

-- Index for analytics
CREATE INDEX IF NOT EXISTS idx_price_history_date 
ON price_history(source_name, scrape_date DESC);

-- =====================================================
-- Table 5: Scraper Logs (Monitoring)
-- =====================================================
CREATE TABLE IF NOT EXISTS scraper_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Scraper information
  scraper_type text NOT NULL,           -- 'pm_surya_ghar', 'prices', 'states'
  status text NOT NULL,                 -- 'success', 'partial', 'failed'
  
  -- Results
  items_scraped integer DEFAULT 0,
  errors text[],                        -- Array of error messages
  
  -- Performance
  duration_ms integer,                  -- How long scraping took
  
  -- Metadata
  executed_at timestamp with time zone DEFAULT now()
);

-- Index for monitoring
CREATE INDEX IF NOT EXISTS idx_scraper_logs_recent 
ON scraper_logs(scraper_type, executed_at DESC);

-- =====================================================
-- Views for Easy Querying
-- =====================================================

-- Latest central subsidy
CREATE OR REPLACE VIEW latest_central_subsidy AS
SELECT * FROM central_subsidies
WHERE is_active = true
ORDER BY last_updated DESC
LIMIT 1;

-- Latest price averages
CREATE OR REPLACE VIEW latest_prices AS
SELECT DISTINCT ON (property_type)
  property_type,
  price_per_kw AS average_price,
  min_price,
  max_price,
  total_sources,
  scrape_date
FROM solar_prices
ORDER BY property_type, scrape_date DESC;

-- Active state subsidies with special category info
CREATE OR REPLACE VIEW active_state_subsidies AS
SELECT 
  state_code,
  state_name,
  additional_subsidy,
  max_capacity_kw,
  is_special_category,
  verified,
  source_url,
  last_updated
FROM state_subsidies
WHERE is_active = true
ORDER BY state_name;

-- =====================================================
-- Functions
-- =====================================================

-- Function to get calculator data in one query
CREATE OR REPLACE FUNCTION get_calculator_data()
RETURNS json AS $$
DECLARE
  result json;
BEGIN
  SELECT json_build_object(
    'central_subsidy', (
      SELECT row_to_json(c)
      FROM (
        SELECT up_to_2kw, from_2_to_3kw, above_3kw, special_category_bonus, last_updated
        FROM latest_central_subsidy
      ) c
    ),
    'residential_price', (
      SELECT row_to_json(p)
      FROM (
        SELECT average_price, min_price, max_price, scrape_date
        FROM latest_prices
        WHERE property_type = 'residential'
      ) p
    ),
    'commercial_price', (
      SELECT row_to_json(p)
      FROM (
        SELECT average_price, min_price, max_price, scrape_date
        FROM latest_prices
        WHERE property_type = 'commercial'
      ) p
    ),
    'states', (
      SELECT json_agg(row_to_json(s))
      FROM active_state_subsidies s
    )
  ) INTO result;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- Row Level Security (RLS) - Public Read Access
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE central_subsidies ENABLE ROW LEVEL SECURITY;
ALTER TABLE state_subsidies ENABLE ROW LEVEL SECURITY;
ALTER TABLE solar_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE price_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE scraper_logs ENABLE ROW LEVEL SECURITY;

-- Allow public read access (for website)
CREATE POLICY "Public read access" ON central_subsidies
  FOR SELECT USING (true);

CREATE POLICY "Public read access" ON state_subsidies
  FOR SELECT USING (true);

CREATE POLICY "Public read access" ON solar_prices
  FOR SELECT USING (true);

CREATE POLICY "Public read access" ON price_history
  FOR SELECT USING (true);

CREATE POLICY "Public read access" ON scraper_logs
  FOR SELECT USING (true);

-- Only service role can insert/update (for cron job)
-- This is handled by Supabase service role key

-- =====================================================
-- Sample Data (for testing)
-- =====================================================

-- Insert current PM Surya Ghar subsidy
INSERT INTO central_subsidies (
  up_to_2kw,
  from_2_to_3kw,
  above_3kw,
  special_category_bonus
) VALUES (
  30000,  -- ₹30,000/kW up to 2kW
  18000,  -- ₹18,000/kW from 2-3kW
  78000,  -- ₹78,000 fixed above 3kW
  10      -- 10% special category bonus
);

-- Insert special category states
INSERT INTO state_subsidies (state_code, state_name, is_special_category, verified) VALUES
('arunachal-pradesh', 'Arunachal Pradesh', true, true),
('assam', 'Assam', true, true),
('manipur', 'Manipur', true, true),
('meghalaya', 'Meghalaya', true, true),
('mizoram', 'Mizoram', true, true),
('nagaland', 'Nagaland', true, true),
('sikkim', 'Sikkim', true, true),
('tripura', 'Tripura', true, true),
('himachal-pradesh', 'Himachal Pradesh', true, true),
('uttarakhand', 'Uttarakhand', true, true),
('jammu-kashmir', 'Jammu & Kashmir', true, true),
('ladakh', 'Ladakh', true, true),
('andaman-nicobar', 'Andaman & Nicobar Islands', true, true),
('lakshadweep', 'Lakshadweep', true, true);

-- Insert sample price data
INSERT INTO solar_prices (
  property_type,
  price_per_kw,
  min_price,
  max_price,
  total_sources,
  source_names
) VALUES 
('residential', 45000, 40000, 55000, 3, ARRAY['IndiaMART', 'Tata Power', 'Luminous']),
('commercial', 50000, 45000, 60000, 2, ARRAY['IndiaMART', 'Tata Power']);

-- =====================================================
-- Success Message
-- =====================================================
DO $$
BEGIN
  RAISE NOTICE '✅ Supabase database schema created successfully!';
  RAISE NOTICE '';
  RAISE NOTICE '📊 Tables created:';
  RAISE NOTICE '  1. central_subsidies - PM Surya Ghar data';
  RAISE NOTICE '  2. state_subsidies - State-specific subsidies';
  RAISE NOTICE '  3. solar_prices - Daily price averages';
  RAISE NOTICE '  4. price_history - Individual price records';
  RAISE NOTICE '  5. scraper_logs - Monitoring & debugging';
  RAISE NOTICE '';
  RAISE NOTICE '🔍 Views created:';
  RAISE NOTICE '  - latest_central_subsidy';
  RAISE NOTICE '  - latest_prices';
  RAISE NOTICE '  - active_state_subsidies';
  RAISE NOTICE '';
  RAISE NOTICE '⚡ Function created:';
  RAISE NOTICE '  - get_calculator_data() - Returns all data in one call';
  RAISE NOTICE '';
  RAISE NOTICE '🔒 Row Level Security enabled with public read access';
  RAISE NOTICE '';
  RAISE NOTICE '📝 Sample data inserted for testing';
  RAISE NOTICE '';
  RAISE NOTICE '🚀 Next steps:';
  RAISE NOTICE '  1. Get Supabase URL and service role key';
  RAISE NOTICE '  2. Add to Vercel environment variables';
  RAISE NOTICE '  3. Test with: SELECT get_calculator_data();';
END $$;
