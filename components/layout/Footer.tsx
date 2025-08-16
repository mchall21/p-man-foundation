import Link from 'next/link';
import { SITE_CONFIG, NAVIGATION, EXTERNAL_LINKS, SOCIAL_LINKS } from '@/lib/constants';

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
              <div>
                <p className="font-semibold">Mailing Address</p>
                <p className="text-sm">{SITE_CONFIG.mailingAddress.line2}</p>
                <p className="text-sm">
                  {SITE_CONFIG.mailingAddress.city}, {SITE_CONFIG.mailingAddress.state} {SITE_CONFIG.mailingAddress.zip}
                </p>
              </div>
              <div className="pt-2">
                <p className="text-sm">
                  <span className="font-semibold">EIN:</span> {SITE_CONFIG.ein}
                </p>
                <p className="text-sm">501(c)(3) Tax-Exempt Organization</p>
              </div>
              
              {/* Social Links */}
              <div className="pt-4">
                <p className="font-semibold mb-2">Follow Us</p>
                <div className="flex space-x-3">
                  <a
                    href={SOCIAL_LINKS.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    <span className="sr-only">Facebook</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a
                    href={SOCIAL_LINKS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    <span className="sr-only">Instagram</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm5 6.25c0-.621-.504-1.125-1.125-1.125h-7.75C5.504 5.125 5 5.629 5 6.25v7.5c0 .621.504 1.125 1.125 1.125h7.75c.621 0 1.125-.504 1.125-1.125v-7.5zM10 7.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zm0 1.25a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zm2.875-.625a.625.625 0 11-1.25 0 .625.625 0 011.25 0z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
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