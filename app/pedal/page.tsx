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
      
      {/* Save the Date */}
      <div className="bg-blue-600 text-white p-8 rounded-lg mb-12 text-center">
        <h2 className="text-4xl font-bold mb-4">Save the Date!</h2>
        <div className="text-6xl font-bold mb-4">November 8, 2025</div>
        <p className="text-2xl mb-6">
          Join us for the 10th annual Pedal for P-Man ride!
        </p>
        <div className="bg-blue-700 rounded-lg p-6 max-w-2xl mx-auto">
          <h3 className="font-bold text-xl mb-2">Location</h3>
          <p className="text-lg">Grant Park, Atlanta, Georgia</p>
          <p className="text-lg mt-4 text-blue-200">More details to come</p>
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
              Nine years. Hundreds of riders. Thousands of miles. See our journey from a day of remembrance to a movement.
            </p>
          </div>
        </a>
        <a href="/about/foundation" className="group">
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
              Learn About Our Mission
            </h3>
            <p className="text-gray-600">
              Discover how we fund microgrants that create practical, sober social activities for "one more good day."
            </p>
          </div>
        </a>
      </div>
    </div>
  );
}