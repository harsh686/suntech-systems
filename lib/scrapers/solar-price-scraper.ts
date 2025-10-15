// lib/scrapers/solar-price-scraper.ts
import { chromium } from 'playwright-core';
import chromiumPkg from '@sparticuz/chromium';
import * as cheerio from 'cheerio';

interface SolarPriceData {
  source: string;
  pricePerKW: number;
  systemSize: number; // 1kW, 2kW, 3kW, etc.
  type: 'residential' | 'commercial';
  includes: string[]; // What's included in the price
  scrapedAt: string;
}

interface PriceAverage {
  residential: {
    min: number;
    max: number;
    average: number;
    sources: number;
  };
  commercial: {
    min: number;
    max: number;
    average: number;
    sources: number;
  };
  lastUpdated: string;
}

// Major solar panel manufacturers and sellers in India
const PRICE_SOURCES = {
  // Solar manufacturers
  'Tata Power Solar': 'https://www.tatapowersolar.com/',
  'Adani Solar': 'https://www.adanisolar.com/',
  'Vikram Solar': 'https://www.vikramsolar.com/',
  
  // Solar installation companies
  'Luminous': 'https://www.luminousindia.com/solar.html',
  'Waaree': 'https://www.waaree.com/',
  
  // Online marketplaces
  'IndiaMART Solar': 'https://www.indiamart.com/solar-panel/',
  'TradeIndia Solar': 'https://www.tradeindia.com/solar-panel.html',
};

/**
 * Scrape IndiaMART for solar panel prices (most reliable source)
 */
export async function scrapeIndiaMartPrices(): Promise<SolarPriceData[]> {
  console.log('🚀 Scraping IndiaMART for solar panel prices...');
  
  const isVercel = !!process.env.VERCEL;
  
  const browser = await chromium.launch({
    headless: true,
    executablePath: isVercel ? await chromiumPkg.executablePath() : undefined,
    args: isVercel ? chromiumPkg.args : ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  const prices: SolarPriceData[] = [];

  try {
    // Search for "solar panel 1kw price"
    await page.goto('https://www.indiamart.com/impcat/solar-rooftop-system.html', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'public/debug-indiamart.png' });

    const html = await page.content();
    const $ = cheerio.load(html);

    // Extract price patterns
    // IndiaMART shows prices like "₹40,000 / kW" or "₹45,000 per kW"
    const priceElements = $('.price, .prc, [class*="price"]').toArray();

    for (const el of priceElements) {
      const priceText = $(el).text();
      
      // Pattern: ₹XX,XXX or Rs XX,XXX
      const priceMatch = priceText.match(/[₹Rs.?\s]*(\d{1,2})[,\s]*(\d{3})/);
      
      if (priceMatch) {
        const pricePerKW = parseInt(priceMatch[1] + priceMatch[2]);
        
        // Validate price range (₹30,000 - ₹70,000 reasonable for Indian market)
        if (pricePerKW >= 30000 && pricePerKW <= 70000) {
          prices.push({
            source: 'IndiaMART',
            pricePerKW,
            systemSize: 1, // Default
            type: 'residential',
            includes: ['Panels', 'Inverter', 'Installation'],
            scrapedAt: new Date().toISOString()
          });
        }
      }
    }

    console.log(`✅ IndiaMART: Found ${prices.length} prices`);

  } catch (error) {
    console.error('❌ Error scraping IndiaMART:', error);
  } finally {
    await browser.close();
  }

  return prices;
}

/**
 * Scrape Tata Power Solar for official pricing
 */
export async function scrapeTataPowerSolar(): Promise<SolarPriceData[]> {
  console.log('🚀 Scraping Tata Power Solar for prices...');
  
  const isVercel = !!process.env.VERCEL;
  
  const browser = await chromium.launch({
    headless: true,
    executablePath: isVercel ? await chromiumPkg.executablePath() : undefined,
    args: isVercel ? chromiumPkg.args : ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  const prices: SolarPriceData[] = [];

  try {
    await page.goto('https://www.tatapowersolar.com/rooftop-solar-panel-for-home', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'public/debug-tata.png' });

    const html = await page.content();
    const $ = cheerio.load(html);
    const pageText = $('body').text();

    // Look for price patterns in text
    const pricePatterns = [
      /₹\s*(\d{1,2})[,\s]*(\d{3})[,\s]*(\d{3})?/g,
      /Rs\.?\s*(\d{1,2})[,\s]*(\d{3})/g
    ];

    for (const pattern of pricePatterns) {
      const matches = Array.from(pageText.matchAll(pattern));
      
      for (const match of matches) {
        const priceStr = match[1] + match[2] + (match[3] || '');
        const price = parseInt(priceStr);
        
        // Check if it's per kW price (between 35k-65k) or system price
        if (price >= 35000 && price <= 65000) {
          prices.push({
            source: 'Tata Power Solar',
            pricePerKW: price,
            systemSize: 1,
            type: 'residential',
            includes: ['Tata Panels', 'Inverter', 'Installation', 'Warranty'],
            scrapedAt: new Date().toISOString()
          });
        }
      }
    }

    console.log(`✅ Tata Power: Found ${prices.length} prices`);

  } catch (error) {
    console.error('❌ Error scraping Tata Power:', error);
  } finally {
    await browser.close();
  }

  return prices;
}

/**
 * Scrape Luminous Solar prices
 */
export async function scrapeLuminousSolar(): Promise<SolarPriceData[]> {
  console.log('🚀 Scraping Luminous Solar for prices...');
  
  const isVercel = !!process.env.VERCEL;
  
  const browser = await chromium.launch({
    headless: true,
    executablePath: isVercel ? await chromiumPkg.executablePath() : undefined,
    args: isVercel ? chromiumPkg.args : ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  const prices: SolarPriceData[] = [];

  try {
    await page.goto('https://www.luminousindia.com/solar.html', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'public/debug-luminous.png' });

    const html = await page.content();
    const $ = cheerio.load(html);
    
    // Look for product prices
    $('.product-price, .price, [class*="price"]').each((_, el) => {
      const priceText = $(el).text();
      const priceMatch = priceText.match(/(\d{1,2})[,\s]*(\d{3})/);
      
      if (priceMatch) {
        const price = parseInt(priceMatch[1] + priceMatch[2]);
        
        if (price >= 35000 && price <= 65000) {
          prices.push({
            source: 'Luminous Solar',
            pricePerKW: price,
            systemSize: 1,
            type: 'residential',
            includes: ['Panels', 'Inverter', 'Battery'],
            scrapedAt: new Date().toISOString()
          });
        }
      }
    });

    console.log(`✅ Luminous: Found ${prices.length} prices`);

  } catch (error) {
    console.error('❌ Error scraping Luminous:', error);
  } finally {
    await browser.close();
  }

  return prices;
}

/**
 * Scrape all price sources and calculate average
 */
export async function scrapeAllPrices(): Promise<PriceAverage> {
  console.log('🚀 Starting comprehensive solar price scraping...\n');
  
  const allPrices: SolarPriceData[] = [];

  // Scrape all sources in parallel (faster)
  const [indiaMartPrices, tataPrices, luminousPrices] = await Promise.all([
    scrapeIndiaMartPrices().catch(err => {
      console.error('IndiaMART failed:', err.message);
      return [];
    }),
    scrapeTataPowerSolar().catch(err => {
      console.error('Tata Power failed:', err.message);
      return [];
    }),
    scrapeLuminousSolar().catch(err => {
      console.error('Luminous failed:', err.message);
      return [];
    })
  ]);

  allPrices.push(...indiaMartPrices, ...tataPrices, ...luminousPrices);

  if (allPrices.length === 0) {
    console.log('⚠️  No prices found, using fallback values');
    
    // Fallback to current market rates
    return {
      residential: {
        min: 40000,
        max: 55000,
        average: 45000,
        sources: 0
      },
      commercial: {
        min: 45000,
        max: 60000,
        average: 50000,
        sources: 0
      },
      lastUpdated: new Date().toISOString()
    };
  }

  // Calculate averages
  const residentialPrices = allPrices
    .filter(p => p.type === 'residential')
    .map(p => p.pricePerKW);

  const commercialPrices = allPrices
    .filter(p => p.type === 'commercial')
    .map(p => p.pricePerKW);

  // Use residential prices for commercial if no commercial data
  const finalCommercialPrices = commercialPrices.length > 0 
    ? commercialPrices 
    : residentialPrices.map(p => p * 1.1); // Commercial typically 10% higher

  const result: PriceAverage = {
    residential: {
      min: Math.min(...residentialPrices),
      max: Math.max(...residentialPrices),
      average: Math.round(residentialPrices.reduce((a, b) => a + b, 0) / residentialPrices.length),
      sources: residentialPrices.length
    },
    commercial: {
      min: Math.round(Math.min(...finalCommercialPrices)),
      max: Math.round(Math.max(...finalCommercialPrices)),
      average: Math.round(finalCommercialPrices.reduce((a, b) => a + b, 0) / finalCommercialPrices.length),
      sources: commercialPrices.length
    },
    lastUpdated: new Date().toISOString()
  };

  console.log('\n✅ Price scraping completed!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Residential: ₹${result.residential.average.toLocaleString()}/kW (${result.residential.sources} sources)`);
  console.log(`  Range: ₹${result.residential.min.toLocaleString()} - ₹${result.residential.max.toLocaleString()}`);
  console.log(`Commercial: ₹${result.commercial.average.toLocaleString()}/kW (${result.commercial.sources} sources)`);
  console.log(`  Range: ₹${result.commercial.min.toLocaleString()} - ₹${result.commercial.max.toLocaleString()}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  return result;
}

/**
 * Test the price scraper
 */
export async function testPriceScraper() {
  console.log('🧪 Testing Solar Price Scraper...\n');
  
  try {
    const priceData = await scrapeAllPrices();
    
    console.log('📊 Final Price Recommendations:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`\n🏠 Residential Solar (Per kW):`);
    console.log(`   Average: ₹${priceData.residential.average.toLocaleString()}`);
    console.log(`   Range: ₹${priceData.residential.min.toLocaleString()} - ₹${priceData.residential.max.toLocaleString()}`);
    console.log(`   Data Sources: ${priceData.residential.sources}`);
    
    console.log(`\n🏢 Commercial Solar (Per kW):`);
    console.log(`   Average: ₹${priceData.commercial.average.toLocaleString()}`);
    console.log(`   Range: ₹${priceData.commercial.min.toLocaleString()} - ₹${priceData.commercial.max.toLocaleString()}`);
    console.log(`   Data Sources: ${priceData.commercial.sources}`);
    
    console.log(`\n⏰ Last Updated: ${new Date(priceData.lastUpdated).toLocaleString()}\n`);
    
    return priceData;

  } catch (error) {
    console.error('❌ Test failed:', error);
    throw error;
  }
}
