import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Impact',
  description: 'See the measurable impact of P-Man Foundation grants on recovery communities.',
};

export default function ImpactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-8">Our Impact</h1>
      
      <div className="prose prose-lg max-w-4xl mb-12">
        <p className="text-xl text-gray-700">
          The math is simple. A funded event creates time together without alcohol. 
          Those days stack. That's impact.
        </p>
      </div>

      {/* Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Total Granted</h3>
          <p className="text-4xl font-bold text-blue-600">$500,000+</p>
          <p className="text-sm text-gray-500 mt-2">Since 2016</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Organizations Funded</h3>
          <p className="text-4xl font-bold text-green-600">150+</p>
          <p className="text-sm text-gray-500 mt-2">Across multiple states</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Estimated Good Days</h3>
          <p className="text-4xl font-bold text-purple-600">50,000+</p>
          <p className="text-sm text-gray-500 mt-2">And counting</p>
        </div>
      </div>

      {/* Methodology Note */}
      <div className="bg-gray-50 p-6 rounded-lg mb-12">
        <h2 className="text-2xl font-bold mb-4">How We Measure Impact</h2>
        <p className="text-gray-700">
          We estimate "good days" by multiplying participants × event days. When we don't have 
          exact attendance, grantees provide a conservative estimate. Every funded activity—from 
          sober softball leagues to recovery art classes—creates opportunities for connection 
          without substances.
        </p>
      </div>

      {/* Chart Placeholders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">Grants by Year</h3>
          <div className="h-64 bg-gray-200 rounded flex items-center justify-center">
            <p className="text-gray-500">Bar Chart Placeholder</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">Grant Categories</h3>
          <div className="h-64 bg-gray-200 rounded flex items-center justify-center">
            <p className="text-gray-500">Donut Chart Placeholder</p>
          </div>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
        <h3 className="text-xl font-bold mb-4">Grantee Locations</h3>
        <div className="h-96 bg-gray-200 rounded flex items-center justify-center">
          <p className="text-gray-500">Map Placeholder</p>
        </div>
      </div>

      {/* Success Stories */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-8">Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-48 bg-gray-300"></div>
            <div className="p-6">
              <blockquote className="text-lg italic mb-4">
                "The grant allowed us to start a weekly sober bowling league. 
                We've had over 100 participants and it's become a cornerstone 
                of our recovery community."
              </blockquote>
              <p className="text-sm text-gray-600">— Recovery Center, Atlanta</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-48 bg-gray-300"></div>
            <div className="p-6">
              <blockquote className="text-lg italic mb-4">
                "With P-Man's support, we launched monthly outdoor adventures. 
                These trips give people in early recovery something to look 
                forward to beyond meetings."
              </blockquote>
              <p className="text-sm text-gray-600">— Sober Living Home, Georgia</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Be Part of the Impact</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Every donation creates more opportunities for people in recovery to find 
          community and joy in sobriety.
        </p>
        <a
          href="/donate"
          className="inline-block bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
        >
          Donate Now
        </a>
      </div>
    </div>
  );
}