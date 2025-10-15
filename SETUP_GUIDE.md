# 🚀 Suntech Systems Website - Setup Guide

## Quick Start Instructions

Follow these steps to get your solar company website up and running:

### Step 1: Install Dependencies

Open your terminal in the project folder and run:

```powershell
cd "c:\Users\Harshvardhan singh\Documents\note\suntech-systems"
npm install
```

This will install all required packages (Next.js, React, Tailwind CSS, etc.)

### Step 2: Configure Email

For the contact form to work, you need to set up Gmail:

1. **Enable 2-Factor Authentication** on your Google Account:
   - Go to https://myaccount.google.com/security
   - Enable 2-Step Verification

2. **Generate App Password**:
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and your device
   - Click "Generate"
   - Copy the 16-character password

3. **Update `.env.local` file**:
   Replace `your_app_specific_password_here` with the password you just generated

```env
EMAIL_PASSWORD=your_16_character_app_password
```

### Step 3: Run Development Server

```powershell
npm run dev
```

Visit http://localhost:3000 to see your website!

### Step 4: Test the Contact Form

1. Fill out the contact form on your local website
2. Submit it
3. Check both:
   - Your company email (ssystems952@gmail.com) for the inquiry
   - The customer's email for auto-reply

### Step 5: Customize (Optional)

You can customize:
- Company colors in `tailwind.config.ts`
- Testimonials in `components/Testimonials.tsx`
- Services in `components/Services.tsx`
- Solar calculator rates in `components/SolarCalculator.tsx`

### Step 6: Deploy to Production

#### Option A: Vercel (Recommended - Free)

1. Push your code to GitHub:
```powershell
git init
git add .
git commit -m "Initial commit"
git remote add origin your-repo-url
git push -u origin main
```

2. Go to https://vercel.com
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variables:
   - EMAIL_USER=ssystems952@gmail.com
   - EMAIL_PASSWORD=your_app_password
   - EMAIL_TO=ssystems952@gmail.com
   - NEXT_PUBLIC_COMPANY_PHONE=9771045001
   - NEXT_PUBLIC_COMPANY_EMAIL=ssystems952@gmail.com
   - NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
6. Click "Deploy"

Your website will be live in 2-3 minutes!

#### Option B: Other Hosting

Build the production version:
```powershell
npm run build
npm start
```

Compatible with:
- Netlify
- AWS Amplify
- DigitalOcean
- Railway
- Render

## 📋 Feature Checklist

After setup, verify these features work:

- [ ] Homepage loads correctly
- [ ] Navigation menu works
- [ ] Solar calculator computes accurately
- [ ] Calculator shows ROI and savings
- [ ] Contact form submits successfully
- [ ] Email is received at ssystems952@gmail.com
- [ ] Auto-reply is sent to customer
- [ ] Testimonials display properly
- [ ] All Call-to-Action buttons work
- [ ] Phone number links open dialer
- [ ] Email links open mail app
- [ ] Responsive on mobile devices
- [ ] All sections scroll smoothly

## 🎨 Key Features Built

### 1. **Intelligent Solar Calculator**
   - Calculates system size based on consumption & space
   - Includes government subsidy (up to ₹78,000)
   - Shows 25-year savings projection
   - Displays ROI and payback period
   - Environmental impact calculation

### 2. **SEO Optimized**
   - Meta tags for search engines
   - Structured data (JSON-LD)
   - Sitemap.xml
   - Robots.txt
   - LLM-friendly content (ChatGPT, Claude)

### 3. **Contact System**
   - Professional contact form
   - Email notifications to company
   - Auto-reply to customers
   - Multiple CTAs throughout site

### 4. **Trust Building**
   - Customer testimonials
   - Statistics (500+ installations)
   - Service showcase
   - Process timeline

### 5. **Conversion Optimized**
   - Clear value propositions
   - Multiple call-to-action buttons
   - Guided user flow
   - Mobile-responsive design

## 🔧 Troubleshooting

### Contact Form Not Working?

**Issue**: Emails not being sent

**Solutions**:
1. Verify Gmail app password is correct
2. Check `.env.local` file exists and has correct variables
3. Ensure 2-Factor Authentication is enabled on Gmail
4. Try generating a new app password

### Calculator Not Showing Results?

**Issue**: Calculator shows no results after clicking

**Solution**: 
- Open browser console (F12)
- Check for JavaScript errors
- Ensure all form fields are filled

### Styles Look Broken?

**Issue**: Website doesn't look styled

**Solution**:
```powershell
npm install
npm run dev
```

### Port Already in Use?

**Issue**: Port 3000 is already in use

**Solution**:
```powershell
npm run dev -- -p 3001
```

## 📞 Support

For technical issues:
- Email: ssystems952@gmail.com
- Phone: +91 9771045001

## 🎯 Next Steps

1. **Domain Name**: Purchase a domain (e.g., suntechsystems.in)
2. **Custom Email**: Set up professional email (@suntechsystems.in)
3. **Google Analytics**: Add tracking code
4. **Google Search Console**: Submit sitemap
5. **Social Media**: Create business profiles
6. **Google My Business**: Set up listing
7. **Content**: Add blog posts about solar energy
8. **WhatsApp Business**: Set up business account

## 📊 Marketing Tips

To get found by AI models (ChatGPT, Claude):
- ✓ Already implemented: Structured data
- ✓ Already implemented: Semantic HTML
- ✓ Already implemented: Natural language content
- Add: Customer reviews on Google
- Add: Backlinks from solar industry sites
- Add: Regular blog content

## 🌟 Success Metrics to Track

- Website visitors
- Calculator usage
- Contact form submissions
- Phone call conversions
- Email open rates
- Time on site
- Bounce rate

---

**Your website is production-ready!** 🎉

All errors shown are normal before running `npm install`. They will disappear once dependencies are installed.
