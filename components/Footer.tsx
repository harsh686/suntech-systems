'use client';

import Link from 'next/link';
import { FiPhone, FiMail, FiMapPin, FiFacebook, FiTwitter, FiLinkedin, FiInstagram } from 'react-icons/fi';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-solar-500 to-primary-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                  <circle cx="12" cy="11" r="3"/>
                </svg>
              </div>
              <div className="font-display text-xl font-bold text-white">
                Suntech Systems
              </div>
            </div>
            <p className="text-sm mb-4">
              India's trusted solar energy solutions provider. Transform your property with clean, renewable solar power.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-solar-400 transition-colors">
                <FiFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-solar-400 transition-colors">
                <FiTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-solar-400 transition-colors">
                <FiLinkedin className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-solar-400 transition-colors">
                <FiInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-solar-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#calculator" className="hover:text-solar-400 transition-colors">
                  Solar Calculator
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-solar-400 transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="#testimonials" className="hover:text-solar-400 transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-solar-400 transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li className="hover:text-solar-400 transition-colors">
                Residential Solar Installation
              </li>
              <li className="hover:text-solar-400 transition-colors">
                Commercial Solar Solutions
              </li>
              <li className="hover:text-solar-400 transition-colors">
                Solar Subsidy Assistance
              </li>
              <li className="hover:text-solar-400 transition-colors">
                Solar Maintenance
              </li>
              <li className="hover:text-solar-400 transition-colors">
                Energy Consultation
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FiPhone className="w-5 h-5 mt-1 flex-shrink-0 text-solar-400" />
                <div>
                  <a href="tel:9771045001" className="hover:text-solar-400 transition-colors">
                    +91 9771045001
                  </a>
                  <p className="text-xs text-gray-400">Mon-Sat: 9 AM - 7 PM</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FiMail className="w-5 h-5 mt-1 flex-shrink-0 text-solar-400" />
                <a href="mailto:ssystems952@gmail.com" className="hover:text-solar-400 transition-colors break-all">
                  ssystems952@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FiMapPin className="w-5 h-5 mt-1 flex-shrink-0 text-solar-400" />
                <span>Serving All of India 🇮🇳</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>
            © {currentYear} Suntech Systems. All rights reserved. | 
            <Link href="/privacy" className="hover:text-solar-400 transition-colors ml-1">
              Privacy Policy
            </Link> | 
            <Link href="/terms" className="hover:text-solar-400 transition-colors ml-1">
              Terms of Service
            </Link>
          </p>
          <p className="mt-2 text-gray-500">
            Empowering India with Clean, Renewable Solar Energy
          </p>
        </div>
      </div>
    </footer>
  );
}
