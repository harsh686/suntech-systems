// lib/scrapers/state-scrapers.ts
import { chromium } from 'playwright';
import * as cheerio from 'cheerio';

interface StateSubsidyData {
  state: string;
  stateName: string;
  additionalSubsidy: number;
  maxCapacity: number;
  source: string;
  lastUpdated: string;
  verified: boolean;
}

// State energy department URLs
const STATE_URLS: Record<string, string> = {
  'gujarat': 'https://geda.gujarat.gov.in/',
  'maharashtra': 'https://www.mahaurja.com/',
  'karnataka': 'https://kredlinfo.in/',
  'rajasthan': 'https://energy.rajasthan.gov.in/content/raj/energy/en.html',
  'tamil-nadu': 'https://www.teda.in/',
  'telangana': 'https://www.tsspdcl.in/',
  'andhra-pradesh': 'https://www.apgenco.gov.in/',
  'kerala': 'https://www.anert.gov.in/',
  'punjab': 'https://www.peda.gov.in/',
  'haryana': 'https://hareda.gov.in/',
  'uttar-pradesh': 'https://www.upneda.org.in/',
  'madhya-pradesh': 'https://www.mprenewable.nic.in/',
  'west-bengal': 'https://www.wbreda.org/',
  'odisha': 'https://www.oreda.in/',
};

export async function scrapeStateSubsidy(stateKey: string): Promise<StateSubsidyData | null> {
  const stateUrl = STATE_URLS[stateKey];
  
  if (!stateUrl) {
    console.log(`⚠️  No URL configured for state: ${stateKey}`);
    return null;
  }

  console.log(`🚀 Scraping ${stateKey} at ${stateUrl}...`);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(stateUrl, { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });

    await page.waitForTimeout(2000);

    // Get page content
    const html = await page.content();
    const $ = cheerio.load(html);
    const pageText = $('body').text().toLowerCase();

    // Look for solar subsidy keywords
    const keywords = [
      'solar', 'rooftop', 'subsidy', 'incentive', 'scheme',
      'residential', 'kw', 'rupee', '₹'
    ];

    const hasRelevantContent = keywords.some(keyword => 
      pageText.includes(keyword)
    );

    if (!hasRelevantContent) {
      console.log(`⚠️  ${stateKey}: No solar subsidy information found`);
      await browser.close();
      return null;
    }

    // Try to extract subsidy amount (pattern matching)
    // Look for patterns like "₹10,000 per kW" or "Rs 10000/kW"
    const subsidyPatterns = [
      /₹\s*(\d{1,2}),?(\d{3})\s*(?:per\s*kW|\/kW)/gi,
      /Rs\.?\s*(\d{1,2}),?(\d{3})\s*(?:per\s*kW|\/kW)/gi,
      /rupees?\s*(\d{1,2}),?(\d{3})\s*(?:per\s*kW|\/kW)/gi
    ];

    let subsidyAmount = 0;
    for (const pattern of subsidyPatterns) {
      const matches = Array.from(pageText.matchAll(pattern));
      for (const match of matches) {
        const amount = parseInt(match[1] + match[2]);
        if (amount > 0 && amount < 50000) { // Reasonable range
          subsidyAmount = Math.max(subsidyAmount, amount);
        }
      }
    }

    // Take screenshot for manual verification
    await page.screenshot({ path: `public/debug-${stateKey}.png` });

    await browser.close();

    if (subsidyAmount > 0) {
      console.log(`✅ ${stateKey}: Found subsidy of ₹${subsidyAmount}/kW`);
      
      return {
        state: stateKey,
        stateName: stateKey.split('-').map(w => 
          w.charAt(0).toUpperCase() + w.slice(1)
        ).join(' '),
        additionalSubsidy: subsidyAmount,
        maxCapacity: 3, // Default assumption
        source: stateUrl,
        lastUpdated: new Date().toISOString(),
        verified: false // Requires manual verification
      };
    } else {
      console.log(`⚠️  ${stateKey}: Could not extract subsidy amount`);
      return null;
    }

  } catch (error) {
    console.error(`❌ Error scraping ${stateKey}:`, error);
    await browser.close();
    return null;
  }
}

// Scrape multiple states in parallel
export async function scrapeAllStates(): Promise<StateSubsidyData[]> {
  console.log('🚀 Starting state subsidy scraping for all configured states...\n');
  
  const stateKeys = Object.keys(STATE_URLS);
  const results: StateSubsidyData[] = [];

  // Scrape states in batches of 3 to avoid overwhelming servers
  const batchSize = 3;
  for (let i = 0; i < stateKeys.length; i += batchSize) {
    const batch = stateKeys.slice(i, i + batchSize);
    console.log(`\n📦 Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(stateKeys.length / batchSize)}...`);
    
    const batchPromises = batch.map(stateKey => 
      scrapeStateSubsidy(stateKey).catch(err => {
        console.error(`Error in ${stateKey}:`, err.message);
        return null;
      })
    );

    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults.filter(Boolean) as StateSubsidyData[]);

    // Wait between batches
    if (i + batchSize < stateKeys.length) {
      console.log('⏳ Waiting 5 seconds before next batch...');
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }

  console.log(`\n✅ State scraping completed: ${results.length}/${stateKeys.length} states found data`);
  
  return results;
}

// Test function
export async function testStateScraper(stateKey: string = 'gujarat') {
  console.log(`🧪 Testing state scraper for: ${stateKey}\n`);
  
  try {
    const data = await scrapeStateSubsidy(stateKey);
    
    if (data) {
      console.log('\n✅ Scraping Results:');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`State: ${data.stateName}`);
      console.log(`Additional Subsidy: ₹${data.additionalSubsidy.toLocaleString()}/kW`);
      console.log(`Max Capacity: ${data.maxCapacity}kW`);
      console.log(`Source: ${data.source}`);
      console.log(`Verified: ${data.verified ? 'Yes ✅' : 'No ⚠️ (needs manual check)'}`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    } else {
      console.log('❌ No subsidy data found for this state\n');
    }

    return data;

  } catch (error) {
    console.error('\n❌ Test failed:', error);
    throw error;
  }
}
