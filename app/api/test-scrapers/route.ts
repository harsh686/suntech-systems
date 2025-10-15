// app/api/test-scrapers/route.ts
/**
 * Manual Scraper Test API
 * 
 * Test scrapers manually without waiting for cron job.
 * This helps verify everything works before deploying.
 * 
 * Endpoint: /api/test-scrapers
 * Method: GET (with auth header)
 * 
 * Returns:
 * - Scraper execution results
 * - Extracted data preview
 * - Success/failure status
 * - Execution time
 */

import { NextRequest, NextResponse } from 'next/server';
import { scrapePMSuryaGhar } from '@/lib/scrapers/pmsuryaghar-scraper';
import { scrapeAllPrices } from '@/lib/scrapers/solar-price-scraper';

export const maxDuration = 300; // 5 minutes
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const startTime = Date.now();
  
  console.log('🧪 Manual scraper test initiated...');

  try {
    // Simple password protection (change this!)
    const authHeader = request.headers.get('authorization');
    const password = process.env.TEST_PASSWORD || 'test123';
    
    if (authHeader !== `Bearer ${password}`) {
      return NextResponse.json(
        { error: 'Unauthorized. Use: Authorization: Bearer <password>' },
        { status: 401 }
      );
    }

    const results = {
      subsidyScraper: { status: '', data: null as any, error: null as any, duration: 0 },
      priceScraper: { status: '', data: null as any, error: null as any, duration: 0 }
    };

    // ========================================
    // Test 1: PM Surya Ghar Scraper
    // ========================================
    console.log('\n📋 Testing PM Surya Ghar scraper...');
    const subsidyStart = Date.now();
    
    try {
      const subsidyData = await scrapePMSuryaGhar();
      results.subsidyScraper.status = 'success';
      results.subsidyScraper.data = {
        upTo2kW: subsidyData.centralSubsidy.upTo2kW,
        from2To3kW: subsidyData.centralSubsidy.from2To3kW,
        above3kW: subsidyData.centralSubsidy.above3kW,
        specialBonus: subsidyData.centralSubsidy.specialCategoryBonus,
        source: subsidyData.source,
        lastUpdated: subsidyData.lastUpdated
      };
      results.subsidyScraper.duration = Date.now() - subsidyStart;
      console.log('✅ Subsidy scraper: SUCCESS');
    } catch (error: any) {
      results.subsidyScraper.status = 'failed';
      results.subsidyScraper.error = error.message;
      results.subsidyScraper.duration = Date.now() - subsidyStart;
      console.error('❌ Subsidy scraper: FAILED', error.message);
    }

    // ========================================
    // Test 2: Solar Price Scraper
    // ========================================
    console.log('\n💰 Testing solar price scraper...');
    const priceStart = Date.now();
    
    try {
      const priceData = await scrapeAllPrices();
      results.priceScraper.status = 'success';
      results.priceScraper.data = {
        residential: {
          average: priceData.residential.average,
          min: priceData.residential.min,
          max: priceData.residential.max,
          sources: priceData.residential.sources
        },
        commercial: {
          average: priceData.commercial.average,
          min: priceData.commercial.min,
          max: priceData.commercial.max,
          sources: priceData.commercial.sources
        },
        lastUpdated: priceData.lastUpdated
      };
      results.priceScraper.duration = Date.now() - priceStart;
      console.log('✅ Price scraper: SUCCESS');
    } catch (error: any) {
      results.priceScraper.status = 'failed';
      results.priceScraper.error = error.message;
      results.priceScraper.duration = Date.now() - priceStart;
      console.error('❌ Price scraper: FAILED', error.message);
    }

    // ========================================
    // Summary
    // ========================================
    const totalDuration = Date.now() - startTime;
    const overallStatus = 
      results.subsidyScraper.status === 'success' && results.priceScraper.status === 'success'
        ? 'all_passed'
        : results.subsidyScraper.status === 'failed' && results.priceScraper.status === 'failed'
        ? 'all_failed'
        : 'partial';

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`🧪 Test Results: ${overallStatus.toUpperCase()}`);
    console.log(`⏱️  Total Duration: ${(totalDuration / 1000).toFixed(2)}s`);
    console.log(`📋 Subsidy Scraper: ${results.subsidyScraper.status} (${(results.subsidyScraper.duration / 1000).toFixed(2)}s)`);
    console.log(`💰 Price Scraper: ${results.priceScraper.status} (${(results.priceScraper.duration / 1000).toFixed(2)}s)`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    return NextResponse.json({
      success: true,
      status: overallStatus,
      results,
      totalDuration: `${(totalDuration / 1000).toFixed(2)}s`,
      timestamp: new Date().toISOString(),
      environment: {
        isVercel: !!process.env.VERCEL,
        nodeVersion: process.version,
        platform: process.platform,
        hasChromium: !!process.env.VERCEL
      },
      note: process.env.VERCEL 
        ? 'Scrapers ran in HEADLESS mode on Vercel (serverless Chromium)'
        : 'Scrapers ran in HEADLESS mode locally'
    });

  } catch (error: any) {
    const duration = Date.now() - startTime;
    
    console.error('\n❌ Test failed with fatal error:', error);

    return NextResponse.json(
      {
        success: false,
        status: 'fatal_error',
        error: error.message,
        stack: error.stack,
        duration: `${(duration / 1000).toFixed(2)}s`,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
