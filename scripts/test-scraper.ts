// scripts/test-scraper.ts
/**
 * Test script to verify web scraping works correctly
 * Run with: npm run test:scraper
 */

import { testPMSuryaGharScraper } from '../lib/scrapers/pmsuryaghar-scraper';
import { testStateScraper, scrapeAllStates } from '../lib/scrapers/state-scrapers';

async function main() {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║  Solar Subsidy Web Scraper - Test Suite                  ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  try {
    // Test 1: PM Surya Ghar Portal
    console.log('\n📋 TEST 1: PM Surya Ghar Portal Scraping');
    console.log('═══════════════════════════════════════════\n');
    
    const centralData = await testPMSuryaGharScraper();
    
    // Test 2: State Scraper (Gujarat as example)
    console.log('\n\n📋 TEST 2: State Subsidy Scraping (Gujarat)');
    console.log('═══════════════════════════════════════════\n');
    
    const gujaratData = await testStateScraper('gujarat');

    // Test 3: Maharashtra
    console.log('\n\n📋 TEST 3: State Subsidy Scraping (Maharashtra)');
    console.log('═══════════════════════════════════════════\n');
    
    const maharashtraData = await testStateScraper('maharashtra');

    // Summary
    console.log('\n\n╔════════════════════════════════════════════════════════════╗');
    console.log('║  TEST SUMMARY                                              ║');
    console.log('╚════════════════════════════════════════════════════════════╝\n');
    
    console.log('✅ Central Subsidy (PM Surya Ghar):');
    console.log(`   - Up to 2kW: ₹${centralData.centralSubsidy.upTo2kW.toLocaleString()}/kW`);
    console.log(`   - 2-3kW: ₹${centralData.centralSubsidy.from2To3kW.toLocaleString()}/kW`);
    console.log(`   - Above 3kW: ₹${centralData.centralSubsidy.above3kW.toLocaleString()}`);
    console.log(`   - Special Bonus: ${centralData.centralSubsidy.specialCategoryBonus}%\n`);

    if (gujaratData) {
      console.log('✅ Gujarat State Subsidy:');
      console.log(`   - Additional: ₹${gujaratData.additionalSubsidy.toLocaleString()}/kW`);
      console.log(`   - Source: ${gujaratData.source}\n`);
    } else {
      console.log('⚠️  Gujarat: No data found\n');
    }

    if (maharashtraData) {
      console.log('✅ Maharashtra State Subsidy:');
      console.log(`   - Additional: ₹${maharashtraData.additionalSubsidy.toLocaleString()}/kW`);
      console.log(`   - Source: ${maharashtraData.source}\n`);
    } else {
      console.log('⚠️  Maharashtra: No data found\n');
    }

    console.log('📸 Screenshots saved to public/ folder for manual verification\n');
    console.log('✅ All tests completed successfully!\n');

  } catch (error) {
    console.error('\n❌ Test suite failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main().then(() => {
    console.log('✅ Test script finished');
    process.exit(0);
  }).catch(error => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  });
}

export default main;
