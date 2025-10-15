# 🔧 Contact Form Setup - Quick Fix

## ⚠️ Current Issue
Your contact form backend is **already created** but needs email configuration to work.

---

## ✅ Backend Status
- ✅ API endpoint created: `/api/contact`
- ✅ Email templates ready (company + auto-reply)
- ✅ Form validation implemented
- ⚠️ **NEEDS**: Gmail App Password

---

## 🚀 Quick Fix (5 Minutes)

### Step 1: Generate Gmail App Password

1. **Open this link**: https://myaccount.google.com/apppasswords
   
2. **Sign in** with: ssystems952@gmail.com

3. If you see "2-Step Verification is not enabled":
   - Go to: https://myaccount.google.com/security
   - Turn on "2-Step Verification"
   - Complete the setup (you'll need your phone)
   - Then return to Step 1

4. On the App passwords page:
   - Select app: **Mail**
   - Select device: **Windows Computer** (or Other)
   - Click **Generate**

5. **Copy the 16-character password** (looks like: `abcd efgh ijkl mnop`)

### Step 2: Update Configuration

1. Open this file: `suntech-systems\.env.local`

2. Find this line:
   ```
   EMAIL_PASSWORD=your_app_specific_password_here
   ```

3. Replace with your password:
   ```
   EMAIL_PASSWORD=abcd efgh ijkl mnop
   ```
   (You can include or remove spaces - both work!)

4. **Save the file**

### Step 3: Restart Server

In your terminal:
1. Press **Ctrl + C** to stop the server
2. Run: `npm run dev`
3. Wait for "Ready" message

### Step 4: Test the Form

1. Go to: http://localhost:3000
2. Scroll to the **Contact Form** section
3. Fill in:
   - Your name
   - A test email (use your personal email)
   - Phone number
   - Message
4. Click **Send Message**

5. Check **TWO emails**:
   - ✉️ ssystems952@gmail.com (company notification)
   - ✉️ Your test email (auto-reply)

---

## 🎯 What the Backend Does

When someone submits the contact form:

1. **Validates** the data (name, email, phone required)
2. **Sends email to you** (ssystems952@gmail.com):
   - Subject: "New Solar Inquiry from [Name]"
   - Beautiful HTML template
   - All customer details
3. **Sends auto-reply to customer**:
   - Professional thank you message
   - Your contact details
   - Confirmation of their inquiry
4. **Shows success message** on website

---

## ✅ After Setup Works

Once configured, the form will:
- ✅ Send you every inquiry instantly
- ✅ Auto-reply to customers professionally
- ✅ Store nothing on server (privacy-friendly)
- ✅ Work automatically 24/7

---

## 🆘 Troubleshooting

### "Invalid login credentials"
- **Fix**: Double-check the app password is copied correctly
- Try generating a new app password

### "2-Step Verification not enabled"
- **Fix**: Must enable 2FA first at https://myaccount.google.com/security

### Emails not arriving
- **Check**: Spam/junk folder
- **Verify**: App password is correct in .env.local
- **Confirm**: Server was restarted after changing .env.local

### Form shows error but doesn't specify
- **Open**: Browser console (Press F12)
- **Look**: For error messages
- **Check**: Network tab to see API response

---

## 🔒 Security Notes

- ✅ App password is safe to use
- ✅ Can be revoked anytime from Google account
- ✅ Only works for email, not full account access
- ⚠️ Never commit .env.local to GitHub (already in .gitignore)
- ⚠️ Never share your app password

---

## 📝 Current Configuration

Location: `.env.local`

```env
EMAIL_USER=ssystems952@gmail.com        ✅ Configured
EMAIL_PASSWORD=your_app_specific_password_here  ⚠️ NEEDS UPDATE
EMAIL_TO=ssystems952@gmail.com          ✅ Configured
```

---

## 🎉 Once Working

After setup, every inquiry will:
1. Email you within seconds
2. Customer gets instant auto-reply
3. You can respond via email or call
4. Track all leads in your inbox

---

**Estimated Time**: 5 minutes
**Difficulty**: Easy
**Required**: Gmail account access

---

**Next Step**: Follow Step 1 above to generate your app password! 🚀
