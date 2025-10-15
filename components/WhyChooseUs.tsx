'use client';

import { FiHome, FiTrendingUp, FiDollarSign, FiShield, FiSun, FiAward } from 'react-icons/fi';

const reasons = [
  {
    icon: FiDollarSign,
    title: 'Maximum ROI',
    description: 'Get 400-500% returns over 25 years. Better than any traditional investment.',
    color: 'from-green-500 to-emerald-600',
  },
  {
    icon: FiShield,
    title: 'Premium Quality',
    description: 'Tier-1 solar panels with 25-year performance warranty. Certified for Indian conditions.',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    icon: FiTrendingUp,
    title: 'Government Subsidy',
    description: 'Up to ₹78,000 subsidy for residential installations. We handle all paperwork.',
    color: 'from-orange-500 to-red-600',
  },
  {
    icon: FiSun,
    title: 'Expert Installation',
    description: 'Professional team with 500+ successful installations across India.',
    color: 'from-yellow-500 to-orange-600',
  },
  {
    icon: FiHome,
    title: 'Increase Property Value',
    description: 'Solar homes sell 3-4% higher and 20% faster than non-solar properties.',
    color: 'from-purple-500 to-pink-600',
  },
  {
    icon: FiAward,
    title: 'Lifetime Support',
    description: '25-year warranty with regular maintenance and monitoring support.',
    color: 'from-indigo-500 to-blue-600',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">
            Why <span className="text-primary-600">Suntech Systems</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We don't just install solar panels – we create long-term partnerships for your energy independence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:-translate-y-2"
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${reason.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <reason.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{reason.title}</h3>
              <p className="text-gray-600">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
