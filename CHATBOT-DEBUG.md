# 🔧 Chatbot Troubleshooting - "Having trouble connecting"

## 🔍 **I See the Issue!**

The chatbot shows:
> "Sorry, I'm having trouble connecting. Please try again or call us at 9771045001."

This means the API call is failing. Let's debug!

---

## ✅ **First: Verify Redeployment Completed**

### **Did you click the "Redeploy" button?**

**Check deployment status:**

1. **Open new tab:** Go to Vercel dashboard
2. **Go to:** Deployments tab
3. **Look at latest deployment:**
   - Should show: "Ready" with green ✓
   - Should be 0-2 minutes old
   - Should NOT say "Building..." or "Queued"

**If it says "Building..." or "Queued":**
- ⏳ Wait for it to finish (30-60 seconds)
- Then test chatbot again

**If latest deployment is old (3+ minutes ago):**
- ❌ You might not have clicked Redeploy!
- Go back and click "Redeploy" button

---

## 🔍 **Check Environment Variables in Vercel**

### **Verify variables are saved correctly:**

1. **Go to:** Settings → Environment Variables
2. **Verify you see ALL 4 variables:**

```
✓ OPENROUTER_API_KEY     sk-or-v1-9230838e...
✓ OPENROUTER_MODEL       google/gemini-2.5-flash...
✓ EMAIL_USER             ssystems952@gmail.com
✓ EMAIL_PASSWORD         ••••••••
```

3. **Click "..." next to OPENROUTER_API_KEY**
4. **Click "Edit"**
5. **Verify value is correct:**
   ```
   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
   ```
   - No extra spaces before/after
   - Complete key (starts with sk-or-v1-)
   - All 3 environments checked ✓

6. **Do same for OPENROUTER_MODEL:**
   ```
   google/gemini-2.5-flash-preview-09-2025
   ```

---

## 🐛 **Debug Steps:**

### **Step 1: Check Browser Console**

**On your live website:**

1. **Press:** F12 (opens Developer Tools)
2. **Click:** "Console" tab
3. **Look for errors** (red text)
4. **Take screenshot** or tell me what errors you see

**Common errors:**
- ❌ "OPENROUTER_API_KEY is not defined" → Variable not deployed
- ❌ "401 Unauthorized" → API key incorrect
- ❌ "404 Not Found" → Model name incorrect
- ❌ "Network error" → API endpoint issue

---

### **Step 2: Check Network Tab**

**In Developer Tools (F12):**

1. **Click:** "Network" tab
2. **Click chatbot** and send message
3. **Look for:** Request to `/api/chat`
4. **Click on it**
5. **Check:**
   - Status: Should be 200 (OK)
   - If 500 (Error): Check Response tab for error message
   - If 401: API key issue
   - If 404: Endpoint not found

---

### **Step 3: Check Build Logs**

**In Vercel dashboard:**

1. **Go to:** Deployments tab
2. **Click:** Latest deployment
3. **Click:** "View Function Logs" or "Building"
4. **Look for errors** during build

**Common build errors:**
- Missing dependencies
- TypeScript errors
- Environment variable issues

---

## 🔧 **Quick Fixes:**

### **Fix 1: Hard Refresh Browser**

**Your browser might be caching old version:**

1. **Press:** Ctrl + Shift + R (Windows)
2. **Or:** Cmd + Shift + R (Mac)
3. **Or:** Shift + F5
4. **Test chatbot again**

---

### **Fix 2: Verify API Key is Valid**

**Test the API key directly:**

1. **Open:** PowerShell terminal in VS Code
2. **Run this command:**

```powershell
cd "C:\Users\Harshvardhan singh\Documents\note\suntech-systems"
node test-openrouter-api.js
```

**Expected output:**
```
✅ OpenRouter API is working!
Response: [AI response text]
```

**If this works locally but not on Vercel:**
- Environment variables not deployed correctly
- Need to redeploy

---

### **Fix 3: Redeploy Again (Force Refresh)**

**Sometimes Vercel needs a second redeploy:**

1. **Go to:** Vercel → Deployments
2. **Click:** "..." on latest deployment
3. **Click:** "Redeploy"
4. **UNCHECK:** "Use existing Build Cache" ← Important!
5. **Click:** "Redeploy"
6. **Wait:** 1-2 minutes (full rebuild)

---

### **Fix 4: Check Variable Names (Case Sensitive!)**

**Environment variables must match EXACTLY:**

```
Correct: OPENROUTER_API_KEY
Wrong:   openrouter_api_key
Wrong:   OpenRouter_API_Key
Wrong:   OPENROUTER_APIKEY
```

**Verify in Vercel Settings → Environment Variables:**
- Names are ALL CAPS
- Underscore, not hyphen
- No typos

---

## 🎯 **Most Likely Issue:**

### **You added variables but didn't redeploy!**

**The blue popup said:**
> "A new deployment is needed for changes to take effect"

**Solution:**
1. **Go to:** Vercel → Deployments tab
2. **Click:** "..." next to latest deployment
3. **Click:** "Redeploy"
4. **Wait for "Ready" ✓**
5. **Hard refresh browser** (Ctrl + Shift + R)
6. **Test chatbot**

---

## 📊 **Checklist:**

**Verify each step:**

- [ ] Added OPENROUTER_API_KEY in Vercel ✓
- [ ] Added OPENROUTER_MODEL in Vercel ✓
- [ ] Selected "All Environments" for both ✓
- [ ] Clicked "Save" for each ✓
- [ ] **Clicked "Redeploy" button** ← Did you do this?
- [ ] Waited for "Ready" status ✓
- [ ] Hard refreshed browser (Ctrl + Shift + R)
- [ ] Tested chatbot again

---

## 🆘 **Tell Me:**

1. **Did you click "Redeploy" after adding variables?**
2. **What does latest deployment show?**
   - "Ready" with green ✓?
   - "Building..."?
   - How old is it?

3. **Press F12 on your website, click Console tab**
   - Any red errors?
   - What do they say?

4. **Test API locally:**
   - Run: `node test-openrouter-api.js`
   - Does it work?

---

**Most likely you just need to click "Redeploy"! Tell me the status of your latest deployment!** 😊
