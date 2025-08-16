'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const heroImages = [
  {
    src: '/images/crowd-shots/crowd-shot-1.jpg',
    alt: 'P-Man Foundation community gathering with large group'
  },
  {
    src: '/images/crowd-shots/crowd-shot-2.jpg', 
    alt: 'P-Man Foundation community event with participants'
  },
  {
    src: '/images/crowd-shots/crowd-shot-3.jpg',
    alt: 'P-Man Foundation community crowd shot'
  }
];

interface CyclingHeroProps {
  children: React.ReactNode;
}

export function CyclingHero({ children }: CyclingHeroProps) {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center bg-gray-900">
      {/* Background Images with Transition */}
      {heroImages.map((image, index) => (
        <Image
          key={image.src}
          src={image.src}
          alt={image.alt}
          fill
          className={`object-cover transition-opacity duration-1000 ${
            index === currentImage ? 'opacity-100' : 'opacity-0'
          }`}
          priority={index === 0}
        />
      ))}
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Image Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentImage 
                ? 'bg-white' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`View image ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}