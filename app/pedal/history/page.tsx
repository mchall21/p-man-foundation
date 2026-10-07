import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { pedal2025Photos } from '@/lib/media-2025';

export const metadata: Metadata = {
  title: 'Ride History — The Shirts & the Memories',
  description: 'Explore the Pedal for P-Man shirts and photographs, year by year, from the first ride in 2016 to our tenth ride in 2025.',
};

const years = [
  { year: 2016, title: 'The first ride', description: 'Friends and family came together on the Atlanta Beltline to remember Patrick through something he loved: riding bikes.', photos: true },
  { year: 2017, title: 'Outkast', description: 'The 2017 design celebrates Outkast, one of Patrick’s favorite musical groups.', photos: true },
  { year: 2018, title: 'The Atlanta skyline', description: 'Atlanta’s skyline runs across the 2018 shirt—a tribute to the city where we ride together.', photos: true },
  { year: 2019, title: 'Da Bears', description: 'The 2019 shirt takes its inspiration from Mike Ditka and the Chicago Bears, one of Patrick’s favorite teams.', photos: true },
  { year: 2020, title: 'The COVID year', description: 'The pandemic inspired the 2020 design, marking a year unlike any other in the shirt collection.' },
  { year: 2021, title: 'The Chicago flag', description: 'The 2021 long-sleeve design featured the stars and stripes of the Chicago flag.' },
  { year: 2022, title: 'Irish roots', description: 'The green 2022 design celebrates Patrick’s Irish roots.' },
  { year: 2023, title: 'Decide', description: 'The heart on the 2023 shirt comes from Troy’s brand, Decide.' },
  { year: 2024, title: 'The Peachtree Road Race', description: 'The 2024 design takes its inspiration from the Peachtree Road Race, an Atlanta tradition.', photos: true },
];

export default function PedalHistoryPage() {
  return (
    <div className="page-shell py-12 md:py-20">
      <Link href="/pedal" className="text-sm font-semibold underline underline-offset-4">← This year’s ride</Link>
      <header className="mt-10 mb-10 max-w-3xl">
        <p className="eyebrow mb-5">Pedal for P-Man · Since 2016</p>
        <h1 className="section-heading">The shirts.<br />The rides. The memories.</h1>
        <p className="mt-6 text-lg leading-relaxed text-slate-600">Most years, the shirt captures something that mattered to Patrick: his music, his teams, his cities, his roots. Together, they tell a little of his story—and bring back memories of the rides we’ve shared since 2016.</p>
        <div className="mt-8 border-l-2 border-[#3d6757] pl-5"><h2 className="font-playfair text-2xl">The person behind the shirts</h2><p className="mt-3 leading-relaxed text-slate-600">A special thank-you to Audrey, Patrick’s sister-in-law, who designed the shirts year after year. The exception is the 2023 heart design, from Troy’s brand, Decide.</p></div>
      </header>
      <nav aria-label="Jump to a ride year" className="mb-14 flex flex-wrap gap-2 border-y border-slate-200 py-5">
        {[...years.map(({ year }) => year), 2025].map(year => <a key={year} href={`#ride-${year}`} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-blue-100">{year}</a>)}
      </nav>
      <div className="space-y-16 md:space-y-24">
        {years.map(({ year, title, description, photos }) => (
          <section key={year} id={`ride-${year}`} aria-labelledby={`heading-${year}`} className="scroll-mt-28 border-t border-[#c7cfcd] pt-8">
            <div className="grid items-center gap-6 md:grid-cols-[1fr_2fr] md:gap-12">
              <div>
                <p className="font-playfair text-6xl text-[#3d6757] md:text-7xl">{year}</p>
                <h2 id={`heading-${year}`} className="mt-4 font-playfair text-3xl">{title}</h2>
                <p className="mt-4 max-w-sm leading-relaxed text-slate-600">{description}</p>
              </div>
              <figure className="overflow-hidden rounded-2xl bg-[#e9e5da] p-3 sm:p-6">
                <Image src={`/images/pedal-history/tshirts/${year}_Shirt.png`} alt={`${year} Pedal for P-Man shirt, front and back`} width={900} height={450} sizes="(max-width: 768px) 100vw, 800px" className="h-auto w-full object-contain" />
                <figcaption className="mt-3 text-center text-xs font-semibold uppercase tracking-widest text-slate-600">The {year} shirt</figcaption>
              </figure>
            </div>
            {photos && <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[1, 2, 3].map(index => (
                <figure key={index} className="overflow-hidden rounded-xl bg-[#e9e5da]">
                  <Image src={`/images/pedal-history/photos/${year}_photo${index === 1 ? '' : index}.jpg`} alt={`From the ${year} Pedal for P-Man photo collection, photograph ${index}`} width={700} height={525} sizes="(max-width: 640px) 100vw, 33vw" className="aspect-[4/3] w-full object-contain" />
                </figure>
              ))}
            </div>}
          </section>
        ))}
        <section id="ride-2025" aria-labelledby="heading-2025" className="scroll-mt-28 border-t border-[#c7cfcd] pt-8">
          <p className="font-playfair text-6xl text-[#3d6757] md:text-7xl">2025</p>
          <h2 id="heading-2025" className="mt-4 font-playfair text-3xl">Ten years of showing up.</h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">The 2025 shirt celebrated our tenth anniversary with the message at the heart of it all: One More Good Day. Ten years of gathering, remembering Patrick, and riding together.</p>
          <div className="my-8 grid gap-4 sm:grid-cols-3">{[pedal2025Photos[11], pedal2025Photos[0], pedal2025Photos[1]].map(photo => <Image key={photo.src} src={photo.src} alt={photo.alt} width={700} height={525} sizes="(max-width: 640px) 100vw, 33vw" className="aspect-[4/3] w-full rounded-xl object-cover" />)}</div>
          <Link href="/pedal/2025" className="button-secondary">More 2025 photos &amp; the film →</Link>
        </section>
      </div>
      <section className="mt-20 rounded-2xl bg-blue-700 p-8 text-white md:p-12">
        <p className="text-sm font-semibold uppercase tracking-widest text-white/70">The next chapter</p>
        <h2 className="mt-4 font-playfair text-4xl">Make another memory with us.</h2>
        <div className="mt-8 flex flex-wrap gap-4"><Link href="/pedal" className="rounded-md bg-white px-6 py-3 font-semibold text-blue-700">The 2026 ride →</Link><Link href="/about/patrick" className="px-2 py-3 font-semibold underline underline-offset-4">Remembering Patrick</Link></div>
      </section>
    </div>
  );
}
