// lib/supabase/client.ts
import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Create Supabase client with service role (for cron jobs)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Create public client (for website - read-only)
export const supabasePublic = createClient(
  supabaseUrl,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

// Types
export interface CentralSubsidy {
  id: string;
  up_to_2kw: number;
  from_2_to_3kw: number;
  above_3kw: number;
  special_category_bonus: number;
  last_updated: string;
}

export interface StateSubsidy {
  state_code: string;
  state_name: string;
  additional_subsidy: number | null;
  max_capacity_kw: number | null;
  is_special_category: boolean;
  verified: boolean;
  source_url: string | null;
}

export interface SolarPrice {
  property_type: 'residential' | 'commercial';
  average_price: number;
  min_price: number;
  max_price: number;
  scrape_date: string;
}

export interface CalculatorData {
  central_subsidy: CentralSubsidy;
  residential_price: SolarPrice;
  commercial_price: SolarPrice;
  states: StateSubsidy[];
}

/**
 * Get all calculator data in one query (optimized)
 */
export async function getCalculatorData(): Promise<CalculatorData | null> {
  try {
    const { data, error } = await supabasePublic.rpc('get_calculator_data');

    if (error) {
      console.error('Error fetching calculator data:', error);
      return null;
    }

    return data as CalculatorData;
  } catch (error) {
    console.error('Failed to get calculator data:', error);
    return null;
  }
}

/**
 * Get latest central subsidy
 */
export async function getLatestCentralSubsidy(): Promise<CentralSubsidy | null> {
  const { data, error } = await supabasePublic
    .from('central_subsidies')
    .select('*')
    .eq('is_active', true)
    .order('last_updated', { ascending: false })
    .limit(1)
    .single();

  if (error) {
    console.error('Error fetching central subsidy:', error);
    return null;
  }

  return data;
}

/**
 * Get latest solar prices
 */
export async function getLatestPrices(): Promise<{
  residential: SolarPrice | null;
  commercial: SolarPrice | null;
}> {
  const { data: residentialData } = await supabasePublic
    .from('solar_prices')
    .select('*')
    .eq('property_type', 'residential')
    .order('scrape_date', { ascending: false })
    .limit(1)
    .single();

  const { data: commercialData } = await supabasePublic
    .from('solar_prices')
    .select('*')
    .eq('property_type', 'commercial')
    .order('scrape_date', { ascending: false })
    .limit(1)
    .single();

  return {
    residential: residentialData,
    commercial: commercialData
  };
}

/**
 * Get all active state subsidies
 */
export async function getStateSubsidies(): Promise<StateSubsidy[]> {
  const { data, error } = await supabasePublic
    .from('state_subsidies')
    .select('*')
    .eq('is_active', true)
    .order('state_name');

  if (error) {
    console.error('Error fetching state subsidies:', error);
    return [];
  }

  return data || [];
}

/**
 * Get special category states (for 10% bonus)
 */
export async function getSpecialCategoryStates(): Promise<string[]> {
  const { data, error } = await supabasePublic
    .from('state_subsidies')
    .select('state_code')
    .eq('is_special_category', true)
    .eq('is_active', true);

  if (error) {
    console.error('Error fetching special category states:', error);
    return [];
  }

  return data?.map(s => s.state_code) || [];
}

/**
 * Save central subsidy data (admin only - for cron job)
 */
export async function saveCentralSubsidy(data: {
  up_to_2kw: number;
  from_2_to_3kw: number;
  above_3kw: number;
  special_category_bonus: number;
}) {
  // Deactivate old records
  await supabaseAdmin
    .from('central_subsidies')
    .update({ is_active: false })
    .eq('is_active', true);

  // Insert new record
  const { data: result, error } = await supabaseAdmin
    .from('central_subsidies')
    .insert({
      ...data,
      is_active: true
    })
    .select()
    .single();

  if (error) {
    console.error('Error saving central subsidy:', error);
    throw error;
  }

  return result;
}

/**
 * Save solar prices (admin only - for cron job)
 */
export async function saveSolarPrices(data: {
  residential: {
    average: number;
    min: number;
    max: number;
    sources: number;
    sourceNames: string[];
  };
  commercial: {
    average: number;
    min: number;
    max: number;
    sources: number;
    sourceNames: string[];
  };
}) {
  const today = new Date().toISOString().split('T')[0];

  // Delete today's records (if re-running)
  await supabaseAdmin
    .from('solar_prices')
    .delete()
    .eq('scrape_date', today);

  // Insert new records
  const { error: resError } = await supabaseAdmin
    .from('solar_prices')
    .insert({
      property_type: 'residential',
      price_per_kw: data.residential.average,
      min_price: data.residential.min,
      max_price: data.residential.max,
      total_sources: data.residential.sources,
      source_names: data.residential.sourceNames,
      scrape_date: today
    });

  const { error: comError } = await supabaseAdmin
    .from('solar_prices')
    .insert({
      property_type: 'commercial',
      price_per_kw: data.commercial.average,
      min_price: data.commercial.min,
      max_price: data.commercial.max,
      total_sources: data.commercial.sources,
      source_names: data.commercial.sourceNames,
      scrape_date: today
    });

  if (resError || comError) {
    console.error('Error saving prices:', resError || comError);
    throw resError || comError;
  }

  console.log('✅ Prices saved to Supabase');
}

/**
 * Save price history record (for analytics)
 */
export async function savePriceHistory(prices: any[]) {
  const records = prices.map(p => ({
    source_name: p.source,
    property_type: p.type,
    price_per_kw: p.pricePerKW,
    system_size_kw: p.systemSize || 1,
    includes: p.includes || [],
    scrape_date: new Date().toISOString().split('T')[0]
  }));

  const { error } = await supabaseAdmin
    .from('price_history')
    .insert(records);

  if (error) {
    console.error('Error saving price history:', error);
  }
}

/**
 * Log scraper execution (for monitoring)
 */
export async function logScraperExecution(data: {
  scraper_type: 'pm_surya_ghar' | 'prices' | 'states';
  status: 'success' | 'partial' | 'failed';
  items_scraped: number;
  errors?: string[];
  duration_ms: number;
}) {
  const { error } = await supabaseAdmin
    .from('scraper_logs')
    .insert(data);

  if (error) {
    console.error('Error logging scraper execution:', error);
  }
}

/**
 * Get price trends (for analytics dashboard - future)
 */
export async function getPriceTrends(days: number = 30) {
  const { data, error } = await supabasePublic
    .from('solar_prices')
    .select('*')
    .gte('scrape_date', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString())
    .order('scrape_date', { ascending: true });

  if (error) {
    console.error('Error fetching price trends:', error);
    return [];
  }

  return data;
}
