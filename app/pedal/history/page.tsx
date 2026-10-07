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
  { year: 2017, title: 'Back on our bikes', description: 'A new shirt for another year of Pedal for P-Man.', photos: true },
  { year: 2018, title: 'A year in red', description: 'The 2018 design brought a bright new color to the collection.', photos: true },
  { year: 2019, title: 'Number 85', description: 'A shirt with a nod to Patrick’s birth year, and a reminder to choose health.', photos: true },
  { year: 2020, title: 'One more good day', description: 'A familiar message, carried into another year.' },
  { year: 2021, title: 'Chicago colors', description: 'The 2021 long-sleeve design featured the stars and stripes of the Chicago flag.' },
  { year: 2022, title: 'A different spin', description: 'A wheel-inspired design in green joined the collection.' },
  { year: 2023, title: 'Ride with heart', description: 'A heart on the front. Pedal for P-Man on the back.' },
  { year: 2024, title: 'The ninth ride', description: 'Another shirt, another gathering, and more memories made together.', photos: true },
];

export default function PedalHistoryPage() {
  return (
    <div className="page-shell py-12 md:py-20">
      <Link href="/pedal" className="text-sm font-semibold underline underline-offset-4">← This year’s ride</Link>
      <header className="mt-10 mb-10 max-w-3xl">
        <p className="eyebrow mb-5">Pedal for P-Man · Since 2016</p>
        <h1 className="section-heading">The shirts.<br />The rides. The memories.</h1>
        <p className="mt-6 text-lg leading-relaxed text-slate-600">Every shirt brings back a year. Since our first ride in Patrick’s memory, we’ve gathered on bikes, made new memories, and kept coming back. Here’s the collection, with photos from along the way.</p>
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
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">The tenth annual ride brought us together again. Familiar faces, new friends, and one more day to remember Patrick.</p>
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
