import type { Metadata } from 'next';
import { EXTERNAL_LINKS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Pedal for P-Man',
  description: 'Join our annual cycling event that funds the P-Man Foundation.',
};

export default function PedalPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-8">Pedal for P-Man</h1>
      
      {/* Hero Section */}
      <div className="bg-blue-600 text-white p-8 rounded-lg mb-12">
        <h2 className="text-3xl font-bold mb-4">This Year's Ride</h2>
        <p className="text-xl mb-6">
          Join us for the 10th annual Pedal for P-Man ride in Atlanta!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold mb-2">Date & Time</h3>
            <p>November 2024 (Date TBD)</p>
            <p>Registration: 8:00 AM</p>
            <p>Ride Start: 9:00 AM</p>
          </div>
          <div>
            <h3 className="font-bold mb-2">Location</h3>
            <p>Atlanta, Georgia</p>
            <p>Starting Point TBD</p>
          </div>
        </div>
        <div className="mt-6">
          <a
            href={EXTERNAL_LINKS.eventbrite || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
          >
            Register on Eventbrite
          </a>
        </div>
      </div>

      {/* Event Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold mb-3">Route Options</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• 10-mile family friendly</li>
            <li>• 25-mile intermediate</li>
            <li>• 50-mile challenge</li>
            <li>• 100-mile century (experienced riders)</li>
          </ul>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold mb-3">What's Included</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• Event t-shirt</li>
            <li>• Rest stops with refreshments</li>
            <li>• Post-ride celebration</li>
            <li>• Support vehicles</li>
          </ul>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold mb-3">Registration</h3>
          <p className="text-gray-700 mb-3">Early Bird: $35</p>
          <p className="text-gray-700 mb-3">Regular: $45</p>
          <p className="text-gray-700">Day-of: $55</p>
          <p className="text-sm text-gray-600 mt-3">100% funds operations</p>
        </div>
      </div>

      {/* Why Ride */}
      <div className="bg-gray-50 p-8 rounded-lg mb-12">
        <h2 className="text-3xl font-bold mb-6">Why We Ride</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
            <p className="text-gray-700">of donations go to grants</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">$500K+</div>
            <p className="text-gray-700">granted since 2016</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">50,000+</div>
            <p className="text-gray-700">good days created</p>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <a href="/pedal/history" className="group">
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
              Event History
            </h3>
            <p className="text-gray-600">
              Nine years. Hundreds of riders. Thousands of miles. See our journey.
            </p>
          </div>
        </a>
        <a href="/pedal/pledge" className="group">
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
              Pledge-to-Ride
            </h3>
            <p className="text-gray-600">
              Can't make the event? Pledge a dollar amount per mile and support from anywhere.
            </p>
          </div>
        </a>
      </div>
    </div>
  );
}