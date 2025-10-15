'use client';

const steps = [
  {
    number: '01',
    title: 'Free Consultation',
    description: 'Contact us via phone or form. We discuss your electricity consumption and requirements.',
    duration: 'Day 1',
  },
  {
    number: '02',
    title: 'Site Survey',
    description: 'Our expert visits your property to assess roof space, structure, and sun exposure.',
    duration: 'Day 2-3',
  },
  {
    number: '03',
    title: 'Custom Proposal',
    description: 'Receive detailed proposal with system size, cost breakdown, ROI, and savings projection.',
    duration: 'Day 4-5',
  },
  {
    number: '04',
    title: 'Subsidy Application',
    description: 'We handle all government subsidy paperwork and documentation on your behalf.',
    duration: 'Day 6-7',
  },
  {
    number: '05',
    title: 'Installation',
    description: 'Professional installation of solar panels, inverters, and monitoring system.',
    duration: 'Day 8-12',
  },
  {
    number: '06',
    title: 'Net Metering',
    description: 'We complete all formalities with electricity department for net metering setup.',
    duration: 'Day 13-15',
  },
  {
    number: '07',
    title: 'Start Saving',
    description: 'Your system goes live! Watch your electricity bills drop to near zero.',
    duration: 'Day 15+',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">
            Simple <span className="text-primary-600">7-Step Process</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From first call to solar power generation – we make the journey smooth and hassle-free. 
            Complete installation in just 15 days!
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-300 via-solar-300 to-energy-300"></div>

          {/* Steps */}
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row gap-8 items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Number Circle */}
                <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-16 h-16 bg-gradient-to-br from-primary-600 to-solar-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg z-10">
                  {step.number}
                </div>

                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-16' : 'md:pl-16 md:ml-8'} ml-24 md:ml-0`}>
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                    <div className="inline-block bg-primary-100 text-primary-700 text-xs font-bold px-3 py-1 rounded-full mb-2">
                      {step.duration}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-xl p-8 max-w-2xl">
            <div className="text-3xl mb-3">🎉</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Ready to Start Your Solar Journey?
            </h3>
            <p className="text-gray-600 mb-6">
              Join 500+ happy customers who are already saving thousands with Suntech Systems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#calculator" className="btn-primary">
                Calculate Your Savings
              </a>
              <a href="tel:9771045001" className="btn-secondary">
                Call Now: 9771045001
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
