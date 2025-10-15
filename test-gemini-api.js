/**
 * Gemini API Test Script
 * Tests if your Gemini API key is working correctly
 */

const readline = require('readline');

// Colors for terminal output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
  reset: '\x1b[0m'
};

async function testGeminiAPI(apiKey) {
  console.log(`${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  console.log(`${colors.blue}   🧪 Testing Gemini API Connection${colors.reset}`);
  console.log(`${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

  // Test 1: Check API key format
  console.log(`${colors.yellow}Test 1:${colors.reset} Checking API key format...`);
  if (!apiKey || apiKey.trim() === '') {
    console.log(`${colors.red}❌ FAILED: API key is empty${colors.reset}\n`);
    return false;
  }
  if (apiKey.length < 20) {
    console.log(`${colors.red}❌ FAILED: API key seems too short${colors.reset}\n`);
    return false;
  }
  console.log(`${colors.green}✅ PASSED: API key format looks good${colors.reset}\n`);

  // Test 2: Make actual API call
  console.log(`${colors.yellow}Test 2:${colors.reset} Making test API call to Gemini...`);
  
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: 'Say "Hello! API is working perfectly!" in exactly those words.'
          }]
        }]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log(`${colors.red}❌ FAILED: API returned error${colors.reset}`);
      console.log(`${colors.red}Status: ${response.status}${colors.reset}`);
      console.log(`${colors.red}Error: ${JSON.stringify(errorData, null, 2)}${colors.reset}\n`);
      
      if (response.status === 400) {
        console.log(`${colors.yellow}💡 Tip: Your API key might be invalid or disabled${colors.reset}`);
      } else if (response.status === 403) {
        console.log(`${colors.yellow}💡 Tip: API key doesn't have permission to use Gemini Pro${colors.reset}`);
      } else if (response.status === 429) {
        console.log(`${colors.yellow}💡 Tip: Rate limit exceeded, wait a moment and try again${colors.reset}`);
      }
      return false;
    }

    const data = await response.json();
    console.log(`${colors.green}✅ PASSED: Successfully connected to Gemini API${colors.reset}\n`);

    // Test 3: Verify response
    console.log(`${colors.yellow}Test 3:${colors.reset} Checking API response...`);
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      const aiResponse = data.candidates[0].content.parts[0].text;
      console.log(`${colors.green}✅ PASSED: Received valid response${colors.reset}`);
      console.log(`${colors.blue}📝 AI Response: ${colors.reset}"${aiResponse}"\n`);
      
      // Success summary
      console.log(`${colors.green}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
      console.log(`${colors.green}   ✅ ALL TESTS PASSED!${colors.reset}`);
      console.log(`${colors.green}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);
      console.log(`${colors.green}🎉 Your Gemini API key is working perfectly!${colors.reset}`);
      console.log(`${colors.green}✨ Ready to build SolarGPT chatbot!${colors.reset}\n`);
      
      return true;
    } else {
      console.log(`${colors.red}❌ FAILED: Unexpected response format${colors.reset}\n`);
      return false;
    }

  } catch (error) {
    console.log(`${colors.red}❌ FAILED: Network or connection error${colors.reset}`);
    console.log(`${colors.red}Error: ${error.message}${colors.reset}\n`);
    return false;
  }
}

// Interactive mode
async function runInteractive() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log('\n🔑 Gemini API Key Tester\n');
  
  rl.question('Paste your Gemini API key here (input will be hidden): ', async (apiKey) => {
    console.log('\n'); // Add space after input
    
    const result = await testGeminiAPI(apiKey.trim());
    
    if (result) {
      console.log(`${colors.yellow}📋 Next Steps:${colors.reset}`);
      console.log(`   1. Add this API key to your .env.local file`);
      console.log(`   2. Run: ${colors.blue}node add-gemini-key.js${colors.reset}`);
      console.log(`   3. I'll build the SolarGPT chatbot for you!\n`);
    } else {
      console.log(`${colors.yellow}🔧 Troubleshooting:${colors.reset}`);
      console.log(`   1. Go to: https://aistudio.google.com/app/apikey`);
      console.log(`   2. Create a new API key or check existing ones`);
      console.log(`   3. Make sure Gemini Pro is enabled for your key`);
      console.log(`   4. Run this test again\n`);
    }
    
    rl.close();
  });
}

// Check if API key provided as argument
const apiKeyArg = process.argv[2];

if (apiKeyArg) {
  testGeminiAPI(apiKeyArg).then(() => {
    console.log('Test complete!');
  });
} else {
  runInteractive();
}
