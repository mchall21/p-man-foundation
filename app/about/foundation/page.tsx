import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Foundation & Mission',
  description: 'Learn about the P-Man Foundation mission and how we work.',
};

export default function FoundationPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-8">Foundation & Mission</h1>
      
      <div className="prose prose-lg max-w-none">
        <div className="bg-blue-50 p-8 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg">
            We fund microgrants that create practical, sober social activities so people 
            can keep building one more good day.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">How We Work</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Rolling applications reviewed throughout the year</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Spring disbursement of grants</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Small grants ($500-$10,000) with clear, practical use</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Focus on post-treatment reintegration and community building</span>
            </li>
          </ul>
        </div>

        <div className="bg-green-50 p-8 rounded-lg mb-12">
          <h2 className="text-2xl font-bold mb-4">100% to Grants</h2>
          <p className="text-lg">
            Every dollar you donate goes directly to funding grants. Our annual Pedal for P-Man 
            ride covers all operational costs through ticket sales, ensuring maximum impact 
            from your contribution.
          </p>
        </div>

        {/* YouTube Video Embed */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Patrick's Story</h2>
          <div className="aspect-video rounded-lg overflow-hidden">
            <iframe
              src="https://www.youtube.com/embed/ZBCQMdtdLWc"
              title="Patrick's Story"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>

        <div className="bg-amber-50 p-8 rounded-lg mb-12">
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p className="text-lg mb-4">
            The P-Man Foundation was born from love, loss, and hope. We are made up of Patrick's 
            friends and family who walked alongside him through multiple cycles of recovery and relapse. 
            Through those experiences, we witnessed something crucial that shaped our mission.
          </p>
          <p className="text-lg mb-4">
            While there was significant attention and resources dedicated to the early stages of 
            recovery—the critical first days and weeks—we saw a gap in support for what comes next: 
            the long journey of maintenance and reintegration into everyday life.
          </p>
          <p className="text-lg">
            From this understanding, we landed on our "one more good day" mission. Because recovery 
            isn't just about getting clean—it's about building a life worth living, one day at a time, 
            surrounded by community and purpose.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Our Values</h3>
            <ul className="space-y-2">
              <li>• Community over isolation</li>
              <li>• Action over intention</li>
              <li>• Progress over perfection</li>
              <li>• Hope over despair</li>
            </ul>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Contact Information</h3>
            <p className="mb-2">{SITE_CONFIG.mailingAddress.line1}</p>
            <p className="mb-2">
              {SITE_CONFIG.mailingAddress.city}, {SITE_CONFIG.mailingAddress.state}
            </p>
            <p className="mb-4">EIN: {SITE_CONFIG.ein}</p>
            <p className="text-sm text-gray-600">501(c)(3) Tax-Exempt Organization</p>
          </div>
        </div>

        <div className="bg-blue-600 text-white p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="mb-6">
            Your support helps create more opportunities for people in recovery to build 
            meaningful connections and enjoy sober social activities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/donate"
              className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors text-center"
            >
              Donate Now
            </a>
            <a
              href="/grants"
              className="border-2 border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-blue-600 transition-colors text-center"
            >
              Apply for a Grant
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}