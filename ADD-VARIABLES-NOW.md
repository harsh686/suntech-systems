# 🎯 Add Environment Variables - Step by Step

## ✅ You're on the Right Page!

You're seeing "Environment Variables" - perfect!

---

## 📝 **What to Do NOW:**

### **You see a form with:**
- Key: `[CLIENT_KEY...]` (placeholder text)
- Value: (empty field)
- Environments dropdown: "All Environments"

---

## **Step 1: Add First Variable (OPENROUTER_API_KEY)**

### **Clear the Key field and type:**
```
OPENROUTER_API_KEY
```

### **Click in Value field and paste:**
```
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
```

### **Environments dropdown:**
- Should say "All Environments" ✓ (perfect!)
- If not, click dropdown and select all 3 checkboxes

### **Click:** "Save" button (bottom right)

---

## **Step 2: Add Second Variable (OPENROUTER_MODEL)**

### **Click:** "+ Add Another" button

### **In Key field, type:**
```
OPENROUTER_MODEL
```

### **In Value field, paste:**
```
google/gemini-2.5-flash-preview-09-2025
```

### **Environments:** "All Environments" ✓

### **Click:** "Save"

---

## **Step 3: Add Third Variable (EMAIL_USER)**

### **Click:** "+ Add Another" button

### **In Key field, type:**
```
EMAIL_USER
```

### **In Value field, type:**
```
ssystems952@gmail.com
```

### **Environments:** "All Environments" ✓

### **Click:** "Save"

---

## **Step 4: Add Fourth Variable (EMAIL_PASSWORD)**

### **Click:** "+ Add Another" button

### **In Key field, type:**
```
EMAIL_PASSWORD
```

### **In Value field, type:**
```
temp
```
*(We'll update this later with real Gmail app password)*

### **Environments:** "All Environments" ✓

### **Click:** "Save"

---

## ✅ **After All Variables Added:**

### **You should see 4 variables listed:**

```
✓ OPENROUTER_API_KEY     sk-or-v1-9230838e...
✓ OPENROUTER_MODEL       google/gemini-2.5-flash...
✓ EMAIL_USER             ssystems952@gmail.com
✓ EMAIL_PASSWORD         ••••
```

---

## **Step 5: Redeploy (CRITICAL!)**

### **After saving all variables:**

1. **Click:** "Deployments" tab (top menu bar)
2. **Find:** Latest deployment (first item in list)
3. **Look for:** Three dots "..." on the right side
4. **Click:** "..." → "Redeploy"
5. **Modal opens:**
   - ☑ Check "Use existing Build Cache"
   - Click "Redeploy" button
6. **Wait:** 30-60 seconds
7. **See:** "Ready" status with ✓

---

## 🎉 **Test Your Chatbot:**

### **After redeployment completes:**

1. **Go to your live website** (the Vercel URL)
2. **Look bottom right:** Orange spinning sun icon
3. **Click:** The sun icon
4. **Chat opens:** "Suntech Advisor" header
5. **Type:** "What are solar costs in India?"
6. **Press:** Send or Enter
7. **Should respond** with helpful info! ✅

---

## 📋 **Quick Copy-Paste Reference:**

### **Variable 1:**
```
Key: OPENROUTER_API_KEY
Value: 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
```

### **Variable 2:**
```
Key: OPENROUTER_MODEL
Value: google/gemini-2.5-flash-preview-09-2025
```

### **Variable 3:**
```
Key: EMAIL_USER
Value: ssystems952@gmail.com
```

### **Variable 4:**
```
Key: EMAIL_PASSWORD
Value: temp
```

---

## ⚡ **Important Notes:**

### **About "Sensitive" toggle:**
- Leave it "Disabled" (grayed out) - that's fine!
- Vercel encrypts all environment variables automatically

### **About "All Environments":**
- Make sure this is selected for all variables!
- Should show "All Environments" in the dropdown
- Ensures variables work in Production, Preview, and Development

---

## 🎯 **Checklist:**

**Right now:**

- [ ] Clear "CLIENT_KEY" placeholder
- [ ] Type: OPENROUTER_API_KEY
- [ ] Paste API key value
- [ ] Verify "All Environments" selected
- [ ] Click "Save"
- [ ] Click "+ Add Another"
- [ ] Repeat for OPENROUTER_MODEL
- [ ] Click "+ Add Another"
- [ ] Repeat for EMAIL_USER
- [ ] Click "+ Add Another"
- [ ] Repeat for EMAIL_PASSWORD
- [ ] Go to Deployments tab
- [ ] Click "..." → Redeploy
- [ ] Wait for "Ready" ✓
- [ ] Test chatbot! 🎉

---

**Start by clearing that placeholder text and typing: OPENROUTER_API_KEY**

**Then paste the API key value!**

**Tell me when you've saved all 4 variables!** 😊
