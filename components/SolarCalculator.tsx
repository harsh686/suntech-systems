'use client';

import { useState } from 'react';
import { FiZap, FiHome, FiMapPin, FiDollarSign, FiTrendingUp, FiSun, FiCheckCircle } from 'react-icons/fi';

interface CalculatorResult {
  systemSize: number;
  totalCost: number;
  centralSubsidy: number;
  stateSubsidy: number;
  totalSubsidy: number;
  finalCost: number;
  annualSavings: number;
  paybackPeriod: number;
  totalSavings25Years: number;
  co2Offset: number;
  treesEquivalent: number;
  monthlyProduction: number;
}

// Special category states eligible for additional 10% central subsidy
// Source: PM Surya Ghar National Portal (pmsuryaghar.gov.in) - Last verified: Oct 2025
const specialCategoryStates = [
  'arunachal-pradesh', 'assam', 'manipur', 'meghalaya', 'mizoram', 'nagaland', 
  'sikkim', 'tripura', 'himachal-pradesh', 'uttarakhand', 'jammu-kashmir', 
  'ladakh', 'andaman-nicobar', 'lakshadweep'
];

// Indian States and Union Territories
const indianStates: Record<string, string> = {
  'general': 'Select Your State/UT',
  'andhra-pradesh': 'Andhra Pradesh',
  'arunachal-pradesh': 'Arunachal Pradesh',
  'assam': 'Assam',
  'bihar': 'Bihar',
  'chhattisgarh': 'Chhattisgarh',
  'goa': 'Goa',
  'gujarat': 'Gujarat',
  'haryana': 'Haryana',
  'himachal-pradesh': 'Himachal Pradesh',
  'jharkhand': 'Jharkhand',
  'karnataka': 'Karnataka',
  'kerala': 'Kerala',
  'madhya-pradesh': 'Madhya Pradesh',
  'maharashtra': 'Maharashtra',
  'manipur': 'Manipur',
  'meghalaya': 'Meghalaya',
  'mizoram': 'Mizoram',
  'nagaland': 'Nagaland',
  'odisha': 'Odisha',
  'punjab': 'Punjab',
  'rajasthan': 'Rajasthan',
  'sikkim': 'Sikkim',
  'tamil-nadu': 'Tamil Nadu',
  'telangana': 'Telangana',
  'tripura': 'Tripura',
  'uttar-pradesh': 'Uttar Pradesh',
  'uttarakhand': 'Uttarakhand',
  'west-bengal': 'West Bengal',
  'andaman-nicobar': 'Andaman & Nicobar Islands',
  'chandigarh': 'Chandigarh',
  'dadra-nagar-haveli': 'Dadra & Nagar Haveli and Daman & Diu',
  'delhi': 'Delhi',
  'jammu-kashmir': 'Jammu & Kashmir',
  'ladakh': 'Ladakh',
  'lakshadweep': 'Lakshadweep',
  'puducherry': 'Puducherry',
}

export default function SolarCalculator() {
  const [formData, setFormData] = useState({
    monthlyUnits: '',
    terraceArea: '',
    propertyType: 'residential',
    electricityRate: '6',
    state: 'general',
  });

  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const calculateSolar = () => {
    const monthlyUnits = parseFloat(formData.monthlyUnits);
    const terraceArea = parseFloat(formData.terraceArea);
    const electricityRate = parseFloat(formData.electricityRate);

    if (!monthlyUnits || !terraceArea) {
      alert('Please fill in all required fields');
      return;
    }

    // Calculations based on Indian solar market standards
    const avgDailySunHours = 5.5; // Average for India
    const systemEfficiency = 0.8; // 80% efficiency
    const unitsPerKWPerDay = avgDailySunHours * systemEfficiency;
    
    // Calculate required system size based on consumption
    const dailyUnits = monthlyUnits / 30;
    const systemSizeByConsumption = dailyUnits / unitsPerKWPerDay;
    
    // Calculate maximum possible system size based on terrace area
    // Typically 100 sq ft required per kW
    const systemSizeByArea = terraceArea / 100;
    
    // Take the minimum of both (what's feasible)
    let systemSize = Math.min(systemSizeByConsumption, systemSizeByArea);
    systemSize = Math.ceil(systemSize * 2) / 2; // Round to nearest 0.5 kW
    
    // Cost calculations (₹40,000-55,000 per kW, we'll use ₹45,000 avg)
    const costPerKW = formData.propertyType === 'residential' ? 45000 : 50000;
    const totalCost = systemSize * costPerKW;
    
    // Central government subsidy calculation (PM Surya Ghar - for residential only)
    // Source: pmsuryaghar.gov.in - Last verified: Oct 2025
    let centralSubsidy = 0;
    if (formData.propertyType === 'residential') {
      if (systemSize <= 2) {
        // ₹30,000 per kW for systems up to 2 kW
        centralSubsidy = systemSize * 30000;
      } else if (systemSize <= 3) {
        // ₹30,000 per kW for first 2 kW + ₹18,000 per kW for 2-3 kW
        centralSubsidy = (2 * 30000) + ((systemSize - 2) * 18000);
      } else {
        // Fixed ₹78,000 for systems above 3 kW (as per official portal)
        centralSubsidy = 78000;
      }
      
      // Special category states get additional 10% subsidy
      if (formData.state !== 'general' && specialCategoryStates.includes(formData.state)) {
        centralSubsidy = centralSubsidy * 1.1; // Add 10% for special states
      }
    }
    
    // State-specific subsidies: Not yet officially published by most state governments
    // Users should verify with their state DISCOM or energy department
    const stateSubsidy = 0;
    
    const totalSubsidy = centralSubsidy + stateSubsidy;
    const finalCost = totalCost - totalSubsidy;
    
    // Savings calculations
    const monthlyProduction = systemSize * unitsPerKWPerDay * 30;
    const actualMonthlySavings = Math.min(monthlyProduction, monthlyUnits); // Can't save more than you consume
    const annualSavings = actualMonthlySavings * 12 * electricityRate;
    
    // Account for electricity rate increase (avg 5% per year)
    let totalSavings25Years = 0;
    let currentRate = electricityRate;
    for (let year = 1; year <= 25; year++) {
      totalSavings25Years += actualMonthlySavings * 12 * currentRate;
      currentRate *= 1.05; // 5% annual increase
    }
    
    const paybackPeriod = finalCost / annualSavings;
    
    // Environmental impact
    const co2Offset = systemSize * 1.5 * 25; // Tonnes over 25 years
    const treesEquivalent = Math.round(co2Offset * 50); // Approx 50 trees per tonne CO2

    const calculatorResult: CalculatorResult = {
      systemSize,
      totalCost,
      centralSubsidy,
      stateSubsidy,
      totalSubsidy,
      finalCost,
      annualSavings,
      paybackPeriod,
      totalSavings25Years,
      co2Offset,
      treesEquivalent,
      monthlyProduction,
    };

    setResult(calculatorResult);
    setShowResult(true);
  };

  return (
    <section id="calculator" className="py-20 bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">
            Solar <span className="text-primary-600">Savings</span> Calculator
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover your potential savings and ROI with our intelligent calculator. 
            See how solar energy can transform your electricity bills into smart investments.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Calculator Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FiZap className="text-energy-500" />
              Calculate Your Solar System
            </h3>

            <div className="space-y-6">
              {/* Monthly Electricity Units */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Monthly Electricity Consumption (Units/kWh) *
                </label>
                <div className="relative">
                  <FiZap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    name="monthlyUnits"
                    value={formData.monthlyUnits}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g., 300"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Check your electricity bill for monthly units consumed</p>
              </div>

              {/* Terrace Area */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Available Terrace/Roof Area (sq. ft.) *
                </label>
                <div className="relative">
                  <FiHome className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    name="terraceArea"
                    value={formData.terraceArea}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g., 400"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Minimum 100 sq. ft. required per kW</p>
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Property Type
                </label>
                <div className="relative">
                  <FiHome className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
                  >
                    <option value="residential">Residential (Eligible for Subsidy)</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </div>
              </div>

              {/* State/UT Selection */}
              {formData.propertyType === 'residential' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    State/Union Territory
                  </label>
                  <div className="relative">
                    <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
                    >
                      {Object.entries(indianStates).map(([key, name]) => (
                        <option key={key} value={key}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {formData.state !== 'general' && specialCategoryStates.includes(formData.state) && (
                    <p className="text-xs text-green-600 mt-1 font-medium">
                      ✓ Special Category State - Eligible for additional 10% central subsidy
                    </p>
                  )}
                  {formData.state !== 'general' && !specialCategoryStates.includes(formData.state) && (
                    <p className="text-xs text-gray-500 mt-1">
                      State-specific subsidies may be available - verify with your local DISCOM
                    </p>
                  )}
                </div>
              )}

              {/* Electricity Rate */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Current Electricity Rate (₹/Unit)
                </label>
                <div className="relative">
                  <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    step="0.5"
                    name="electricityRate"
                    value={formData.electricityRate}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="6"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Average rate in India: ₹5-8 per unit</p>
              </div>

              <button
                onClick={calculateSolar}
                className="w-full btn-primary text-lg py-4 flex items-center justify-center gap-2"
              >
                <FiSun className="w-5 h-5" />
                Calculate Savings & ROI
              </button>
            </div>
          </div>

          {/* Results Display */}
          <div className="bg-gradient-to-br from-primary-600 to-solar-600 rounded-2xl shadow-xl p-8 text-white">
            {!showResult ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-6 animate-pulse-slow">
                  <FiSun className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Your Solar Investment Report</h3>
                <p className="text-white/90 max-w-md">
                  Fill in your details and click calculate to see personalized solar recommendations, 
                  cost breakdown, and potential savings over 25 years.
                </p>
              </div>
            ) : result && (
              <div className="space-y-6">
                <div className="text-center pb-6 border-b border-white/20">
                  <div className="text-5xl font-bold mb-2">{result.systemSize} kW</div>
                  <div className="text-lg text-white/90">Recommended System Size</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                    <div className="text-sm text-white/80 mb-1">System Cost</div>
                    <div className="text-2xl font-bold">₹{(result.totalCost / 100000).toFixed(2)}L</div>
                  </div>
                  
                  {result.totalSubsidy > 0 && (
                    <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                      <div className="text-sm text-white/80 mb-1">Total Subsidy</div>
                      <div className="text-2xl font-bold text-green-300">-₹{(result.totalSubsidy / 100000).toFixed(2)}L</div>
                    </div>
                  )}
                  
                  {result.centralSubsidy > 0 && (
                    <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm col-span-2">
                      <div className="text-xs text-white/70 mb-1">Central Govt Subsidy (PM Surya Ghar)</div>
                      <div className="text-2xl font-bold text-green-300">₹{(result.centralSubsidy / 100000).toFixed(2)}L</div>
                      <div className="text-xs text-white/60 mt-1">
                        Verified from pmsuryaghar.gov.in
                      </div>
                    </div>
                  )}
                  
                  <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm col-span-2 border-2 border-white/30">
                    <div className="text-sm text-white/80 mb-1">Your Investment</div>
                    <div className="text-3xl font-bold">₹{(result.finalCost / 100000).toFixed(2)}L</div>
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                  <h4 className="font-bold text-xl mb-4 flex items-center gap-2">
                    <FiTrendingUp className="w-6 h-6" />
                    Returns & Savings
                  </h4>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Annual Savings</span>
                      <span className="font-bold text-lg">₹{result.annualSavings.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Payback Period</span>
                      <span className="font-bold text-lg text-green-300">{result.paybackPeriod.toFixed(1)} years</span>
                    </div>
                    
                    <div className="flex justify-between items-center pt-3 border-t border-white/20">
                      <span className="text-white/80">25-Year Savings</span>
                      <span className="font-bold text-2xl text-yellow-300">₹{(result.totalSavings25Years / 100000).toFixed(1)}L</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Monthly Generation</span>
                      <span className="font-bold">{result.monthlyProduction.toFixed(0)} units</span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-500/20 rounded-lg p-4 backdrop-blur-sm border border-green-400/30">
                  <h4 className="font-bold mb-2 flex items-center gap-2">
                    🌱 Environmental Impact (25 years)
                  </h4>
                  <div className="text-sm space-y-1">
                    <div>• {result.co2Offset.toFixed(1)} tonnes CO₂ offset</div>
                    <div>• Equivalent to planting {result.treesEquivalent} trees</div>
                  </div>
                </div>

                <div className="bg-yellow-500/20 rounded-lg p-4 backdrop-blur-sm border border-yellow-400/30">
                  <h4 className="font-bold mb-2 flex items-center gap-2">
                    <FiCheckCircle className="w-5 h-5" />
                    Why This is an Excellent Investment
                  </h4>
                  <ul className="text-sm space-y-1">
                    <li>✓ {((result.totalSavings25Years / result.finalCost) * 100).toFixed(0)}% return on investment over 25 years</li>
                    <li>✓ Break even in just {result.paybackPeriod.toFixed(1)} years</li>
                    <li>✓ Protection against rising electricity costs</li>
                    <li>✓ 25+ years warranty on solar panels</li>
                    <li>✓ Increase property value by 3-4%</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {showResult && (
          <>
            <div className="mt-8 max-w-4xl mx-auto">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <FiCheckCircle className="w-5 h-5" />
                  Important Subsidy Information
                </h4>
                <div className="text-sm text-blue-800 space-y-2">
                  <p>
                    ✓ <strong>Central Subsidy:</strong> Verified from PM Surya Ghar National Portal (pmsuryaghar.gov.in) - Last updated October 2025
                  </p>
                  <p>
                    ℹ️ <strong>State-Specific Subsidies:</strong> Some states offer additional subsidies. Please verify current schemes with your local DISCOM (Electricity Distribution Company) or State Energy Department
                  </p>
                  <p>
                    📞 <strong>Special Category States:</strong> If your state qualifies for the additional 10% central subsidy, it has been included in the calculation above
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center animate-fade-in">
              <p className="text-lg text-gray-700 mb-4 font-medium">
                Ready to start your solar journey? Get a detailed proposal!
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a href="tel:9771045001" className="btn-primary">
                  <FiZap className="inline mr-2" />
                  Call Now: 9771045001
                </a>
                <a href="#contact" className="btn-secondary">
                  Get Free Consultation
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
