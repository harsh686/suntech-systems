// app/api/cron/update-data/route.ts
/**
 * Vercel Cron Job: Daily Solar Data Update
 * 
 * Runs daily at 2 AM IST to:
 * 1. Scrape PM Surya Ghar for subsidy updates
 * 2. Scrape solar panel prices from multiple sources
 * 3. Calculate averages and store in Supabase
 * 4. Log execution for monitoring
 * 
 * Endpoint: /api/cron/update-data
 * Schedule: 0 2 * * * (Daily at 2 AM IST)
 */

import { NextRequest, NextResponse } from 'next/server';
import { scrapePMSuryaGhar } from '@/lib/scrapers/pmsuryaghar-scraper';
import { scrapeAllPrices } from '@/lib/scrapers/solar-price-scraper';
import {
  saveCentralSubsidy,
  saveSolarPrices,
  savePriceHistory,
  logScraperExecution
} from '@/lib/supabase/client';

export const maxDuration = 300; // 5 minutes max (Vercel limit)
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const startTime = Date.now();
  
  console.log('🚀 Cron job started:', new Date().toISOString());

  try {
    // Security: Verify cron secret
    const authHeader = request.headers.get('authorization');
    const expectedAuth = `Bearer ${process.env.CRON_SECRET}`;

    if (authHeader !== expectedAuth) {
      console.error('❌ Unauthorized cron job attempt');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const results = {
      subsidies: null as any,
      prices: null as any,
      errors: [] as string[]
    };

    // ========================================
    // Step 1: Scrape PM Surya Ghar Subsidies
    // ========================================
    console.log('\n📋 Step 1: Scraping PM Surya Ghar subsidies...');
    
    try {
      const subsidyData = await scrapePMSuryaGhar();
      
      // Save to Supabase
      await saveCentralSubsidy({
        up_to_2kw: subsidyData.centralSubsidy.upTo2kW,
        from_2_to_3kw: subsidyData.centralSubsidy.from2To3kW,
        above_3kw: subsidyData.centralSubsidy.above3kW,
        special_category_bonus: subsidyData.centralSubsidy.specialCategoryBonus
      });

      results.subsidies = subsidyData;
      console.log('✅ Subsidies scraped and saved');

      // Log success
      await logScraperExecution({
        scraper_type: 'pm_surya_ghar',
        status: 'success',
        items_scraped: 1,
        duration_ms: Date.now() - startTime
      });

    } catch (error: any) {
      console.error('❌ Subsidy scraping failed:', error.message);
      results.errors.push(`Subsidy scraping: ${error.message}`);
      
      // Log failure
      await logScraperExecution({
        scraper_type: 'pm_surya_ghar',
        status: 'failed',
        items_scraped: 0,
        errors: [error.message],
        duration_ms: Date.now() - startTime
      });
    }

    // ========================================
    // Step 2: Scrape Solar Panel Prices
    // ========================================
    console.log('\n💰 Step 2: Scraping solar panel prices...');
    
    try {
      const priceData = await scrapeAllPrices();

      // Save average prices to Supabase
      await saveSolarPrices({
        residential: {
          average: priceData.residential.average,
          min: priceData.residential.min,
          max: priceData.residential.max,
          sources: priceData.residential.sources,
          sourceNames: ['IndiaMART', 'Tata Power', 'Luminous'] // Add actual sources
        },
        commercial: {
          average: priceData.commercial.average,
          min: priceData.commercial.min,
          max: priceData.commercial.max,
          sources: priceData.commercial.sources,
          sourceNames: ['IndiaMART', 'Tata Power']
        }
      });

      results.prices = priceData;
      console.log('✅ Prices scraped and saved');

      // Log success
      await logScraperExecution({
        scraper_type: 'prices',
        status: 'success',
        items_scraped: priceData.residential.sources + priceData.commercial.sources,
        duration_ms: Date.now() - startTime
      });

    } catch (error: any) {
      console.error('❌ Price scraping failed:', error.message);
      results.errors.push(`Price scraping: ${error.message}`);
      
      // Log failure
      await logScraperExecution({
        scraper_type: 'prices',
        status: 'failed',
        items_scraped: 0,
        errors: [error.message],
        duration_ms: Date.now() - startTime
      });
    }

    // ========================================
    // Final Results
    // ========================================
    const duration = Date.now() - startTime;
    const status = results.errors.length === 0 ? 'success' : 
                   results.errors.length < 2 ? 'partial' : 'failed';

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`✅ Cron job completed: ${status.toUpperCase()}`);
    console.log(`⏱️  Duration: ${(duration / 1000).toFixed(2)}s`);
    console.log(`📊 Subsidies: ${results.subsidies ? 'Updated' : 'Failed'}`);
    console.log(`💰 Prices: ${results.prices ? 'Updated' : 'Failed'}`);
    if (results.errors.length > 0) {
      console.log(`⚠️  Errors: ${results.errors.length}`);
      results.errors.forEach(err => console.log(`   - ${err}`));
    }
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    return NextResponse.json({
      success: true,
      status,
      results: {
        subsidies: results.subsidies ? {
          upTo2kW: results.subsidies.centralSubsidy.upTo2kW,
          from2To3kW: results.subsidies.centralSubsidy.from2To3kW,
          above3kW: results.subsidies.centralSubsidy.above3kW,
          specialBonus: results.subsidies.centralSubsidy.specialCategoryBonus
        } : null,
        prices: results.prices ? {
          residential: results.prices.residential.average,
          commercial: results.prices.commercial.average
        } : null
      },
      errors: results.errors.length > 0 ? results.errors : undefined,
      duration: `${(duration / 1000).toFixed(2)}s`,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    const duration = Date.now() - startTime;
    
    console.error('\n❌ Cron job failed with fatal error:', error);

    // Log fatal error
    await logScraperExecution({
      scraper_type: 'prices', // Default
      status: 'failed',
      items_scraped: 0,
      errors: [error.message],
      duration_ms: duration
    }).catch(err => console.error('Failed to log error:', err));

    return NextResponse.json(
      {
        success: false,
        status: 'failed',
        error: error.message,
        duration: `${(duration / 1000).toFixed(2)}s`,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function HEAD() {
  return new NextResponse(null, { status: 200 });
}
