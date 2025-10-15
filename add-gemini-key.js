/**
 * Helper script to add Gemini API key to .env.local
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const colors = {
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
  reset: '\x1b[0m'
};

const envPath = path.join(__dirname, '.env.local');

async function addGeminiKey() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log(`\n${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  console.log(`${colors.blue}   🔑 Add Gemini API Key to .env.local${colors.reset}`);
  console.log(`${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

  rl.question('Paste your Gemini API key: ', (apiKey) => {
    apiKey = apiKey.trim();

    if (!apiKey) {
      console.log(`${colors.yellow}⚠️  No API key provided. Exiting...${colors.reset}\n`);
      rl.close();
      return;
    }

    // Read existing .env.local
    let envContent = '';
    if (fs.existsSync(envPath)) {
      envContent = fs.readFileSync(envPath, 'utf8');
    }

    // Check if GEMINI_API_KEY already exists
    if (envContent.includes('GEMINI_API_KEY=')) {
      // Replace existing key
      envContent = envContent.replace(
        /GEMINI_API_KEY=.*/,
        `GEMINI_API_KEY=${apiKey}`
      );
      console.log(`${colors.yellow}📝 Updated existing GEMINI_API_KEY${colors.reset}`);
    } else {
      // Add new key
      if (envContent && !envContent.endsWith('\n')) {
        envContent += '\n';
      }
      envContent += `\n# Gemini AI Configuration\nGEMINI_API_KEY=${apiKey}\n`;
      console.log(`${colors.green}✅ Added GEMINI_API_KEY to .env.local${colors.reset}`);
    }

    // Write back to file
    fs.writeFileSync(envPath, envContent);

    console.log(`${colors.green}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    console.log(`${colors.green}   ✅ Configuration Complete!${colors.reset}`);
    console.log(`${colors.green}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

    console.log(`${colors.yellow}📋 Next Steps:${colors.reset}`);
    console.log(`   1. Restart your dev server (Ctrl+C then npm run dev)`);
    console.log(`   2. I'll now build the SolarGPT chatbot component!`);
    console.log(`   3. You'll see it appear on your website\n`);

    rl.close();
  });
}

addGeminiKey();
