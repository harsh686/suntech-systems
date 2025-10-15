'use client';

import Link from 'next/link';
import { FiArrowRight, FiPhone, FiZap, FiCheckCircle } from 'react-icons/fi';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-600 via-primary-700 to-solar-700 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-300 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-300 rounded-full filter blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="section-container relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
              <span className="text-sm font-semibold">🇮🇳 Trusted Across India | 500+ Happy Customers</span>
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Power Your Future with
              <span className="block text-yellow-300">Clean Solar Energy</span>
            </h1>

            <p className="text-xl md:text-2xl mb-12 text-white/90 leading-relaxed">
              Transform your electricity bills into smart investments. 
              Save up to <span className="font-bold text-yellow-300">₹5 Lakhs+ over 25 years</span> with 
              government-subsidized solar installations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#calculator"
                className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-8 py-4 rounded-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center gap-2 text-lg"
              >
                <FiZap className="w-6 h-6" />
                Calculate Your Savings
                <FiArrowRight className="w-5 h-5" />
              </a>
              
              <a
                href="tel:9771045001"
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-bold px-8 py-4 rounded-lg transition-all duration-300 border-2 border-white/30 hover:border-white/50 flex items-center justify-center gap-2 text-lg"
              >
                <FiPhone className="w-5 h-5" />
                Call: 9771045001
              </a>
            </div>

            <div className="mt-8 flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white/80">Available for installation across India</span>
              </div>
            </div>
          </div>

          {/* Right Content - Stats Card */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Why 500+ Customers Choose Us
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">💰</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Maximum Savings</h4>
                    <p className="text-gray-600 text-sm">
                      Save ₹50,000-₹5L+ annually. Better returns than FDs & mutual funds.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🏆</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Premium Quality</h4>
                    <p className="text-gray-600 text-sm">
                      Tier-1 panels with 25-year warranty. Certified & tested for Indian climate.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-lg">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">📋</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Hassle-Free Subsidy</h4>
                    <p className="text-gray-600 text-sm">
                      We handle all paperwork. Get ₹18,000/kW (up to 3kW) government subsidy.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Fast Installation</h4>
                    <p className="text-gray-600 text-sm">
                      Complete installation in 7-15 days. Start saving from day one!
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-primary-600 to-solar-600 rounded-lg text-center text-white">
                <p className="font-bold text-lg mb-1">Special Offer This Month!</p>
                <p className="text-sm text-white/90">Free site survey + Free solar monitoring system</p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-white text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-4xl font-bold mb-2">500+</div>
            <div className="text-sm text-white/80">Installations</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-4xl font-bold mb-2">5+ MW</div>
            <div className="text-sm text-white/80">Total Capacity</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-4xl font-bold mb-2">₹2Cr+</div>
            <div className="text-sm text-white/80">Customer Savings</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-4xl font-bold mb-2">4.9★</div>
            <div className="text-sm text-white/80">Customer Rating</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
