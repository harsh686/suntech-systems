import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Suntech Systems - Leading Solar Energy Solutions Provider in India | Solar Panel Installation",
  description: "Transform your home with Suntech Systems, India's trusted solar energy company. Expert solar panel installation, government subsidy assistance, and attractive ROI. Serving all of India with premium solar solutions. Contact: 9771045001 | ssystems952@gmail.com",
  keywords: [
    "solar panel installation India",
    "solar energy company",
    "residential solar panels",
    "commercial solar solutions",
    "solar subsidy India",
    "rooftop solar installation",
    "solar calculator",
    "solar power system",
    "renewable energy India",
    "Suntech Systems",
    "best solar company India",
    "solar panel cost India",
    "solar installation near me",
    "government solar subsidy",
    "solar ROI calculator"
  ],
  authors: [{ name: "Suntech Systems" }],
  creator: "Suntech Systems",
  publisher: "Suntech Systems",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://suntechsystems.in",
    title: "Suntech Systems - Leading Solar Energy Solutions Provider in India",
    description: "Expert solar panel installation across India. Government subsidy assistance, premium quality, exceptional ROI. Transform your home with clean solar energy.",
    siteName: "Suntech Systems",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Suntech Systems - Solar Energy Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Suntech Systems - Solar Energy Solutions India",
    description: "Expert solar panel installation with government subsidy assistance. Serving all of India.",
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://suntechsystems.in",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#3b82f6" />
        
        {/* Structured Data for AI Search Engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Suntech Systems",
              "image": "https://suntechsystems.in/logo.png",
              "@id": "https://suntechsystems.in",
              "url": "https://suntechsystems.in",
              "telephone": "+91-9771045001",
              "email": "ssystems952@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN",
                "addressRegion": "India"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "addressCountry": "IN"
              },
              "priceRange": "₹₹",
              "description": "Leading solar energy solutions provider in India. Expert solar panel installation for residential and commercial properties with government subsidy assistance.",
              "areaServed": {
                "@type": "Country",
                "name": "India"
              },
              "serviceType": [
                "Solar Panel Installation",
                "Residential Solar Solutions",
                "Commercial Solar Solutions",
                "Solar Energy Consultation",
                "Solar Maintenance Services",
                "Government Subsidy Assistance"
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "150"
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
