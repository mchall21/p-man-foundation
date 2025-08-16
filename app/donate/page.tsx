import type { Metadata } from 'next';
import { SITE_CONFIG, EXTERNAL_LINKS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Donate',
  description: '100% of donations fund grants. Support sober social activities in recovery communities.',
};

export default function DonatePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-8">Donate</h1>
      
      <div className="bg-blue-50 p-8 rounded-lg mb-12">
        <h2 className="text-2xl font-bold mb-4">100% of donations fund grants</h2>
        <p className="text-lg text-gray-700">
          Our annual ride funds itself via tickets, ensuring every dollar you donate 
          goes directly to creating sober social activities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Online Donation */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold mb-4">Donate Online</h3>
          <p className="text-gray-700 mb-6">
            Quick and secure online donation via PayPal. Your contribution is 
            tax-deductible to the fullest extent allowed by law.
          </p>
          <a
            href={EXTERNAL_LINKS.paypal}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors text-center"
          >
            Donate via PayPal
          </a>
        </div>

        {/* Mail Donation */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold mb-4">Donate by Mail</h3>
          <p className="text-gray-700 mb-4">
            Make checks payable to "The P-Man Foundation" and mail to:
          </p>
          <address className="not-italic text-gray-700 mb-4">
            <strong>{SITE_CONFIG.mailingAddress.line1}</strong><br />
            {SITE_CONFIG.mailingAddress.line2 && (
              <>{SITE_CONFIG.mailingAddress.line2}<br /></>
            )}
            {SITE_CONFIG.mailingAddress.city}, {SITE_CONFIG.mailingAddress.state} {SITE_CONFIG.mailingAddress.zip}
          </address>
          <p className="text-sm text-gray-600">
            We'll send a tax receipt for your records.
          </p>
        </div>
      </div>

      {/* Tax Information */}
      <div className="bg-gray-50 p-6 rounded-lg mb-12">
        <h3 className="text-lg font-bold mb-2">Tax Information</h3>
        <p className="text-gray-700">
          The P-Man Foundation is a 501(c)(3) tax-exempt organization. 
          EIN: {SITE_CONFIG.ein}
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Your donation is tax-deductible to the fullest extent allowed by law. 
          Please consult your tax advisor for specific questions about your donation.
        </p>
      </div>

      {/* Impact Reminder */}
      <div className="bg-green-50 p-8 rounded-lg mb-12">
        <h3 className="text-2xl font-bold mb-4">Your Impact</h3>
        <div className="space-y-3">
          <div className="flex items-start">
            <span className="text-green-600 font-bold mr-3">$50</span>
            <span>Funds supplies for a sober game night</span>
          </div>
          <div className="flex items-start">
            <span className="text-green-600 font-bold mr-3">$250</span>
            <span>Sponsors a month of recovery yoga classes</span>
          </div>
          <div className="flex items-start">
            <span className="text-green-600 font-bold mr-3">$500</span>
            <span>Launches a sober hiking group with gear</span>
          </div>
          <div className="flex items-start">
            <span className="text-green-600 font-bold mr-3">$1,000</span>
            <span>Creates a season of sober softball</span>
          </div>
          <div className="flex items-start">
            <span className="text-green-600 font-bold mr-3">$5,000</span>
            <span>Funds a year-long community program</span>
          </div>
        </div>
      </div>

      {/* Other Ways to Give */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h3 className="text-2xl font-bold mb-4">Other Ways to Support</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold mb-2">Join the Ride</h4>
            <p className="text-gray-700 mb-3">
              Participate in our annual Pedal for P-Man event.
            </p>
            <a href="/pedal" className="text-blue-600 hover:underline">
              Learn more →
            </a>
          </div>
          <div>
            <h4 className="font-bold mb-2">Pledge-to-Ride</h4>
            <p className="text-gray-700 mb-3">
              Pledge a dollar amount per mile ridden in November.
            </p>
            <a href="/pedal/pledge" className="text-blue-600 hover:underline">
              Start a pledge →
            </a>
          </div>
          <div>
            <h4 className="font-bold mb-2">Corporate Matching</h4>
            <p className="text-gray-700 mb-3">
              Many employers match charitable donations.
            </p>
            <a href="/contact" className="text-blue-600 hover:underline">
              Contact us →
            </a>
          </div>
          <div>
            <h4 className="font-bold mb-2">Planned Giving</h4>
            <p className="text-gray-700 mb-3">
              Include P-Man in your estate planning.
            </p>
            <a href="/contact" className="text-blue-600 hover:underline">
              Get in touch →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}