# Suntech Systems - Solar Energy Website

A modern, fully-functional website for **Suntech Systems**, a leading solar energy solutions provider in India.

## 🌟 Features

### 🎯 Core Features
- **Intelligent Solar Calculator**: Calculate system size, costs, ROI, and savings with government subsidy calculations
- **Responsive Design**: Fully responsive across all devices
- **SEO Optimized**: Comprehensive meta tags, structured data, and LLM-friendly content
- **Contact Forms**: Integrated email system with auto-replies
- **Testimonials**: Social proof with real customer reviews
- **Service Pages**: Detailed information about all solar services

### 💡 Calculator Features
- Monthly electricity consumption input
- Terrace area calculation
- Residential/Commercial property types
- Government subsidy calculation (up to ₹78,000)
- ROI and payback period analysis
- 25-year savings projection
- Environmental impact calculation
- Electricity rate escalation consideration

### 🎨 Design Philosophy
- **Trust-building color palette**: Blue (trust), Green (eco-friendly), Orange (energy)
- **Professional typography**: Inter + Poppins fonts
- **Smooth animations**: Fade-in, slide-up effects
- **Guided user flow**: From landing to call-to-action

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Configure environment variables**:

Edit `.env.local` and add your email credentials:
```env
EMAIL_USER=ssystems952@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
EMAIL_TO=ssystems952@gmail.com

NEXT_PUBLIC_COMPANY_PHONE=9771045001
NEXT_PUBLIC_COMPANY_EMAIL=ssystems952@gmail.com
```

**Important**: For Gmail, you need to create an App Password:
1. Go to Google Account settings
2. Security → 2-Step Verification
3. App passwords → Generate new password
4. Use that password in `EMAIL_PASSWORD`

3. **Run development server**:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
suntech-systems/
├── app/
│   ├── api/contact/
│   │   └── route.ts          # Contact form API endpoint
│   ├── layout.tsx             # Root layout with SEO metadata
│   ├── page.tsx               # Main homepage
│   └── globals.css            # Global styles
├── components/
│   ├── Navbar.tsx             # Navigation bar
│   ├── Hero.tsx               # Hero section with CTA
│   ├── SolarCalculator.tsx    # Intelligent calculator
│   ├── ContactForm.tsx        # Contact form
│   ├── Testimonials.tsx       # Customer reviews
│   ├── Services.tsx           # Services section
│   ├── WhyChooseUs.tsx        # Value propositions
│   ├── HowItWorks.tsx         # Process timeline
│   ├── ContactSection.tsx     # Contact information
│   └── Footer.tsx             # Footer
├── .env.local                 # Environment variables
├── package.json               # Dependencies
├── tailwind.config.ts         # Tailwind configuration
└── next.config.mjs            # Next.js configuration
```

## 🔧 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: React Icons (Feather Icons)
- **Email**: Nodemailer
- **Fonts**: Google Fonts (Inter, Poppins)

## 📊 Solar Calculator Logic

The calculator uses real Indian market data:

- **Solar Panel Efficiency**: 80%
- **Average Sun Hours**: 5.5 hours/day
- **Installation Cost**: ₹40,000-55,000 per kW
- **Government Subsidy**: 
  - ₹18,000/kW for first 3kW
  - ₹9,000/kW for 3-10kW
  - Maximum subsidy: ₹78,000
- **Space Requirement**: 100 sq ft per kW
- **Electricity Rate Escalation**: 5% annually

## 🎯 SEO & LLM Optimization

The website is optimized for both traditional search engines and AI models (ChatGPT, Claude):

- Comprehensive meta tags
- JSON-LD structured data (Schema.org)
- Semantic HTML
- Natural language content
- Keyword optimization
- Open Graph tags
- Twitter Card tags

## 📱 Contact Information

- **Phone**: +91 9771045001
- **Email**: ssystems952@gmail.com
- **Service Area**: All of India 🇮🇳

## 🌐 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy!

### Other Platforms

Compatible with any Node.js hosting:
- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Railway
- Render

## 📄 Pages to Create (Optional Additions)

For a complete website, consider adding:
- `/about` - About Suntech Systems
- `/blog` - Solar energy articles
- `/case-studies` - Customer success stories
- `/faq` - Frequently asked questions
- `/privacy-policy` - Privacy policy
- `/terms-of-service` - Terms and conditions

## 🤝 Support

For technical support or inquiries:
- Email: ssystems952@gmail.com
- Phone: +91 9771045001

## 📝 License

© 2024 Suntech Systems. All rights reserved.

---

**Built with ❤️ for a sustainable future powered by solar energy** ☀️🌱
