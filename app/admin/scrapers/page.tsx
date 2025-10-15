// app/admin/scrapers/page.tsx
'use client';

import { useState } from 'react';
import { RefreshCw, CheckCircle2, XCircle, Clock, Database, TrendingUp } from 'lucide-react';

interface TestResult {
  status: string;
  data: any;
  error: any;
  duration: number;
}

interface TestResponse {
  success: boolean;
  status: string;
  results: {
    subsidyScraper: TestResult;
    priceScraper: TestResult;
  };
  totalDuration: string;
  timestamp: string;
  note?: string;
}

export default function ScraperAdminDashboard() {
  const [loading, setLoading] = useState(false);
  const [testResults, setTestResults] = useState<TestResponse | null>(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const runTest = async () => {
    if (!password) {
      setError('Please enter password');
      return;
    }

    setLoading(true);
    setError('');
    setTestResults(null);

    try {
      const response = await fetch('/api/test-scrapers', {
        headers: {
          'Authorization': `Bearer ${password}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Test failed');
      }

      setTestResults(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600';
      case 'failed': return 'text-red-600';
      case 'all_passed': return 'text-green-600';
      case 'all_failed': return 'text-red-600';
      case 'partial': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'failed': return <XCircle className="w-5 h-5 text-red-600" />;
      default: return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                🔧 Scraper Admin Dashboard
              </h1>
              <p className="text-gray-600">
                Test and monitor web scrapers (runs on server, no browser visible on your machine)
              </p>
            </div>
            <Database className="w-12 h-12 text-blue-600" />
          </div>
        </div>

        {/* Test Control */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">🧪 Run Scraper Test</h2>
          
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter TEST_PASSWORD"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && runTest()}
              />
              <p className="text-xs text-gray-500 mt-1">
                Set in Vercel environment variables as TEST_PASSWORD
              </p>
            </div>
            
            <button
              onClick={runTest}
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Testing...' : 'Run Test'}
            </button>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              ❌ {error}
            </div>
          )}
        </div>

        {/* Test Results */}
        {testResults && (
          <div className="space-y-6">
            {/* Overall Status */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">📊 Test Results</h2>
                <span className={`text-lg font-bold ${getStatusColor(testResults.status)}`}>
                  {testResults.status.toUpperCase().replace('_', ' ')}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">Total Duration</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">{testResults.totalDuration}</p>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Database className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium text-gray-700">Execution Mode</span>
                  </div>
                  <p className="text-sm font-bold text-purple-600">HEADLESS (Server-side)</p>
                </div>
              </div>

              {testResults.note && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                  ℹ️ {testResults.note}
                </div>
              )}

              <p className="text-xs text-gray-500 mt-4">
                Tested at: {new Date(testResults.timestamp).toLocaleString()}
              </p>
            </div>

            {/* Subsidy Scraper Result */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  {getStatusIcon(testResults.results.subsidyScraper.status)}
                  📋 PM Surya Ghar Scraper
                </h3>
                <span className="text-sm text-gray-500">
                  {(testResults.results.subsidyScraper.duration / 1000).toFixed(2)}s
                </span>
              </div>

              {testResults.results.subsidyScraper.status === 'success' ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">Up to 2 kW</p>
                      <p className="text-xl font-bold text-green-600">
                        ₹{testResults.results.subsidyScraper.data.upTo2kW.toLocaleString()}/kW
                      </p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">2-3 kW</p>
                      <p className="text-xl font-bold text-blue-600">
                        ₹{testResults.results.subsidyScraper.data.from2To3kW.toLocaleString()}/kW
                      </p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">Above 3 kW</p>
                      <p className="text-xl font-bold text-purple-600">
                        ₹{testResults.results.subsidyScraper.data.above3kW.toLocaleString()}
                      </p>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">Special Bonus</p>
                      <p className="text-xl font-bold text-yellow-600">
                        +{testResults.results.subsidyScraper.data.specialBonus}%
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    Source: {testResults.results.subsidyScraper.data.source} | 
                    Last Updated: {testResults.results.subsidyScraper.data.lastUpdated}
                  </p>
                </div>
              ) : (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  ❌ {testResults.results.subsidyScraper.error}
                </div>
              )}
            </div>

            {/* Price Scraper Result */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  {getStatusIcon(testResults.results.priceScraper.status)}
                  💰 Solar Price Scraper
                </h3>
                <span className="text-sm text-gray-500">
                  {(testResults.results.priceScraper.duration / 1000).toFixed(2)}s
                </span>
              </div>

              {testResults.results.priceScraper.status === 'success' ? (
                <div className="space-y-4">
                  {/* Residential Prices */}
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      <h4 className="font-bold text-blue-900">Residential</h4>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Average</p>
                        <p className="text-lg font-bold text-blue-600">
                          ₹{testResults.results.priceScraper.data.residential.average.toLocaleString()}/kW
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Min - Max</p>
                        <p className="text-sm font-medium text-gray-700">
                          ₹{testResults.results.priceScraper.data.residential.min.toLocaleString()} - 
                          ₹{testResults.results.priceScraper.data.residential.max.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Sources</p>
                        <p className="text-lg font-bold text-blue-600">
                          {testResults.results.priceScraper.data.residential.sources}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Commercial Prices */}
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="w-5 h-5 text-purple-600" />
                      <h4 className="font-bold text-purple-900">Commercial</h4>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Average</p>
                        <p className="text-lg font-bold text-purple-600">
                          ₹{testResults.results.priceScraper.data.commercial.average.toLocaleString()}/kW
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Min - Max</p>
                        <p className="text-sm font-medium text-gray-700">
                          ₹{testResults.results.priceScraper.data.commercial.min.toLocaleString()} - 
                          ₹{testResults.results.priceScraper.data.commercial.max.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Sources</p>
                        <p className="text-lg font-bold text-purple-600">
                          {testResults.results.priceScraper.data.commercial.sources}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500">
                    Last Updated: {testResults.results.priceScraper.data.lastUpdated}
                  </p>
                </div>
              ) : (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  ❌ {testResults.results.priceScraper.error}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Instructions */}
        {!testResults && !loading && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">📖 How to Use</h2>
            <div className="space-y-3 text-gray-700">
              <div className="flex items-start gap-3">
                <span className="text-2xl">1️⃣</span>
                <div>
                  <p className="font-medium">Set TEST_PASSWORD in Vercel</p>
                  <p className="text-sm text-gray-600">
                    Go to Vercel → Settings → Environment Variables → Add <code className="bg-gray-100 px-1 rounded">TEST_PASSWORD</code>
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">2️⃣</span>
                <div>
                  <p className="font-medium">Enter password above and click "Run Test"</p>
                  <p className="text-sm text-gray-600">
                    Scrapers will run on Vercel's server (headless mode - no browser visible)
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">3️⃣</span>
                <div>
                  <p className="font-medium">View real-time results</p>
                  <p className="text-sm text-gray-600">
                    Check subsidy rates and price averages extracted from live sources
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                💡 <strong>Note:</strong> This runs the exact same scraper code that the daily cron job uses. 
                If test passes here, your automated daily updates will work perfectly!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
