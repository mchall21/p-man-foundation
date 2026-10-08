import { RideHistoryFeature } from '@/components/ui/ride-history-feature';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CalendarDays, MapPin } from 'lucide-react';
import { RideRecap } from '@/components/ui/ride-recap';
import { pedal2025Hero } from '@/lib/media-2025';
import { EXTERNAL_LINKS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Pedal for P-Man 2026',
  description: 'The 11th annual Pedal for P-Man ride. November 14, 2026, at Grant Park in Atlanta. Remember Patrick, ride together, and support more good days.',
};

export default function PedalPage() {
  return (
    <>
      <nav aria-label="Ride navigation" className="page-shell flex flex-wrap gap-x-6 gap-y-3 pt-6 text-sm font-semibold"><span aria-current="page">2026 ride</span><Link href="/pedal/history" className="underline underline-offset-4">Ride history &amp; past photos</Link><Link href="/pedal/2025" className="underline underline-offset-4">2025 photos &amp; film</Link></nav>
      <section className="page-shell grid items-center gap-10 py-14 lg:grid-cols-2 lg:gap-20 lg:py-20">
        <div><p className="eyebrow mb-5">The 11th annual ride · 2026</p><h1 className="section-heading text-6xl sm:text-7xl">Pedal for<br />P-Man.</h1><p className="mt-6 text-lg leading-relaxed text-slate-600">Join us for bike rides, good food, games, and good company as we remember Patrick and celebrate one more good day together.</p><div className="my-8 space-y-4 border-y border-slate-200 py-6"><p className="flex items-center gap-3 text-xl font-semibold"><CalendarDays size={22} /> November 14, 2026 · 9:30 AM</p><p className="flex items-center gap-3"><MapPin size={22} /> Grant Park Pavilions 1 & 2 · Atlanta</p></div><a href={EXTERNAL_LINKS.eventbrite} className="button-primary">Get tickets on Eventbrite <ArrowRight size={18} /></a><p className="mt-4 text-sm text-slate-600">Bring your bike, bring the kids, bring a friend, or just bring yourself.</p></div>
        <div className="relative h-[380px] overflow-hidden rounded-[2rem] sm:h-[520px]"><Image src={pedal2025Hero.src} alt={pedal2025Hero.alt} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" /></div>
      </section>
      <section className="page-shell py-10 md:py-16">
        <div className="max-w-3xl"><h2 className="section-heading">Come for the ride.<br />Stay for the company.</h2><p className="mt-6 text-lg leading-relaxed text-slate-600">Every year, we gather to remember Patrick through some of his favorite things: getting outside, riding bikes, and spending time with people he loved. This year, we’re keeping that spirit front and center with good food, fun and games, and plenty of time to catch up with old friends and meet new ones.</p><p className="mt-4 text-lg leading-relaxed text-slate-600">Ride with us, take a walk, or hang out at the pavilion. There’s more than one way to have one more good day.</p></div>
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div><h2 className="font-playfair text-3xl mb-6">The day’s lineup</h2><p className="text-sm text-slate-600 mb-4">Saturday, November 14 · All times Eastern</p><ol className="divide-y divide-slate-200 border-y border-slate-200">{[
            { time: '9:30 AM', title: 'Welcome & gather', description: 'Arrive, settle in, and say hello.' },
            { time: '10:00 AM', title: 'Speakers & grantee panel', description: 'Hear from the people and organizations putting P-Man grants to work and creating opportunities for connection in recovery.' },
            { time: '10:30 AM', title: 'Kids’ ride', description: 'Bikes and scooters welcome for a ride within the park.' },
            { time: '11:00 AM', title: 'Adult ride', description: 'Head out together for a ride through Grant Park and the surrounding area.' },
            { time: '12:00 PM', title: 'Lunch & socialize', description: 'Gather back at the pavilion for good food, games, and an afternoon with friends.' },
          ].map(item => <li key={item.time} className="grid gap-2 py-5 sm:grid-cols-[100px_1fr] sm:gap-5"><p className="font-semibold text-blue-700">{item.time}</p><div><h3 className="font-semibold">{item.title}</h3><p className="mt-1 leading-relaxed text-slate-600">{item.description}</p></div></li>)}</ol></div>
          <div className="self-start rounded-2xl bg-[#e9e5da] p-7 md:p-9"><h2 className="font-playfair text-3xl">Where to find us</h2><p className="mt-5 leading-relaxed text-slate-600">Meet at <strong>Grant Park Pavilions 1 &amp; 2</strong>. Parking options include the paid Grant Park Gateway parking deck and street parking near <strong>Berne Street SE and Park Avenue SE</strong>.</p><h3 className="mt-8 font-playfair text-2xl">Why we ride</h3><p className="mt-4 leading-relaxed text-slate-600">Patrick described sobriety as stringing together “one more good day” after another. The P-Man Foundation carries that idea forward by funding sober social activities that help people in recovery find community, purpose, and joy.</p><Link href="/about/foundation" className="mt-5 inline-block font-semibold underline underline-offset-4">Learn about our mission →</Link><a href={EXTERNAL_LINKS.eventbrite} className="button-primary mt-7">Get tickets on Eventbrite <ArrowRight size={18} /></a></div>
        </div>
      </section>
      <div className="page-shell"><RideHistoryFeature /></div>
      <section className="bg-[#e9e5da] py-16"><div className="page-shell"><RideRecap /></div></section>
      <section className="page-shell grid gap-10 py-20 md:grid-cols-2"><div><h2 className="section-heading">A tradition worth<br />keeping.</h2><p className="mt-6 text-lg leading-relaxed text-slate-600">Since 2016, friends and family have come together on bikes to honor Patrick’s memory. Every year adds new faces and new memories.</p><Link href="/pedal/history" className="mt-6 inline-flex items-center gap-3 font-semibold underline underline-offset-4">Explore the ride’s history <ArrowRight size={18} /></Link></div><div className="rounded-2xl bg-blue-700 p-8 text-white md:p-10"><h2 className="font-playfair text-3xl">Can’t join the ride?</h2><p className="mt-5 leading-relaxed text-white/80">You can still help make sober social activities possible. Every donation goes to grants, while ride tickets support the event.</p><Link href="/donate" className="mt-8 inline-flex items-center gap-3 rounded-md bg-white px-6 py-3 font-semibold text-blue-700">Support a good day <ArrowRight size={18} /></Link></div></section>
    </>
  );
}
