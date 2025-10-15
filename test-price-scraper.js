/**
 * Test Solar Price Scraper
 * Run: node test-price-scraper.js
 */

const { chromium } = require('playwright');

async function testPriceScraper() {
  console.log('🚀 Testing Solar Price Scraper...\n');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  
  try {
    // ========================================
    // Test 1: IndiaMART
    // ========================================
    console.log('📊 Test 1: Scraping IndiaMART...');
    const page1 = await context.newPage();
    await page1.goto('https://www.indiamart.com/solar-rooftop-system.html', { 
      waitUntil: 'domcontentloaded',
      timeout: 30000 
    });
    
    const content1 = await page1.content();
    
    // Extract prices (₹XX,XXX pattern)
    const pricePattern = /[₹Rs.\s]*(\d{1,2})[,\s]*(\d{3})/g;
    const prices1 = [];
    let match;
    
    while ((match = pricePattern.exec(content1)) !== null) {
      const price = parseInt(match[1] + match[2]);
      if (price >= 30 && price <= 70) {
        prices1.push(price * 1000);
      }
    }
    
    console.log(`✅ IndiaMART: Found ${prices1.length} prices`);
    if (prices1.length > 0) {
      console.log(`   Range: ₹${Math.min(...prices1).toLocaleString('en-IN')} - ₹${Math.max(...prices1).toLocaleString('en-IN')}/kW`);
    }
    
    await page1.screenshot({ path: 'test-indiamart.png', fullPage: true });
    await page1.close();
    
    // ========================================
    // Test 2: Tata Power Solar
    // ========================================
    console.log('\n📊 Test 2: Scraping Tata Power Solar...');
    const page2 = await context.newPage();
    
    try {
      await page2.goto('https://www.tatapowersolar.com/rooftop', { 
        waitUntil: 'domcontentloaded',
        timeout: 30000 
      });
      
      const content2 = await page2.content();
      const prices2 = [];
      
      while ((match = pricePattern.exec(content2)) !== null) {
        const price = parseInt(match[1] + match[2]);
        if (price >= 30 && price <= 70) {
          prices2.push(price * 1000);
        }
      }
      
      console.log(`✅ Tata Power: Found ${prices2.length} prices`);
      if (prices2.length > 0) {
        console.log(`   Range: ₹${Math.min(...prices2).toLocaleString('en-IN')} - ₹${Math.max(...prices2).toLocaleString('en-IN')}/kW`);
      }
      
      await page2.screenshot({ path: 'test-tata.png', fullPage: true });
    } catch (error) {
      console.log(`⚠️  Tata Power: ${error.message}`);
    }
    
    await page2.close();
    
    // ========================================
    // Test 3: Calculate Average
    // ========================================
    console.log('\n📊 Test 3: Calculating Averages...');
    
    const allPrices = [...prices1];
    
    if (allPrices.length > 0) {
      const min = Math.min(...allPrices);
      const max = Math.max(...allPrices);
      const avg = Math.round(allPrices.reduce((a, b) => a + b, 0) / allPrices.length);
      
      console.log('✅ Results:');
      console.log(`   Total sources: ${allPrices.length}`);
      console.log(`   Min price: ₹${min.toLocaleString('en-IN')}/kW`);
      console.log(`   Max price: ₹${max.toLocaleString('en-IN')}/kW`);
      console.log(`   Average: ₹${avg.toLocaleString('en-IN')}/kW`);
    } else {
      console.log('⚠️  No prices found, using defaults:');
      console.log('   Residential: ₹45,000/kW');
      console.log('   Commercial: ₹50,000/kW');
    }
    
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ Price scraper test completed!');
    console.log('📸 Screenshots saved:');
    console.log('   - test-indiamart.png');
    console.log('   - test-tata.png');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
  } finally {
    await browser.close();
  }
}

testPriceScraper();
