'use client';

import ContactForm from './ContactForm';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">
            Get Your <span className="text-primary-600">Free Consultation</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Not sure where to start? We're here to help. Fill the form or call us directly for personalized solar advice.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gradient-to-br from-primary-600 to-solar-600 rounded-2xl shadow-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FiPhone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Call Us</div>
                    <a href="tel:9771045001" className="text-lg hover:text-yellow-300 transition-colors">
                      +91 9771045001
                    </a>
                    <div className="text-sm text-white/80 mt-1">Mon-Sat: 9 AM - 7 PM</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FiMail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Email Us</div>
                    <a href="mailto:ssystems952@gmail.com" className="hover:text-yellow-300 transition-colors break-all">
                      ssystems952@gmail.com
                    </a>
                    <div className="text-sm text-white/80 mt-1">We reply within 24 hours</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FiMapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Service Area</div>
                    <div className="text-white/90">All of India 🇮🇳</div>
                    <div className="text-sm text-white/80 mt-1">We serve nationwide</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
                <div className="text-sm font-semibold mb-2">Quick Response Time</div>
                <div className="text-2xl font-bold">Within 24 Hours</div>
              </div>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
              <div className="text-2xl mb-2">⚡ Special Offer</div>
              <div className="font-bold text-lg text-gray-900 mb-2">
                Free Benefits This Month
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Free site survey & feasibility study</li>
                <li>✓ Free solar monitoring system</li>
                <li>✓ 0% processing fee on EMI</li>
                <li>✓ Extended warranty options</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
