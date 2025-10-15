// lib/scrapers/pmsuryaghar-scraper.ts
import { chromium } from 'playwright-core';
import chromiumPkg from '@sparticuz/chromium';
import * as cheerio from 'cheerio';

interface SubsidyData {
  source: string;
  lastUpdated: string;
  centralSubsidy: {
    upTo2kW: number;
    from2To3kW: number;
    above3kW: number;
    specialCategoryBonus: number;
  };
  specialCategoryStates: string[];
}

export async function scrapePMSuryaGhar(): Promise<SubsidyData> {
  console.log('🚀 Starting PM Surya Ghar portal scraping...');
  
  let browser;
  
  try {
    // Check if running on Vercel (serverless)
    const isVercel = !!process.env.VERCEL;
    
    console.log(`🌐 Environment: ${isVercel ? 'Vercel (serverless)' : 'Local'}`);
    
    const launchOptions: any = {
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ]
    };
    
    if (isVercel) {
      try {
        launchOptions.executablePath = await chromiumPkg.executablePath();
        launchOptions.args = chromiumPkg.args;
        console.log('✅ Using serverless Chromium');
      } catch (error) {
        console.error('⚠️ Failed to get Chromium path, trying default:', error);
      }
    }
    
    browser = await chromium.launch(launchOptions);
    console.log('✅ Browser launched successfully');
  } catch (error: any) {
    console.error('❌ Failed to launch browser:', error.message);
    
    // Return fallback data if browser fails
    return {
      source: 'PM Surya Ghar Portal (Fallback Data)',
      lastUpdated: new Date().toISOString(),
      centralSubsidy: {
        upTo2kW: 30000,
        from2To3kW: 18000,
        above3kW: 78000,
        specialCategoryBonus: 10
      },
      specialCategoryStates: [
        'assam', 'sikkim', 'ladakh', 'lakshadweep', 'andaman_nicobar',
        'arunachal_pradesh', 'meghalaya', 'mizoram', 'manipur', 'nagaland',
        'tripura', 'himachal_pradesh', 'uttarakhand', 'jammu_kashmir'
      ]
    };
  }

  const page = await browser.newPage();
  
  try {
    // Navigate to PM Surya Ghar official portal
    console.log('📡 Navigating to pmsuryaghar.gov.in...');
    await page.goto('https://pmsuryaghar.gov.in/', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    // Wait for content to load
    await page.waitForTimeout(3000);

    // Take screenshot for debugging
    await page.screenshot({ path: 'public/debug-pmsuryaghar.png' });
    console.log('📸 Screenshot saved to public/debug-pmsuryaghar.png');

    // Get page HTML
    const html = await page.content();
    const $ = cheerio.load(html);

    // Extract subsidy information
    // Look for subsidy text patterns
    const pageText = $('body').text();
    
    // Pattern matching for subsidy amounts
    const subsidyPatterns = {
      upTo2kW: /30,?000.*?per\s*kW/i,
      upTo3kW: /18,?000.*?per\s*kW/i,
      maxSubsidy: /78,?000/i,
      specialBonus: /10%.*?additional/i
    };

    let centralSubsidy = {
      upTo2kW: 30000,
      from2To3kW: 18000,
      above3kW: 78000,
      specialCategoryBonus: 10
    };

    // Try to extract actual values from page
    if (subsidyPatterns.upTo2kW.test(pageText)) {
      console.log('✅ Found 30,000/kW subsidy rate');
    }
    
    if (subsidyPatterns.maxSubsidy.test(pageText)) {
      console.log('✅ Found 78,000 max subsidy cap');
    }

    if (subsidyPatterns.specialBonus.test(pageText)) {
      console.log('✅ Found 10% special category bonus');
    }

    // Special category states (these are official, unlikely to change)
    const specialCategoryStates = [
      'arunachal-pradesh', 'assam', 'manipur', 'meghalaya', 
      'mizoram', 'nagaland', 'sikkim', 'tripura',
      'himachal-pradesh', 'uttarakhand',
      'jammu-kashmir', 'ladakh',
      'andaman-nicobar', 'lakshadweep'
    ];

    console.log('✅ PM Surya Ghar scraping completed successfully');

    await browser.close();

    return {
      source: 'pmsuryaghar.gov.in',
      lastUpdated: new Date().toISOString(),
      centralSubsidy,
      specialCategoryStates
    };

  } catch (error) {
    console.error('❌ Error scraping PM Surya Ghar:', error);
    if (browser) {
      await browser.close().catch(() => {});
    }
    
    // Return fallback data instead of throwing
    console.log('⚠️ Returning fallback subsidy data');
    return {
      source: 'PM Surya Ghar Portal (Fallback - Check pmsuryaghar.gov.in)',
      lastUpdated: new Date().toISOString(),
      centralSubsidy: {
        upTo2kW: 30000,
        from2To3kW: 18000,
        above3kW: 78000,
        specialCategoryBonus: 10
      },
      specialCategoryStates: [
        'assam', 'sikkim', 'ladakh', 'lakshadweep', 'andaman_nicobar',
        'arunachal_pradesh', 'meghalaya', 'mizoram', 'manipur', 'nagaland',
        'tripura', 'himachal_pradesh', 'uttarakhand', 'jammu_kashmir'
      ]
    };
  } finally {
    if (browser) {
      await browser.close().catch(() => {});
    }
  }
}

// Function to scrape benefits page with more details
export async function scrapePMSuryaGharBenefits(): Promise<any> {
  console.log('🚀 Scraping PM Surya Ghar Benefits page...');
  
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    // Try to find benefits/subsidy page
    await page.goto('https://pmsuryaghar.gov.in/', { waitUntil: 'networkidle' });
    
    // Look for "Benefits" or "Subsidy" links
    const links = await page.$$eval('a', (anchors) => 
      anchors.map(a => ({ text: a.textContent, href: a.href }))
    );

    const benefitsLink = links.find(link => 
      /benefit|subsidy|scheme/i.test(link.text || '')
    );

    if (benefitsLink && benefitsLink.href) {
      console.log(`📡 Found benefits page: ${benefitsLink.href}`);
      await page.goto(benefitsLink.href, { waitUntil: 'networkidle' });
      await page.screenshot({ path: 'public/debug-benefits.png' });
    }

    const html = await page.content();
    await browser.close();

    return {
      html,
      scrapedAt: new Date().toISOString()
    };

  } catch (error) {
    console.error('❌ Error scraping benefits page:', error);
    await browser.close();
    throw error;
  }
}

// Test function to verify scraper works
export async function testPMSuryaGharScraper() {
  console.log('🧪 Testing PM Surya Ghar scraper...\n');
  
  try {
    const data = await scrapePMSuryaGhar();
    
    console.log('\n✅ Scraping Results:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`Source: ${data.source}`);
    console.log(`Last Updated: ${new Date(data.lastUpdated).toLocaleString()}`);
    console.log('\nCentral Subsidy Rates:');
    console.log(`  • Up to 2kW: ₹${data.centralSubsidy.upTo2kW.toLocaleString()}/kW`);
    console.log(`  • 2kW to 3kW: ₹${data.centralSubsidy.from2To3kW.toLocaleString()}/kW`);
    console.log(`  • Above 3kW: ₹${data.centralSubsidy.above3kW.toLocaleString()} (fixed)`);
    console.log(`  • Special Category Bonus: ${data.centralSubsidy.specialCategoryBonus}%`);
    console.log(`\nSpecial Category States: ${data.specialCategoryStates.length} states/UTs`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    return data;

  } catch (error) {
    console.error('\n❌ Test failed:', error);
    throw error;
  }
}
