import Link from 'next/link';
import Image from 'next/image';
import { EXTERNAL_LINKS } from '@/lib/constants';
import { CyclingHero } from '@/components/ui/cycling-hero';
import { ImpactSummary } from '@/components/ui/impact-summary';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <CyclingHero>
        <div className="text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-playfair mb-6">
            One more good day.
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
            We fund small, practical grants that create sober social activities. 
            String enough of those together and you change a life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={EXTERNAL_LINKS.paypal}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-8 py-4 rounded-md text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Donate
            </Link>
            <Link
              href="/grants"
              className="bg-green-600 text-white px-8 py-4 rounded-md text-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Apply
            </Link>
          </div>
        </div>
      </CyclingHero>

      {/* Impact Summary */}
      <ImpactSummary />

      {/* 100% Message */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-playfair mb-4">100% of donations go to grants</h2>
          <p className="text-lg text-gray-700">
            Our annual ride funds itself via tickets, ensuring every dollar you donate 
            directly supports sober social activities in our communities.
          </p>
        </div>
      </section>

      {/* Feature Tiles */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/about/patrick" className="group">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48">
                  <Image
                    src="/images/patrick-bike.webp"
                    alt="Patrick on his bike"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold font-playfair mb-2 group-hover:text-blue-600 transition-colors">
                    Patrick's Story
                  </h3>
                  <p className="text-gray-600">
                    Learn about Patrick and the meaning behind "one more good day."
                  </p>
                </div>
              </div>
            </Link>

            <Link href="/grants" className="group">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48">
                  <Image
                    src="/images/ride-photos/2018/event-photo-1.jpg"
                    alt="Grant recipients enjoying activities"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold font-playfair mb-2 group-hover:text-blue-600 transition-colors">
                    Our Grants
                  </h3>
                  <p className="text-gray-600">
                    See how microgrants create lasting impact in recovery communities.
                  </p>
                </div>
              </div>
            </Link>

            <Link href="/pedal" className="group">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48">
                  <Image
                    src="/images/ride-photos/2016/group-photo-1.jpg"
                    alt="Pedal for P-Man cyclists"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold font-playfair mb-2 group-hover:text-blue-600 transition-colors">
                    Pedal for P-Man
                  </h3>
                  <p className="text-gray-600">
                    Join our annual ride and be part of the movement.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}