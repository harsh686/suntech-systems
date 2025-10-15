'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiMenu, FiX, FiPhone, FiMail } from 'react-icons/fi';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary-700 text-white py-2 text-sm">
        <div className="section-container">
          <div className="flex flex-wrap justify-between items-center gap-2">
            <div className="flex items-center gap-6">
              <a href="tel:9771045001" className="flex items-center gap-2 hover:text-solar-300 transition-colors">
                <FiPhone className="w-4 h-4" />
                <span className="font-medium">9771045001</span>
              </a>
              <a href="mailto:ssystems952@gmail.com" className="hidden sm:flex items-center gap-2 hover:text-solar-300 transition-colors">
                <FiMail className="w-4 h-4" />
                <span>ssystems952@gmail.com</span>
              </a>
            </div>
            <div className="text-xs sm:text-sm">
              <span className="font-semibold">Serving All of India</span> 🇮🇳
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white shadow-lg'
            : 'bg-white/95 backdrop-blur-sm'
        }`}
      >
        <div className="section-container">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-solar-500 to-primary-600 rounded-lg flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-3.86-1.08-7-5.05-7-9V8.39l7-3.11 7 3.11V11c0 3.95-3.14 7.92-7 9z"/>
                  <circle cx="12" cy="11" r="4"/>
                </svg>
              </div>
              <div>
                <div className="font-display text-2xl font-bold bg-gradient-to-r from-primary-600 to-solar-600 bg-clip-text text-transparent">
                  Suntech Systems
                </div>
                <div className="text-xs text-gray-500 font-medium">Solar Energy Solutions</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                Home
              </Link>
              <Link href="#calculator" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                Solar Calculator
              </Link>
              <Link href="#services" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                Services
              </Link>
              <Link href="#testimonials" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                Testimonials
              </Link>
              <Link href="#about" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                About Us
              </Link>
              <Link href="#contact" className="btn-primary">
                Get Quote
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {isMobileMenuOpen ? (
                <FiX className="w-6 h-6 text-gray-700" />
              ) : (
                <FiMenu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 space-y-4 border-t border-gray-200 animate-fade-in">
              <Link
                href="/"
                className="block text-gray-700 hover:text-primary-600 font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="#calculator"
                className="block text-gray-700 hover:text-primary-600 font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Solar Calculator
              </Link>
              <Link
                href="#services"
                className="block text-gray-700 hover:text-primary-600 font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="#testimonials"
                className="block text-gray-700 hover:text-primary-600 font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Testimonials
              </Link>
              <Link
                href="#about"
                className="block text-gray-700 hover:text-primary-600 font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="#contact"
                className="btn-primary inline-block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Quote
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
