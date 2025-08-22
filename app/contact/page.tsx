import { SITE_CONFIG, SOCIAL_LINKS } from '@/lib/constants';

export default function ContactPage() {

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-8">Contact</h1>
      
      <div className="prose prose-lg max-w-none mb-12">
        <p className="text-xl text-gray-700">
          Say hello — or help out.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div>
          <div className="bg-blue-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Get In Touch</h2>
            <p className="text-lg text-gray-700 mb-6">
              Ready to get involved or have questions? We'd love to hear from you.
            </p>
            
            <div className="mb-6">
              <h3 className="font-bold text-lg mb-2">Email Us</h3>
              <a 
                href="mailto:molly@pmanfoundation.org"
                className="text-blue-600 hover:text-blue-700 text-lg font-medium"
              >
                molly@pmanfoundation.org
              </a>
              <p className="text-sm text-gray-600 mt-2">
                We typically respond within 24 hours
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-blue-200">
              <h4 className="font-bold mb-3">Ways to Help:</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Day-of event volunteers for Pedal for P-Man</li>
                <li>• Fundraising captains to expand our reach</li>
                <li>• Grantee outreach specialists</li>
                <li>• Board members with nonprofit experience</li>
                <li>• General volunteers and supporters</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Mailing Address */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Mailing Address</h3>
            <address className="not-italic text-gray-700">
              <strong>{SITE_CONFIG.mailingAddress.line1}</strong><br />
              {SITE_CONFIG.mailingAddress.line2 && (
                <>{SITE_CONFIG.mailingAddress.line2}<br /></>
              )}
              {SITE_CONFIG.mailingAddress.city}, {SITE_CONFIG.mailingAddress.state} {SITE_CONFIG.mailingAddress.zip}
            </address>
            <p className="text-sm text-gray-600 mt-4">
              EIN: {SITE_CONFIG.ein}<br />
              501(c)(3) Tax-Exempt Organization
            </p>
          </div>

          {/* Social Media */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Stay Connected</h3>
            <p className="text-gray-700 mb-4">
              Follow our journey and join the community creating more good days.
            </p>
            <div className="flex space-x-4">
              <a 
                href={SOCIAL_LINKS.facebook} 
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                </svg>
                <span>Facebook</span>
              </a>
              <a 
                href={SOCIAL_LINKS.instagram} 
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm5 6.25c0-.621-.504-1.125-1.125-1.125h-7.75C5.504 5.125 5 5.629 5 6.25v7.5c0 .621.504 1.125 1.125 1.125h7.75c.621 0 1.125-.504 1.125-1.125v-7.5zM10 7.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zm0 1.25a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zm2.875-.625a.625.625 0 11-1.25 0 .625.625 0 011.25 0z" clipRule="evenodd" />
                </svg>
                <span>Instagram</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <a
                href="/donate"
                className="block bg-blue-600 text-white px-4 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors text-center"
              >
                Make a Donation
              </a>
              <a
                href="/grants"
                className="block bg-green-600 text-white px-4 py-3 rounded-md font-semibold hover:bg-green-700 transition-colors text-center"
              >
                Apply for a Grant
              </a>
              <a
                href="/pedal"
                className="block bg-purple-600 text-white px-4 py-3 rounded-md font-semibold hover:bg-purple-700 transition-colors text-center"
              >
                Join Pedal for P-Man
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}