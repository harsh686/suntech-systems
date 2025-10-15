# 🚀 Complete Auto-Update System Setup Guide

This guide will set up the **complete auto-update system** that:
- ✅ Scrapes PM Surya Ghar subsidies daily
- ✅ Scrapes solar panel prices from multiple sources
- ✅ Calculates daily averages (40k-55k range)
- ✅ Stores all data in Supabase
- ✅ Updates calculator automatically

---

## 📋 Step 1: Create Supabase Account (5 minutes)

### 1.1 Sign Up
- Go to https://supabase.com
- Click **"Start your project"**
- Sign up with GitHub (recommended)

### 1.2 Create Project
- Click **"New project"**
- **Organization**: Create new or select existing
- **Name**: `suntech-systems`
- **Database Password**: Generate strong password (save it!)
- **Region**: India (South Asia) - for faster queries
- **Pricing Plan**: Free ($0/month, 500 MB database)
- Click **"Create new project"**
- ⏳ Wait 2-3 minutes for project creation

### 1.3 Get API Credentials
Once project is ready:
- Go to **Settings** (⚙️ icon in sidebar)
- Click **API**
- Copy these 3 values:

```
Project URL: https://xxxxxxxx.supabase.co
anon/public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ **IMPORTANT**: Keep `service_role` key SECRET! Never commit to GitHub.

---

## 📊 Step 2: Run Database Schema (2 minutes)

### 2.1 Open SQL Editor
- In Supabase dashboard, click **SQL Editor** (📝 icon)
- Click **"New query"**

### 2.2 Paste Schema
- Open `supabase/schema.sql` from your project
- Copy entire file (1000+ lines)
- Paste into SQL Editor
- Click **"Run"** button (or press Ctrl+Enter)

### 2.3 Verify Success
You should see:
```
✅ Supabase database schema created successfully!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Created tables:
  ✓ central_subsidies
  ✓ state_subsidies
  ✓ solar_prices
  ✓ price_history
  ✓ scraper_logs

Created views:
  ✓ latest_central_subsidy
  ✓ latest_prices
  ✓ active_state_subsidies

Created functions:
  ✓ get_calculator_data()

Sample data inserted:
  ✓ PM Surya Ghar subsidy: ₹30k/kW, ₹18k/kW, ₹78k max
  ✓ 14 special category states
  ✓ Default prices: ₹45k residential, ₹50k commercial
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 2.4 Check Tables
- Click **Table Editor** (📊 icon)
- You should see 5 tables:
  - `central_subsidies` (1 row with PM Surya Ghar rates)
  - `state_subsidies` (14 rows with special category states)
  - `solar_prices` (2 rows: residential + commercial)
  - `price_history` (empty - will fill with scraping)
  - `scraper_logs` (empty - will fill with cron runs)

---

## 🔐 Step 3: Add Environment Variables to Vercel (3 minutes)

### 3.1 Go to Vercel Project Settings
- Open https://vercel.com
- Navigate to your project: **suntech-systems**
- Click **Settings** tab
- Click **Environment Variables** in sidebar

### 3.2 Add 4 Variables

#### Variable 1: NEXT_PUBLIC_SUPABASE_URL
```
Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://xxxxxxxx.supabase.co (your Project URL from Step 1.3)
Environments: ✅ Production ✅ Preview ✅ Development
```

#### Variable 2: NEXT_PUBLIC_SUPABASE_ANON_KEY
```
Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOi... (your anon key from Step 1.3)
Environments: ✅ Production ✅ Preview ✅ Development
```

#### Variable 3: SUPABASE_SERVICE_ROLE_KEY
```
Name: SUPABASE_SERVICE_ROLE_KEY
Value: eyJhbGciOi... (your service_role key from Step 1.3)
Environments: ✅ Production ✅ Preview ✅ Development
```

#### Variable 4: CRON_SECRET
```
Name: CRON_SECRET
Value: [Generate random string - see below]
Environments: ✅ Production ✅ Preview ✅ Development
```

**Generate CRON_SECRET:**
Run in PowerShell:
```powershell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})
```
Example output: `aB3xK9mP2qR7sT1vW5yZ8cD4eF6gH0iJ`

### 3.3 Redeploy
- After adding all 4 variables, go to **Deployments** tab
- Click **"Redeploy"** on the latest deployment
- ⏳ Wait 2-3 minutes for deployment

---

## ✅ Step 4: Test Price Scraper (5 minutes)

### 4.1 Run Test Locally
```powershell
cd "c:\Users\Harshvardhan singh\Documents\note\suntech-systems"
node test-price-scraper.js
```

### 4.2 Expected Output
```
🚀 Testing Solar Price Scraper...

📊 Test 1: Scraping IndiaMART...
✅ IndiaMART: Found 5 prices
   Range: ₹40,000 - ₹55,000/kW

📊 Test 2: Scraping Tata Power Solar...
✅ Tata Power: Found 3 prices
   Range: ₹45,000 - ₹60,000/kW

📊 Test 3: Calculating Averages...
✅ Results:
   Total sources: 8
   Min price: ₹40,000/kW
   Max price: ₹60,000/kW
   Average: ₹47,500/kW

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Price scraper test completed!
📸 Screenshots saved:
   - test-indiamart.png
   - test-tata.png
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 4.3 Check Screenshots
Open `test-indiamart.png` and `test-tata.png` to verify scraping is working.

---

## 🔄 Step 5: Test Cron Job Manually (5 minutes)

### 5.1 Trigger Cron Job
Run in PowerShell (replace YOUR-CRON-SECRET with value from Step 3.2):
```powershell
$headers = @{
    "Authorization" = "Bearer YOUR-CRON-SECRET"
}
Invoke-RestMethod -Uri "https://suntech-systems.vercel.app/api/cron/update-data" -Headers $headers -Method Get
```

### 5.2 Expected Response
```json
{
  "success": true,
  "status": "success",
  "results": {
    "subsidies": {
      "upTo2kW": 30000,
      "from2To3kW": 18000,
      "above3kW": 78000,
      "specialBonus": 10
    },
    "prices": {
      "residential": 45000,
      "commercial": 50000
    }
  },
  "duration": "25.43s",
  "timestamp": "2025-01-16T12:30:45.123Z"
}
```

### 5.3 Verify in Supabase
- Go to Supabase **Table Editor**
- Check `scraper_logs` table:
  - Should see 2 new rows (pm_surya_ghar + prices)
  - Status: `success`
  - Duration: ~20-30 seconds
- Check `solar_prices` table:
  - Should see updated prices with today's date
- Check `price_history` table:
  - Should see individual price records from each source

---

## 🎯 Step 6: Update Calculator to Use Supabase (10 minutes)

### 6.1 Modify SolarCalculator.tsx
Open `components/SolarCalculator.tsx` and find the line:
```typescript
const costPerKW = formData.propertyType === 'residential' ? 45000 : 50000;
```

Replace with:
```typescript
const [priceData, setPriceData] = useState({ residential: 45000, commercial: 50000 });

// Fetch latest prices on mount
useEffect(() => {
  async function fetchPrices() {
    try {
      const { getLatestPrices } = await import('@/lib/supabase/client');
      const prices = await getLatestPrices();
      
      setPriceData({
        residential: prices.residential?.average_price || 45000,
        commercial: prices.commercial?.average_price || 50000
      });
    } catch (error) {
      console.error('Failed to fetch prices:', error);
      // Keep default values
    }
  }
  
  fetchPrices();
}, []);

const costPerKW = formData.propertyType === 'residential' 
  ? priceData.residential 
  : priceData.commercial;
```

### 6.2 Commit and Deploy
```powershell
git add .
git commit -m "feat: integrate Supabase price fetching in calculator"
git push origin main
```

Vercel will automatically deploy (2-3 minutes).

---

## 🕐 Step 7: Verify Daily Cron Job (Automatic)

The cron job is configured in `vercel.json`:
```json
{
  "crons": [{
    "path": "/api/cron/update-data",
    "schedule": "0 2 * * *"
  }]
}
```

This means:
- **Runs daily at 2:00 AM IST**
- Automatically scrapes subsidies + prices
- Updates Supabase database
- Calculator will show latest data

### 7.1 Monitor Cron Job
- Go to Vercel dashboard → **Cron Jobs** tab
- You'll see:
  - Next execution: Tomorrow at 2:00 AM
  - Last execution: (after first run)
  - Success/failure status

### 7.2 Check Logs
- After first cron run (wait until tomorrow 2 AM), click on execution
- View logs:
  ```
  🚀 Cron job started: 2025-01-17T02:00:00.000Z
  📋 Step 1: Scraping PM Surya Ghar subsidies...
  ✅ Subsidies scraped and saved
  💰 Step 2: Scraping solar panel prices...
  ✅ Prices scraped and saved
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ✅ Cron job completed: SUCCESS
  ⏱️  Duration: 28.45s
  📊 Subsidies: Updated
  💰 Prices: Updated
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ```

---

## 📊 Where Data is Added in Supabase

### Table: `central_subsidies`
**Location**: Supabase → Table Editor → central_subsidies
**Updated by**: PM Surya Ghar scraper
**Frequency**: Daily at 2 AM
**Data**:
```
| id | up_to_2kw | from_2_to_3kw | above_3kw | special_category_bonus | last_updated | is_active |
|----|-----------|---------------|-----------|------------------------|--------------|-----------|
| 1  | 30000     | 18000         | 78000     | 10                     | 2025-01-16   | true      |
```

### Table: `solar_prices`
**Location**: Supabase → Table Editor → solar_prices
**Updated by**: Price scraper (IndiaMART, Tata, Luminous)
**Frequency**: Daily at 2 AM
**Data**:
```
| id | property_type | price_per_kw | min_price | max_price | total_sources | source_names | scrape_date |
|----|---------------|--------------|-----------|-----------|---------------|--------------|-------------|
| 1  | residential   | 45000        | 40000     | 55000     | 3             | [IndiaMART,  | 2025-01-16  |
|    |               |              |           |           |               |  Tata,       |             |
|    |               |              |           |           |               |  Luminous]   |             |
| 2  | commercial    | 50000        | 45000     | 60000     | 2             | [IndiaMART,  | 2025-01-16  |
|    |               |              |           |           |               |  Tata]       |             |
```

### Table: `price_history`
**Location**: Supabase → Table Editor → price_history
**Updated by**: Price scraper (individual source records)
**Frequency**: Daily at 2 AM
**Data**:
```
| id | source_name | property_type | price_per_kw | system_size_kw | includes | scraped_at |
|----|-------------|---------------|--------------|----------------|----------|------------|
| 1  | IndiaMART   | residential   | 42000        | 3              | [Panels] | 2025-01-16 |
| 2  | Tata Power  | residential   | 48000        | 5              | [Full]   | 2025-01-16 |
| 3  | Luminous    | residential   | 45000        | 4              | [Basic]  | 2025-01-16 |
```

### Table: `scraper_logs`
**Location**: Supabase → Table Editor → scraper_logs
**Updated by**: All scrapers (monitoring)
**Frequency**: Every scraper run
**Data**:
```
| id | scraper_type   | status  | items_scraped | errors | duration_ms | executed_at |
|----|----------------|---------|---------------|--------|-------------|-------------|
| 1  | pm_surya_ghar  | success | 1             | null   | 15240       | 2025-01-16  |
| 2  | prices         | success | 5             | null   | 23450       | 2025-01-16  |
```

---

## 🎉 Success! What You've Built

### ✅ Automated Data Pipeline
- **PM Surya Ghar subsidies** scraped daily from official portal
- **Solar panel prices** scraped from 3 sources (IndiaMART, Tata, Luminous)
- **Daily averages** calculated automatically (handles 40k-55k fluctuations)
- **Database storage** in Supabase with full history

### ✅ Live Calculator Updates
- Calculator now fetches **real-time prices** from Supabase
- Shows **latest subsidy rates** from PM Surya Ghar
- Updates **automatically** every day without manual intervention

### ✅ Monitoring & Transparency
- `scraper_logs` table shows all executions
- `price_history` tracks which source reported which price
- Vercel cron dashboard shows execution status

---

## 🐛 Troubleshooting

### Issue: Cron job returns 401 Unauthorized
**Solution**: Check `CRON_SECRET` environment variable matches in:
1. Vercel environment variables
2. Your PowerShell test command

### Issue: Prices not updating
**Solution**:
1. Check Vercel → Cron Jobs tab for errors
2. Check Supabase → scraper_logs table for failure reasons
3. Run `node test-price-scraper.js` locally to debug

### Issue: Calculator shows default prices
**Solution**:
1. Check Supabase → solar_prices table has data
2. Verify `NEXT_PUBLIC_SUPABASE_URL` is correct (must start with https://)
3. Check browser console for errors

### Issue: Database connection failed
**Solution**:
1. Verify all 3 Supabase environment variables are set
2. Check Supabase project is not paused (free tier pauses after 7 days inactivity)
3. Test connection: https://suntech-systems.vercel.app/api/cron/update-data

---

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Check Supabase SQL Editor → Logs
3. Run test scripts locally: `node test-scraper-simple.js` and `node test-price-scraper.js`
4. Check screenshots: `pmsuryaghar-screenshot.png`, `test-indiamart.png`

---

**🎯 Next Steps:**
1. Complete Step 1-3 (Supabase setup + environment variables)
2. Test manually with Step 4-5
3. Deploy calculator update (Step 6)
4. Wait for first cron run tomorrow at 2 AM
5. Monitor daily in Supabase Table Editor

**Everything is ready! Just follow these steps and your auto-update system will be live.** 🚀
