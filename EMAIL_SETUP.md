# 📧 Email Configuration Guide for Contact Form

## Why You Need This

Your website contact form sends emails to **ssystems952@gmail.com** when customers submit inquiries. For this to work, you need to give the website permission to send emails from your Gmail account.

---

## ⚠️ Important: Use App Password, Not Regular Password

**Never use your regular Gmail password** in the website code. Google requires "App Passwords" for security.

---

## 🔧 Step-by-Step Setup (5 Minutes)

### Step 1: Enable 2-Factor Authentication

1. Go to: **https://myaccount.google.com/security**
2. Look for **"2-Step Verification"**
3. If it says "Off" → Click it and **turn it ON**
4. Follow the prompts to set it up (you'll need your phone)
5. Once enabled, you're ready for Step 2

### Step 2: Generate App Password

1. Go to: **https://myaccount.google.com/apppasswords**
   - Or: Google Account → Security → 2-Step Verification → App passwords

2. If asked to sign in again, sign in with **ssystems952@gmail.com**

3. You'll see "App passwords" page

4. Under "Select app" → Choose **"Mail"**

5. Under "Select device" → Choose **"Windows Computer"** (or "Other")

6. Click **"Generate"**

7. Google will show you a **16-character password** like: `abcd efgh ijkl mnop`

8. **Copy this password** (you'll need it in next step)

### Step 3: Update Your Website Configuration

1. Open this file in your website folder:
   ```
   suntech-systems\.env.local
   ```

2. Find this line:
   ```env
   EMAIL_PASSWORD=your_app_specific_password_here
   ```

3. Replace `your_app_specific_password_here` with the 16-character password you just copied:
   ```env
   EMAIL_PASSWORD=abcd efgh ijkl mnop
   ```
   
   **Note**: You can include or remove the spaces - both work!

4. **Save the file**

5. **Restart your development server**:
   - Press `Ctrl+C` in the terminal
   - Run: `npm run dev` again

### Step 4: Test It!

1. Go to your website: http://localhost:3000

2. Scroll to the **Contact Form**

3. Fill it out with:
   - Your name
   - A test email (use your personal email)
   - Phone number
   - Message

4. Click **"Send Message"**

5. Check **two emails**:
   - Your company email: ssystems952@gmail.com (inquiry notification)
   - Your test email: (auto-reply confirmation)

6. If both emails arrived → **Success!** ✅

---

## 🔍 Complete .env.local File Should Look Like:

```env
# Email Configuration for Contact Form
EMAIL_USER=ssystems952@gmail.com
EMAIL_PASSWORD=abcdefghijklmnop
EMAIL_TO=ssystems952@gmail.com

# Company Details
NEXT_PUBLIC_COMPANY_PHONE=9771045001
NEXT_PUBLIC_COMPANY_EMAIL=ssystems952@gmail.com
NEXT_PUBLIC_COMPANY_NAME=Suntech Systems

# Site URL (update in production)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## 🛠️ Troubleshooting

### Problem: "Invalid login credentials"

**Solution**: 
- Make sure you copied the ENTIRE 16-character password
- Check for extra spaces or characters
- Generate a new app password and try again

### Problem: "2-Step Verification is not enabled"

**Solution**:
- You MUST enable 2-factor authentication first
- Go to: https://myaccount.google.com/security
- Turn on 2-Step Verification
- Then create app password

### Problem: "Cannot find App passwords option"

**Solution**:
- First enable 2-Step Verification
- Then the App passwords option will appear
- If still not visible, try this direct link: https://security.google.com/settings/security/apppasswords

### Problem: Emails not arriving

**Possible causes**:
1. Check spam/junk folder
2. Verify app password is correct
3. Make sure server is running (npm run dev)
4. Check browser console for errors (F12)

---

## 🔒 Security Notes

✅ **Safe**: App passwords are safe to use
✅ **Revocable**: You can delete app password anytime
✅ **Limited**: App password only works for email, not full account access
✅ **Separate**: Different from your main Gmail password

❌ **Never share**: Don't share the app password with anyone
❌ **Not in public**: Don't commit .env.local to GitHub (already in .gitignore)

---

## 📧 What Happens When Form is Submitted

1. **Customer fills form** on your website
2. **Website sends two emails**:
   - **To you** (ssystems952@gmail.com): 
     - Subject: "New Solar Inquiry from [Name]"
     - Contains: All customer details
     - Professional format with customer info
   
   - **To customer** (auto-reply):
     - Subject: "Thank you for your interest..."
     - Contains: Confirmation message
     - Your contact details
     - Professional branded email

3. **Customer sees success message** on website
4. **You respond** to the customer via email or phone

---

## 🚀 For Production Deployment

When deploying to Vercel/production:

1. **Don't include** `.env.local` file (it's in .gitignore)
2. **Add environment variables** in Vercel dashboard:
   - Go to: Project Settings → Environment Variables
   - Add: `EMAIL_PASSWORD` = your app password
   - Add all other variables from .env.local

3. **Keep app password secret** - never expose it publicly

---

## ✅ Checklist

Before marking as complete:

- [ ] 2-Factor Authentication is ON
- [ ] App password is generated
- [ ] .env.local file is updated
- [ ] Server is restarted
- [ ] Test email sent successfully
- [ ] Company received inquiry email
- [ ] Customer received auto-reply
- [ ] Both emails look professional

---

## 📞 Need Help?

If stuck:
1. Check Gmail Help: https://support.google.com/accounts/answer/185833
2. Verify all steps completed in order
3. Try generating a new app password
4. Check browser console (F12) for specific errors

---

**Once configured, the contact form will work perfectly!** 📧✅
