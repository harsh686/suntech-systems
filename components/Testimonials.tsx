'use client';

import { FiStar } from 'react-icons/fi';

const testimonials = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    location: 'Delhi',
    rating: 5,
    image: '👨‍💼',
    text: 'Suntech Systems transformed my electricity bills! From ₹8,000/month to almost zero. The installation was smooth, and they helped with all subsidy paperwork. ROI is better than any FD!',
    savings: '₹96,000/year',
    systemSize: '5 kW',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    location: 'Mumbai',
    rating: 5,
    image: '👩‍💼',
    text: 'Best decision ever! Professional team, quality panels, and excellent after-sales service. My 3kW system generates more than my consumption. Highly recommended!',
    savings: '₹45,000/year',
    systemSize: '3 kW',
  },
  {
    id: 3,
    name: 'Amit Patel',
    location: 'Gujarat',
    rating: 5,
    image: '👨‍🏭',
    text: 'Installed 20kW for my factory. The team was professional, completed on time, and the system performs excellently. Payback period is less than 4 years!',
    savings: '₹3.8L/year',
    systemSize: '20 kW',
  },
  {
    id: 4,
    name: 'Sunita Reddy',
    location: 'Hyderabad',
    rating: 5,
    image: '👩‍🔬',
    text: 'Suntech Systems made solar simple! They handled everything from design to subsidy application. My electricity meter now runs backwards! Very satisfied with the service.',
    savings: '₹68,000/year',
    systemSize: '4 kW',
  },
  {
    id: 5,
    name: 'Vikram Singh',
    location: 'Jaipur',
    rating: 5,
    image: '🧑‍💼',
    text: 'Excellent experience from start to finish. Got government subsidy of ₹54,000 with their help. System has been running flawlessly for 2 years. Great investment!',
    savings: '₹82,000/year',
    systemSize: '5.5 kW',
  },
  {
    id: 6,
    name: 'Meera Iyer',
    location: 'Bangalore',
    rating: 5,
    image: '👩‍⚕️',
    text: 'Professional, transparent, and reliable. Suntech Systems delivered on all promises. The monitoring app is great, and I love seeing my daily generation. Worth every rupee!',
    savings: '₹58,000/year',
    systemSize: '3.5 kW',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">
            What Our <span className="text-primary-600">Happy Customers</span> Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of satisfied customers who've made the switch to solar with Suntech Systems. 
            Real stories, real savings, real impact.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-solar-100 rounded-full flex items-center justify-center text-2xl">
                    {testimonial.image}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 mb-4 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Stats */}
              <div className="flex gap-4 pt-4 border-t border-gray-200">
                <div className="flex-1 bg-green-50 rounded-lg p-3">
                  <div className="text-xs text-gray-600 mb-1">Annual Savings</div>
                  <div className="font-bold text-green-700">{testimonial.savings}</div>
                </div>
                <div className="flex-1 bg-blue-50 rounded-lg p-3">
                  <div className="text-xs text-gray-600 mb-1">System Size</div>
                  <div className="font-bold text-blue-700">{testimonial.systemSize}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-primary-600 mb-2">500+</div>
            <div className="text-gray-600 font-medium">Happy Customers</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary-600 mb-2">5+ MW</div>
            <div className="text-gray-600 font-medium">Installed Capacity</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary-600 mb-2">4.9/5</div>
            <div className="text-gray-600 font-medium">Customer Rating</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary-600 mb-2">98%</div>
            <div className="text-gray-600 font-medium">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
}
