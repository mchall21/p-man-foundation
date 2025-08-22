'use client';

import { useState } from 'react';
import Image from 'next/image';

interface YearData {
  year: number;
  title: string;
  description: string;
  tshirt: string;
  photos?: string[];
}

const timelineData: YearData[] = [
  {
    year: 2016,
    title: "A Day of Remembrance",
    description: "It started simple—friends and family on the Atlanta Beltline, honoring Patrick's memory through something he loved: riding bikes.",
    tshirt: "/images/pedal-history/tshirts/2016_Shirt.png",
    photos: [
      "/images/pedal-history/photos/2016_photo.jpg",
      "/images/pedal-history/photos/2016_photo2.jpg",
      "/images/pedal-history/photos/2016_photo3.jpg"
    ]
  },
  {
    year: 2017,
    title: "Growing Community",
    description: "Word spread. More people joined. We saw the power of bringing people together for remembrance and connection.",
    tshirt: "/images/pedal-history/tshirts/2017_Shirt.png",
    photos: [
      "/images/pedal-history/photos/2017_photo.jpg",
      "/images/pedal-history/photos/2017_photo2.jpg",
      "/images/pedal-history/photos/2017_photo3.jpg"
    ]
  },
  {
    year: 2018,
    title: "Becoming a Movement",
    description: "Pedal for P-Man evolved beyond remembrance—it became a fundraising engine and a movement for recovery communities.",
    tshirt: "/images/pedal-history/tshirts/2018_Shirt.png",
    photos: [
      "/images/pedal-history/photos/2018_photo.jpg",
      "/images/pedal-history/photos/2018_photo2.jpg",
      "/images/pedal-history/photos/2018_photo3.jpg"
    ]
  },
  {
    year: 2019,
    title: "Finding Our Mission",
    description: "We understood our unique role: funding practical, sober social activities that help people build 'one more good day' in recovery.",
    tshirt: "/images/pedal-history/tshirts/2019_Shirt.png",
    photos: [
      "/images/pedal-history/photos/2019_photo.jpg",
      "/images/pedal-history/photos/2019_photo2.jpg",
      "/images/pedal-history/photos/2019_photo3.jpg"
    ]
  },
  {
    year: 2020,
    title: "Adapting & Persevering",
    description: "Even in challenging times, our community showed resilience, adapting while maintaining our commitment to recovery support.",
    tshirt: "/images/pedal-history/tshirts/2020_Shirt.png"
  },
  {
    year: 2021,
    title: "Grants Begin",
    description: "We launched our first formal grant program, funding impactful projects. Participants began seeing the direct impact of their support.",
    tshirt: "/images/pedal-history/tshirts/2021_Shirt.png"
  },
  {
    year: 2022,
    title: "Expanding Reach",
    description: "Our grant program grew, supporting more organizations and reaching more people. The ride celebrated both memory and impact.",
    tshirt: "/images/pedal-history/tshirts/2022_Shirt.png"
  },
  {
    year: 2023,
    title: "Celebrating Success",
    description: "With proven grant effectiveness, participants could see real difference. Success stories became central to our gathering.",
    tshirt: "/images/pedal-history/tshirts/2023_Shirt.png"
  },
  {
    year: 2024,
    title: "A True Movement",
    description: "More than an event—a movement bringing together community, purpose, and impact. The best parts: community support, seeing grants work, remembering Patrick, and being kids again on bikes.",
    tshirt: "/images/pedal-history/tshirts/2024_Shirt.png",
    photos: [
      "/images/pedal-history/photos/2024_photo.jpg",
      "/images/pedal-history/photos/2024_photo2.jpg",
      "/images/pedal-history/photos/2024_photo3.jpg"
    ]
  }
];

export default function PedalHistoryPage() {
  const [selectedGallery, setSelectedGallery] = useState<YearData | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Pedal for P-Man: A Timeline</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          From a day of remembrance on the Beltline to a fundraising engine and movement, 
          discover how Pedal for P-Man has grown while staying true to its heart.
        </p>
      </div>

      {/* What Makes It Special */}
      <div className="bg-blue-50 p-8 rounded-lg mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">What People Love About Pedal for P-Man</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-bold text-lg mb-2 text-blue-600">Community & Support</h3>
            <p className="text-gray-700">Connecting with others who understand the journey and share the mission.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-bold text-lg mb-2 text-blue-600">Mission & Purpose</h3>
            <p className="text-gray-700">Being part of something meaningful that creates real change in recovery communities.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-bold text-lg mb-2 text-blue-600">Seeing Grant Impact</h3>
            <p className="text-gray-700">Witnessing firsthand how contributions transform lives and strengthen communities.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-bold text-lg mb-2 text-blue-600">Remembering Patrick</h3>
            <p className="text-gray-700">Honoring his memory while celebrating the hope and healing he would have wanted.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-bold text-lg mb-2 text-blue-600">Being a Kid Again</h3>
            <p className="text-gray-700">The pure joy of riding bikes together, laughing, and embracing playfulness.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-bold text-lg mb-2 text-blue-600">Sober Connection</h3>
            <p className="text-gray-700">Building meaningful relationships in a supportive, substance-free environment.</p>
          </div>
        </div>
      </div>

      {/* T-Shirt Focused Timeline */}
      <div className="relative mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">The Journey Through T-Shirts</h2>
        
        {/* Scroll container */}
        <div className="overflow-x-auto pb-6">
          <div className="flex space-x-8 min-w-max px-4">
            {timelineData.map((yearData, index) => (
              <div key={yearData.year} className="flex-shrink-0 w-80">
                {/* Year marker */}
                <div className="text-center mb-4">
                  <div className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full font-bold text-lg">
                    {yearData.year}
                  </div>
                </div>
                
                {/* Card with T-shirt focus */}
                <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 h-[500px] flex flex-col">
                  {/* Large T-shirt Image */}
                  <div className="relative mb-4 bg-gray-50 rounded-lg p-4 flex-shrink-0">
                    <Image
                      src={yearData.tshirt}
                      alt={`${yearData.year} t-shirt design`}
                      width={200}
                      height={160}
                      className="w-full h-40 object-contain"
                    />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-blue-600">{yearData.title}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed flex-grow">{yearData.description}</p>
                  
                  {/* Photo Gallery Button */}
                  {yearData.photos && yearData.photos.length > 0 && (
                    <button
                      onClick={() => setSelectedGallery(yearData)}
                      className="mt-4 bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center space-x-2"
                    >
                      <span>📸</span>
                      <span>Click to Reminisce</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Scroll hint */}
        <div className="text-center text-gray-500 text-sm mt-4">
          ← Scroll to see our journey through the years →
        </div>
      </div>

      {/* Photo Gallery Modal */}
      {selectedGallery && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-blue-600">
                  {selectedGallery.year} - {selectedGallery.title}
                </h3>
                <button
                  onClick={() => setSelectedGallery(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              {/* Photo Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedGallery.photos?.map((photo, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={photo}
                      alt={`${selectedGallery.year} photo ${index + 1}`}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Call to action */}
      <div className="bg-blue-600 text-white p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Be Part of the Story</h2>
        <p className="mb-6 text-lg">
          Join us for the next chapter of Pedal for P-Man and help us continue building 
          one more good day for people in recovery.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/pedal"
            className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
          >
            Join This Year's Ride
          </a>
          <a
            href="/grants"
            className="border-2 border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-blue-600 transition-colors"
          >
            Learn About Our Grants
          </a>
        </div>
      </div>
    </div>
  );
}