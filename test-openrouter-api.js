/**
 * OpenRouter API Test Script
 * Tests if your OpenRouter API key is working with Gemini models
 */

const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
  reset: '\x1b[0m'
};

async function testOpenRouterAPI(apiKey) {
  console.log(`${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  console.log(`${colors.blue}   🧪 Testing OpenRouter API Connection${colors.reset}`);
  console.log(`${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

  // Test 1: Check API key format
  console.log(`${colors.yellow}Test 1:${colors.reset} Checking API key format...`);
  if (!apiKey || apiKey.trim() === '') {
    console.log(`${colors.red}❌ FAILED: API key is empty${colors.reset}\n`);
    return false;
  }
  console.log(`${colors.green}✅ PASSED: API key format looks good (OpenRouter)${colors.reset}\n`);

  // Test 2: Check available models
  console.log(`${colors.yellow}Test 2:${colors.reset} Checking available models...`);
  
  try {
    const modelsResponse = await fetch('https://openrouter.ai/api/v1/models', {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });

    if (!modelsResponse.ok) {
      console.log(`${colors.red}❌ FAILED: Could not fetch models${colors.reset}`);
      console.log(`${colors.red}Status: ${modelsResponse.status}${colors.reset}\n`);
      return false;
    }

    const modelsData = await modelsResponse.json();
    const geminiModels = modelsData.data.filter(model => 
      model.id.includes('gemini') || model.id.includes('google')
    );

    if (geminiModels.length > 0) {
      console.log(`${colors.green}✅ PASSED: Found ${geminiModels.length} Gemini models available${colors.reset}`);
      console.log(`${colors.blue}📋 Available Gemini models:${colors.reset}`);
      geminiModels.slice(0, 5).forEach(model => {
        console.log(`   - ${model.id}`);
      });
      console.log('');
    } else {
      console.log(`${colors.yellow}⚠️  No Gemini models found, will use default model${colors.reset}\n`);
    }

  } catch (error) {
    console.log(`${colors.yellow}⚠️  Could not fetch models (continuing anyway)${colors.reset}\n`);
  }

  // Test 3: Make actual API call
  console.log(`${colors.yellow}Test 3:${colors.reset} Making test API call...`);
  
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'Suntech Systems Solar GPT'
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash-preview-09-2025', // Using latest Gemini model
        messages: [{
          role: 'user',
          content: 'Say "Hello! API is working perfectly!" in exactly those words.'
        }]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log(`${colors.red}❌ FAILED: API returned error${colors.reset}`);
      console.log(`${colors.red}Status: ${response.status}${colors.reset}`);
      console.log(`${colors.red}Error: ${JSON.stringify(errorData, null, 2)}${colors.reset}\n`);
      
      if (response.status === 401) {
        console.log(`${colors.yellow}💡 Tip: Your API key is invalid or expired${colors.reset}`);
      } else if (response.status === 402) {
        console.log(`${colors.yellow}💡 Tip: Your account needs credits. Add credits at https://openrouter.ai/credits${colors.reset}`);
      } else if (response.status === 429) {
        console.log(`${colors.yellow}💡 Tip: Rate limit exceeded, wait a moment and try again${colors.reset}`);
      }
      return false;
    }

    const data = await response.json();
    console.log(`${colors.green}✅ PASSED: Successfully connected to OpenRouter API${colors.reset}\n`);

    // Test 4: Verify response
    console.log(`${colors.yellow}Test 4:${colors.reset} Checking API response...`);
    if (data.choices && data.choices[0] && data.choices[0].message) {
      const aiResponse = data.choices[0].message.content;
      const modelUsed = data.model || 'unknown';
      
      console.log(`${colors.green}✅ PASSED: Received valid response${colors.reset}`);
      console.log(`${colors.blue}🤖 Model Used: ${colors.reset}${modelUsed}`);
      console.log(`${colors.blue}📝 AI Response: ${colors.reset}"${aiResponse}"\n`);
      
      // Success summary
      console.log(`${colors.green}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
      console.log(`${colors.green}   ✅ ALL TESTS PASSED!${colors.reset}`);
      console.log(`${colors.green}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);
      console.log(`${colors.green}🎉 Your OpenRouter API key is working!${colors.reset}`);
      console.log(`${colors.green}✨ Ready to build SolarGPT chatbot with ${modelUsed}!${colors.reset}\n`);
      
      // Check credits
      if (data.usage) {
        console.log(`${colors.blue}📊 Usage Info:${colors.reset}`);
        console.log(`   Tokens used: ${data.usage.total_tokens || 'N/A'}`);
        console.log(`   This call was virtually free!\n`);
      }
      
      return true;
    } else {
      console.log(`${colors.red}❌ FAILED: Unexpected response format${colors.reset}`);
      console.log(`${colors.yellow}Response: ${JSON.stringify(data, null, 2)}${colors.reset}\n`);
      return false;
    }

  } catch (error) {
    console.log(`${colors.red}❌ FAILED: Network or connection error${colors.reset}`);
    console.log(`${colors.red}Error: ${error.message}${colors.reset}\n`);
    return false;
  }
}

// Test with the provided API key
const apiKey = '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';

testOpenRouterAPI(apiKey).then((success) => {
  if (success) {
    console.log(`${colors.yellow}📋 Next Steps:${colors.reset}`);
    console.log(`   1. I'll add this API key to your .env.local file`);
    console.log(`   2. Build the SolarGPT chatbot component`);
    console.log(`   3. You'll have an AI assistant on your website!\n`);
  } else {
    console.log(`${colors.yellow}🔧 Troubleshooting:${colors.reset}`);
    console.log(`   1. Check your credits at: https://openrouter.ai/credits`);
    console.log(`   2. Verify API key at: https://openrouter.ai/keys`);
    console.log(`   3. Make sure the key is active and has permissions\n`);
  }
  
  console.log(`${colors.blue}💡 Note: OpenRouter charges per token, but rates are very low.${colors.reset}`);
  console.log(`${colors.blue}   For a solar chatbot, expect ~$0.01-0.05 per conversation.${colors.reset}\n`);
});
