import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Patrick's Story",
  description: 'Learn about Patrick and the meaning behind "one more good day."',
};

export default function PatrickStoryPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold font-playfair mb-8">Patrick's Story</h1>
      
      <div className="prose prose-lg max-w-none">
        {/* Hero Image */}
        <div className="mb-12">
          <Image
            src="/images/patrick-bike.webp"
            alt="Patrick on his bike"
            width={800}
            height={600}
            className="rounded-lg shadow-lg mx-auto"
          />
        </div>

        <div className="bg-red-50 border-l-4 border-red-400 p-6 mb-8">
          <h2 className="text-2xl font-bold font-playfair mb-4">In the Fall of 2015, Patrick Hall died of a drug overdose.</h2>
          <p className="text-lg text-gray-700">
            He wouldn't have wanted us to sugar coat that fact.
          </p>
        </div>

        <p className="text-xl text-gray-700 mb-8">
          Patrick spent the last years of his life facing addiction head on, raising awareness of the disease, 
          spreading knowledge about overdose prevention, and urging everyone he knew to "Choose Health" whenever possible. 
          Addiction took Patrick's life, but his memory and purpose live on through his friends, family, and message.
        </p>

        <div className="bg-blue-50 p-8 rounded-lg my-8">
          <blockquote className="text-2xl italic text-center text-gray-800 font-playfair">
            "One more good day."
          </blockquote>
          <p className="text-center text-gray-600 mt-4">
            Patrick described sobriety as stringing together one more good day after another. 
            That idea powers everything we do.
          </p>
        </div>

        <h2 className="text-3xl font-bold font-playfair mb-6">Patrick's Life</h2>
        <p className="mb-6">
          Born on November 5th, 1985, Patrick was raised in Atlanta but remained fiercely loyal to the family, 
          friends, and sports teams of his place of birth, Chicago. Known affectionately as "P-Man" by his siblings 
          "Megzy," "Doodle," and "Mo," he was surrounded in life by love, humor, and bad nicknames. Patrick brought 
          infectious laughter and an unparalleled emotional sensitivity to every situation and person he encountered.
        </p>

        <h2 className="text-3xl font-bold font-playfair mb-6">Patrick's Mission</h2>
        <p className="mb-6">
          In the last years of his life, Patrick committed himself to "choose health" and to help others. To Patrick, 
          "Choose Health" meant more than just staying fit. It meant actively making decisions that better yourself, 
          whenever possible, whether they be about the food you eat, the company you keep, or the habits you develop. 
          This mantra is what led him to cycling in the first place, and it's what sparked the idea for "Pedal For P-Man."
        </p>

        <p className="mb-6">
          Patrick's journey through recovery taught us that the path to lasting sobriety isn't just about avoiding 
          substances—it's about building a life worth living, one day at a time. He understood that social connection 
          and meaningful activities were essential to recovery.
        </p>

        <p className="mb-6">
          Patrick's work, both professionally and voluntarily, strove to help those who so often go overlooked—the 
          homeless, the addicted, the forgotten. He was actively involved with{' '}
          <a href="https://www.shatterproof.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
            Shatterproof
          </a>{' '}and{' '}
          <a href="http://www.georgiaoverdoseprevention.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
            GA Overdose Prevention
          </a>, 
          both of which help make Pedal For P-Man possible.
        </p>

        <p className="mb-8">
          The annual Pedal for P-Man ride began as a way to honor Patrick's memory and continue his mission. 
          What started as a small group of friends cycling through Atlanta has grown into a movement that funds 
          dozens of grants each year, creating opportunities for people in recovery to have one more good day.
        </p>

        <hr className="my-12 border-gray-300" />

        <h2 className="text-3xl font-bold font-playfair mb-6">What he would want us to remember</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <ul className="space-y-3 text-lg">
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">•</span>
                <span><strong>His loyalty</strong> – to friends and family, places and ideas.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">•</span>
                <span><strong>His fandom</strong> – The Cubs, The Bears, The Bulldawgs, The USMNT.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">•</span>
                <span><strong>His laughter</strong> – infectious and easy.</span>
              </li>
            </ul>
          </div>
          <div>
            <ul className="space-y-3 text-lg">
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">•</span>
                <span><strong>His stubbornness</strong> – the frustrating, inescapable byproduct of loyalty.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">•</span>
                <span><strong>His sensitivity</strong> – both to highs and lows.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">•</span>
                <span><strong>His musical idols</strong> – 2Pac, Outkast, Frank Sinatra, Whoever wrote the Mulan Soundtrack.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-blue-50 p-8 rounded-lg mt-12">
          <h2 className="text-2xl font-bold font-playfair mb-4">Continue Patrick's Legacy</h2>
          <p className="mb-6">
            Through the P-Man Foundation, we're ensuring that Patrick's vision lives on—helping people in recovery 
            find community, purpose, and joy in sober activities. Every grant we fund, every event we support, 
            is another opportunity for someone to have one more good day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/donate"
              className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors text-center"
            >
              Make a Donation
            </Link>
            <Link
              href="/pedal"
              className="bg-green-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-700 transition-colors text-center"
            >
              Join the Ride
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}