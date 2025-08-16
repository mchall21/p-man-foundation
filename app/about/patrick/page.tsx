import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Patrick's Story",
  description: 'Learn about Patrick and the meaning behind "one more good day."',
};

export default function PatrickStoryPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-8">Patrick's Story</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-700 mb-8">
          Patrick described sobriety as stringing together one more good day after another. 
          That idea powers everything we do.
        </p>

        <div className="bg-gray-100 p-8 rounded-lg my-8">
          <blockquote className="text-2xl italic text-center text-gray-800">
            "One more good day."
          </blockquote>
        </div>

        <p className="mb-6">
          Patrick's journey through recovery taught us that the path to lasting sobriety 
          isn't just about avoiding substances—it's about building a life worth living, 
          one day at a time. He understood that social connection and meaningful activities 
          were essential to recovery.
        </p>

        <p className="mb-6">
          The annual Pedal for P-Man ride began as a way to honor Patrick's memory and 
          continue his mission. What started as a small group of friends cycling through 
          Atlanta has grown into a movement that funds dozens of grants each year.
        </p>

        <p className="mb-6">
          Through the P-Man Foundation, we're ensuring that Patrick's vision lives on—
          helping people in recovery find community, purpose, and joy in sober activities. 
          Every grant we fund, every event we support, is another opportunity for someone 
          to have one more good day.
        </p>

        {/* Photo Gallery Placeholder */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-12">
          <div className="aspect-video bg-gray-300 rounded-lg"></div>
          <div className="aspect-video bg-gray-300 rounded-lg"></div>
          <div className="aspect-video bg-gray-300 rounded-lg"></div>
          <div className="aspect-video bg-gray-300 rounded-lg"></div>
        </div>

        <div className="bg-blue-50 p-8 rounded-lg mt-12">
          <h2 className="text-2xl font-bold mb-4">Continue Patrick's Legacy</h2>
          <p className="mb-4">
            Help us create more good days for people in recovery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/donate"
              className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors text-center"
            >
              Make a Donation
            </a>
            <a
              href="/pedal"
              className="bg-green-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-700 transition-colors text-center"
            >
              Join the Ride
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}