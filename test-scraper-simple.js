// test-scraper-simple.js
/**
 * Simple JavaScript test script for web scraping
 * Run with: node test-scraper-simple.js
 */

const { chromium } = require('playwright');

async function testPMSuryaGhar() {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║  PM Surya Ghar Portal Scraper Test                        ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  const browser = await chromium.launch({
    headless: false, // Show browser so you can see what's happening
    slowMo: 1000 // Slow down by 1 second per action
  });

  const page = await browser.newPage();

  try {
    console.log('📡 Navigating to pmsuryaghar.gov.in...\n');
    
    await page.goto('https://pmsuryaghar.gov.in/', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    console.log('✅ Page loaded successfully!\n');

    // Wait for page to fully load
    await page.waitForTimeout(3000);

    // Get page title
    const title = await page.title();
    console.log(`📄 Page Title: ${title}\n`);

    // Take screenshot
    await page.screenshot({ path: 'pmsuryaghar-screenshot.png', fullPage: true });
    console.log('📸 Screenshot saved: pmsuryaghar-screenshot.png\n');

    // Get all text content
    const bodyText = await page.evaluate(() => document.body.innerText);
    
    // Check for subsidy keywords
    const keywords = {
      '30,000': bodyText.includes('30,000') || bodyText.includes('30000'),
      '18,000': bodyText.includes('18,000') || bodyText.includes('18000'),
      '78,000': bodyText.includes('78,000') || bodyText.includes('78000'),
      'subsidy': bodyText.toLowerCase().includes('subsidy'),
      'residential': bodyText.toLowerCase().includes('residential'),
      'PM Surya Ghar': bodyText.includes('PM Surya Ghar') || bodyText.includes('Surya Ghar'),
    };

    console.log('🔍 Keyword Detection Results:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    Object.entries(keywords).forEach(([keyword, found]) => {
      const icon = found ? '✅' : '❌';
      console.log(`${icon} "${keyword}": ${found ? 'Found' : 'Not Found'}`);
    });
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Try to find subsidy information
    const subsidyInfo = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('*'));
      const subsidyElements = elements.filter(el => {
        const text = el.textContent || '';
        return text.includes('30,000') || text.includes('18,000') || text.includes('78,000');
      });
      
      return subsidyElements.slice(0, 5).map(el => ({
        tagName: el.tagName,
        text: el.textContent?.substring(0, 200),
        className: el.className
      }));
    });

    if (subsidyInfo.length > 0) {
      console.log('💰 Subsidy Information Found:');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      subsidyInfo.forEach((info, idx) => {
        console.log(`\n${idx + 1}. <${info.tagName}> ${info.className ? `class="${info.className}"` : ''}`);
        console.log(`   ${info.text?.trim().replace(/\s+/g, ' ').substring(0, 150)}...`);
      });
      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    }

    // Look for benefits/subsidy links
    const links = await page.evaluate(() => {
      const allLinks = Array.from(document.querySelectorAll('a'));
      return allLinks
        .filter(a => {
          const text = a.textContent?.toLowerCase() || '';
          const href = a.href || '';
          return text.includes('benefit') || 
                 text.includes('subsidy') || 
                 text.includes('scheme') ||
                 href.includes('benefit');
        })
        .map(a => ({
          text: a.textContent?.trim(),
          href: a.href
        }))
        .slice(0, 10);
    });

    if (links.length > 0) {
      console.log('🔗 Relevant Links Found:');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      links.forEach((link, idx) => {
        console.log(`${idx + 1}. "${link.text}"`);
        console.log(`   ${link.href}\n`);
      });
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    }

    console.log('✅ Test completed successfully!\n');
    console.log('💡 Next Steps:');
    console.log('   1. Check pmsuryaghar-screenshot.png for visual verification');
    console.log('   2. If subsidy amounts found, scraping is working!');
    console.log('   3. Can now automate daily updates\n');

    // Keep browser open for 5 seconds so you can see the page
    console.log('⏳ Browser will close in 5 seconds...\n');
    await page.waitForTimeout(5000);

  } catch (error) {
    console.error('\n❌ Error during scraping:', error.message);
    await page.screenshot({ path: 'error-screenshot.png' });
    console.log('📸 Error screenshot saved: error-screenshot.png\n');
  } finally {
    await browser.close();
    console.log('🏁 Browser closed\n');
  }
}

// Run the test
console.log('🚀 Starting web scraper test...\n');
testPMSuryaGhar()
  .then(() => {
    console.log('✅ All done! Check the screenshots and console output above.\n');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  });
