import Link from 'next/link';
import { SITE_CONFIG, NAVIGATION, EXTERNAL_LINKS } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">{SITE_CONFIG.name}</h3>
            <p className="text-gray-300 mb-4">{SITE_CONFIG.tagline}</p>
            <p className="text-sm text-gray-400">
              {SITE_CONFIG.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {NAVIGATION.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-gray-300">
              <p className="font-semibold">{SITE_CONFIG.mailingAddress.line1}</p>
              {SITE_CONFIG.mailingAddress.line2 && (
                <p>{SITE_CONFIG.mailingAddress.line2}</p>
              )}
              <p>
                {SITE_CONFIG.mailingAddress.city}, {SITE_CONFIG.mailingAddress.state} {SITE_CONFIG.mailingAddress.zip}
              </p>
              <p className="pt-2">
                <span className="font-semibold">EIN:</span> {SITE_CONFIG.ein}
              </p>
              <p className="text-sm">501(c)(3) Tax-Exempt Organization</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400 mb-4 md:mb-0">
              © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <Link
                href="/donate"
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Donate Now
              </Link>
              <Link
                href={EXTERNAL_LINKS.grantApplication}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
              >
                Apply for Grant
              </Link>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">
            100% of donations go to grants. Our annual ride funds itself via tickets.
          </p>
        </div>
      </div>
    </footer>
  );
}