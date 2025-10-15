# 🎯 Quick Testing Guide

## How to Test Scrapers Without Opening Browser on Your Machine

### 🌐 Admin Dashboard (Recommended)

**URL:** https://suntech-systems.vercel.app/admin/scrapers

**What it does:**
- ✅ Runs scrapers on **Vercel's server** (not your machine)
- ✅ **Headless mode** - No visible browser window
- ✅ Tests the exact same code that runs daily at 2 AM
- ✅ Shows real-time results with all extracted data

**How to use:**

1. **Go to admin dashboard:**
   ```
   https://suntech-systems.vercel.app/admin/scrapers
   ```

2. **Enter TEST_PASSWORD:**
   - This is set in Vercel environment variables
   - Protects the test endpoint from unauthorized access

3. **Click "Run Test":**
   - Scrapers start executing on server
   - Takes 20-40 seconds
   - You'll see live results

4. **View results:**
   - ✅ PM Surya Ghar subsidy rates
   - ✅ Solar panel prices (min/max/average)
   - ✅ Sources count
   - ✅ Execution time

---

## 🔍 What Gets Scraped

### 1. PM Surya Ghar Scraper
**Source:** https://pmsuryaghar.gov.in/

**Extracts:**
- ₹30,000/kW (up to 2 kW)
- ₹18,000/kW (2-3 kW)
- ₹78,000 (maximum cap above 3 kW)
- +10% special category bonus

**Frequency:** Daily at 2 AM

### 2. Solar Price Scraper
**Sources:**
- IndiaMART (marketplace)
- Tata Power Solar (manufacturer)
- Luminous (installer)

**Extracts:**
- Residential average (₹40k-₹55k range)
- Commercial average (₹45k-₹60k range)
- Min/Max prices
- Number of sources

**Frequency:** Daily at 2 AM

---

## 📊 Where Data Goes (Supabase)

### Tables Updated Daily:

1. **`central_subsidies`** - PM Surya Ghar rates
2. **`solar_prices`** - Daily price averages
3. **`price_history`** - Individual source prices
4. **`scraper_logs`** - Execution logs

**View data:**
- Supabase Dashboard → Table Editor
- Or use the admin dashboard test results

---

## ⚙️ How It Runs Automatically

### Vercel Cron Job

**Schedule:** `0 2 * * *` (Daily at 2:00 AM IST)

**What happens:**
1. Vercel triggers `/api/cron/update-data`
2. Scrapes PM Surya Ghar for subsidies
3. Scrapes 3 sources for prices
4. Calculates averages
5. Saves to Supabase
6. Logs execution

**Mode:** Headless (no browser visible anywhere)

**Check status:**
- Vercel Dashboard → Cron Jobs tab
- Supabase → `scraper_logs` table

---

## 🧪 API Testing (Advanced)

### Test Scraper API
```powershell
# Test scrapers manually
$headers = @{
    "Authorization" = "Bearer YOUR_TEST_PASSWORD"
}
Invoke-RestMethod -Uri "https://suntech-systems.vercel.app/api/test-scrapers" -Headers $headers -Method Get
```

**Response:**
```json
{
  "success": true,
  "status": "all_passed",
  "results": {
    "subsidyScraper": {
      "status": "success",
      "data": {
        "upTo2kW": 30000,
        "from2To3kW": 18000,
        "above3kW": 78000
      },
      "duration": 15234
    },
    "priceScraper": {
      "status": "success",
      "data": {
        "residential": { "average": 45000, "min": 40000, "max": 55000 },
        "commercial": { "average": 50000, "min": 45000, "max": 60000 }
      },
      "duration": 23456
    }
  },
  "totalDuration": "38.69s"
}
```

---

## 🐛 Troubleshooting

### Issue: "Unauthorized" error
**Fix:** Check TEST_PASSWORD environment variable in Vercel

### Issue: Scraper timeout
**Fix:** 
- Vercel free tier has 10-second timeout
- Upgrade to Pro for 60-second timeout
- Or reduce number of sources

### Issue: No data found
**Fix:**
1. Check admin dashboard test results
2. View Supabase `scraper_logs` for errors
3. Check if websites changed their HTML structure

### Issue: Prices seem wrong
**Fix:**
- Run test multiple times (prices fluctuate)
- Check `price_history` table for individual source prices
- Verify sources are accessible

---

## 📈 Monitor Daily Updates

### Check if cron job ran successfully:

**Method 1: Vercel Dashboard**
- Go to your Vercel project
- Click "Cron Jobs" tab
- View execution history

**Method 2: Supabase Logs**
- Open Supabase dashboard
- Go to Table Editor → `scraper_logs`
- Sort by `executed_at` DESC
- Check latest entries

**Method 3: Check Data Tables**
- `solar_prices` table → filter by `scrape_date = today`
- Should see 2 rows (residential + commercial)

---

## 🎯 Key Points

✅ **Headless Mode:** Scrapers run without visible browser
✅ **Server-Side:** Runs on Vercel, not your machine
✅ **Daily Updates:** Automatic at 2 AM IST
✅ **Easy Testing:** Admin dashboard for manual tests
✅ **Full Transparency:** All data visible in Supabase

**No browser will open on your machine!** Everything happens on the server. 🚀
