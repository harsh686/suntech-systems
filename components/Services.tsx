'use client';

import { FiSun, FiHome, FiBriefcase, FiZap, FiTool, FiAward } from 'react-icons/fi';

const services = [
  {
    icon: FiHome,
    title: 'Residential Solar',
    description: 'Complete rooftop solar solutions for homes. Get government subsidy up to ₹78,000.',
    features: ['1-10 kW systems', 'Subsidy assistance', 'Net metering', 'EMI available'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: FiBriefcase,
    title: 'Commercial Solar',
    description: 'Large-scale solar installations for businesses, factories, and industries.',
    features: ['10-100+ kW systems', 'Quick payback', 'Tax benefits', 'Custom design'],
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: FiZap,
    title: 'Hybrid Systems',
    description: 'Solar + battery backup for uninterrupted power supply even during grid failures.',
    features: ['24/7 power', 'Battery storage', 'Auto switching', 'No load shedding'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: FiSun,
    title: 'Solar Water Heater',
    description: 'Energy-efficient solar water heating systems for homes and commercial properties.',
    features: ['Save 70% on bills', 'Quick installation', 'Low maintenance', 'Eco-friendly'],
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: FiTool,
    title: 'Maintenance & AMC',
    description: 'Regular maintenance and annual service contracts for optimal system performance.',
    features: ['Cleaning service', 'Performance check', 'Quick repairs', 'Remote monitoring'],
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: FiAward,
    title: 'Consultation',
    description: 'Free site survey and detailed solar feasibility analysis for your property.',
    features: ['Free site visit', 'ROI analysis', 'Custom proposal', 'No obligation'],
    color: 'from-indigo-500 to-blue-500',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">
            Our <span className="text-primary-600">Solar Solutions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive solar energy solutions tailored for your specific needs – from residential rooftops to large commercial installations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
            >
              <div className={`h-2 bg-gradient-to-r ${service.color}`}></div>
              <div className="p-6">
                <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.color}`}></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="#contact" className="btn-primary text-lg">
            Get Free Consultation
          </a>
        </div>
      </div>
    </section>
  );
}
