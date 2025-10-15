# 🔧 Fix Chatbot & Email - Add Environment Variables

## ✅ Current Status:
- Website is LIVE! 🎉
- All sections working ✓
- Chatbot not working (needs API key)
- Email not working (needs Gmail password)

---

## 🎯 **Quick Fix: Add Environment Variables (3 minutes)**

### **Step 1: Go to Settings**

**In your Vercel dashboard:**

1. **Make sure you're on the suntech-systems project**
2. **Click:** "Settings" tab (top menu bar)
3. **Click:** "Environment Variables" (left sidebar)

**OR direct link:**
```
vercel.com/harsh686/suntech-systems/settings/environment-variables
```

---

### **Step 2: Add Environment Variables**

**Click:** "+ Add New" button (or "Add Another")

---

#### **Variable 1: OPENROUTER_API_KEY** (CRITICAL for chatbot)

**Click "Add New" and enter:**

```
Name: OPENROUTER_API_KEY

Value: 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

Environment: 
  ☑ Production
  ☑ Preview
  ☑ Development
```

**Click:** "Save"

---

#### **Variable 2: OPENROUTER_MODEL** (CRITICAL for chatbot)

**Click "Add New" and enter:**

```
Name: OPENROUTER_MODEL

Value: google/gemini-2.5-flash-preview-09-2025

Environment: 
  ☑ Production
  ☑ Preview
  ☑ Development
```

**Click:** "Save"

---

#### **Variable 3: EMAIL_USER** (for contact form)

**Click "Add New" and enter:**

```
Name: EMAIL_USER

Value: ssystems952@gmail.com

Environment: 
  ☑ Production
  ☑ Preview
  ☑ Development
```

**Click:** "Save"

---

#### **Variable 4: EMAIL_PASSWORD** (for contact form - optional for now)

**Click "Add New" and enter:**

```
Name: EMAIL_PASSWORD

Value: your_gmail_app_password_here

Environment: 
  ☑ Production
  ☑ Preview
  ☑ Development
```

**Note:** You can leave this blank or put "temp" for now. Contact form will show error but chatbot will work!

**Click:** "Save"

---

### **Step 3: Redeploy (IMPORTANT!)**

**After adding ALL variables:**

1. **Click:** "Deployments" tab (top menu)
2. **Find:** Latest deployment (top item in list)
3. **Click:** "..." (three dots on the right side)
4. **Select:** "Redeploy"
5. **Modal will appear:**
   - ☑ Check "Use existing Build Cache" (faster)
   - Click "Redeploy" button
6. **Wait:** 30-60 seconds

---

### **Step 4: Verify Chatbot Works!**

**After redeployment completes:**

1. **Go to your live website**
2. **Look for:** Orange sun icon (bottom right corner)
3. **Click:** The sun icon
4. **Chat opens:** "Suntech Advisor"
5. **Type:** "What are solar panel costs?"
6. **Press:** Send

**Expected:** Should respond with helpful solar info! ✅

---

## 🎯 **Visual Guide for Environment Variables:**

### **What you should see in Settings → Environment Variables:**

```
Environment Variables
─────────────────────────────────────

+ Add New

┌─────────────────────────────────────────────────────┐
│ OPENROUTER_API_KEY                                  │
│ sk-or-v1-9230838e...                                │
│ Production, Preview, Development                     │
│                                            [Edit]    │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ OPENROUTER_MODEL                                    │
│ google/gemini-2.5-flash-preview-09-2025             │
│ Production, Preview, Development                     │
│                                            [Edit]    │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ EMAIL_USER                                          │
│ ssystems952@gmail.com                               │
│ Production, Preview, Development                     │
│                                            [Edit]    │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ EMAIL_PASSWORD                                      │
│ •••••••••••                                         │
│ Production, Preview, Development                     │
│                                            [Edit]    │
└─────────────────────────────────────────────────────┘
```

---

## ⚡ **Quick Troubleshooting:**

### **If chatbot still doesn't work after redeploy:**

1. **Check environment variables:**
   - Settings → Environment Variables
   - Verify OPENROUTER_API_KEY is saved
   - Look for typos (no extra spaces)

2. **Check deployment status:**
   - Deployments tab
   - Latest deployment should show "Ready" ✓
   - Look at build logs for errors

3. **Hard refresh your browser:**
   - Press: Ctrl + Shift + R (Windows)
   - Or: Cmd + Shift + R (Mac)
   - Clears cache

4. **Check console:**
   - Press F12 in browser
   - Click "Console" tab
   - Look for any red error messages
   - Should NOT see "OPENROUTER_API_KEY is not defined"

---

## 📧 **About Email (Contact Form):**

### **Why it's not working:**

You need to create a **Gmail App Password** (not your regular password).

### **How to fix (takes 2 minutes):**

#### **Step 1: Enable 2-Factor Authentication**

1. **Go to:** https://myaccount.google.com/security
2. **Sign in** with: ssystems952@gmail.com
3. **Find:** "2-Step Verification"
4. **Turn it ON** if not already enabled

#### **Step 2: Create App Password**

1. **Go to:** https://myaccount.google.com/apppasswords
2. **Select:**
   - App: Mail
   - Device: Windows Computer (or Other)
3. **Click:** "Generate"
4. **Copy:** 16-character password (like: abcd efgh ijkl mnop)

#### **Step 3: Add to Vercel**

1. **Go to:** Settings → Environment Variables
2. **Find:** EMAIL_PASSWORD
3. **Click:** "Edit" (or add new if not there)
4. **Paste:** The 16-character app password
5. **Save** and **Redeploy**

---

## 🎯 **Priority Actions:**

### **Do NOW (chatbot fix):**

✅ **Step 1:** Add OPENROUTER_API_KEY
✅ **Step 2:** Add OPENROUTER_MODEL
✅ **Step 3:** Redeploy (wait 1 min)
✅ **Step 4:** Test chatbot on live site

**Time:** 3 minutes
**Result:** Chatbot works! 🎉

---

### **Do LATER (email fix - when you get first inquiry):**

⏳ **Step 1:** Enable 2FA on Gmail
⏳ **Step 2:** Generate app password
⏳ **Step 3:** Add to Vercel
⏳ **Step 4:** Redeploy

**Time:** 5 minutes
**Result:** Contact form sends emails! 📧

---

## ✅ **Success Criteria:**

### **After adding variables and redeploying:**

**Chatbot should:**
- ✅ Open when clicking sun icon
- ✅ Show "Suntech Advisor" header
- ✅ Respond to questions
- ✅ No error messages
- ✅ Clean formatting (no ** or |)

**Calculator should:**
- ✅ Already working (no changes needed)

**Contact form:**
- ⚠️ Won't work until Gmail app password added
- Calculator and chatbot work fine without it!

---

## 🚀 **Copy-Paste Values:**

### **For easy copying:**

```
Variable 1:
Name: OPENROUTER_API_KEY
Value: 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

Variable 2:
Name: OPENROUTER_MODEL
Value: google/gemini-2.5-flash-preview-09-2025

Variable 3:
Name: EMAIL_USER
Value: ssystems952@gmail.com

Variable 4:
Name: EMAIL_PASSWORD
Value: (generate app password first)
```

---

## 📝 **Checklist:**

**Right now:**

- [ ] Go to Settings → Environment Variables
- [ ] Add OPENROUTER_API_KEY (copy from above)
- [ ] Add OPENROUTER_MODEL (copy from above)
- [ ] Add EMAIL_USER (copy from above)
- [ ] Add EMAIL_PASSWORD (put "temp" or leave blank)
- [ ] Select all 3 environments for each
- [ ] Save all variables
- [ ] Go to Deployments tab
- [ ] Click "..." → Redeploy
- [ ] Wait 1 minute
- [ ] Test chatbot on live site! 🎉

---

**What's your live URL? I'll test it after you add the variables!** 😊

**Or tell me if you need help finding the Settings page!**
