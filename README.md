A modern, fully-functional website for **Suntech Systems**, a leading solar energy solutions provider in India.

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

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
1. **Install dependencies**:
```bash
npm install
```

2. **Configure environment variables**:

Create a `.env.local` file in the root directory and fill in your values:
```env
# Email Configuration (For Contact Form)
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
EMAIL_TO=your_receiving_email@gmail.com

# Company Contact Info (Displayed on site & chatbot)
NEXT_PUBLIC_COMPANY_PHONE=your_company_phone_number
NEXT_PUBLIC_COMPANY_EMAIL=your_company_email@gmail.com

# OpenRouter AI (For SolarGPT Chatbot)
OPENROUTER_API_KEY=your_openrouter_api_key_here
OPENROUTER_MODEL=google/gemini-2.5-flash-preview-09-2025

# Supabase (For Dynamic Data)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Site URL
NEXT_PUBLIC_SITE_URL=https://your-domain.com
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
│   ├── api/chat/
│   │   └── route.ts          # SolarGPT chatbot endpoint
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
├── lib/
│   ├── supabase/client.ts     # Supabase client & data helpers
│   └── scrapers/              # Web scrapers for dynamic data
├── supabase/schema.sql        # Database schema
├── .env.local                 # Environment variables (NOT committed)
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
- **AI**: OpenRouter API
- **Database**: Supabase
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

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import to Vercel
3. Add all environment variables from `.env.local` in Vercel project settings
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

## 📝 License
© 2024 Suntech Systems. All rights reserved.

---

**Built with ❤️ for a sustainable future powered by solar energy** ☀️🌱
