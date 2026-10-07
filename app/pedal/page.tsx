import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CalendarDays, MapPin } from 'lucide-react';
import { RideRecap } from '@/components/ui/ride-recap';
import { pedal2025Hero } from '@/lib/media-2025';

export const metadata: Metadata = {
  title: 'Pedal for P-Man 2026',
  description: 'The 11th annual Pedal for P-Man ride. November 14, 2026, at Grant Park in Atlanta. Remember Patrick, ride together, and support more good days.',
};

export default function PedalPage() {
  return (
    <>
      <section className="page-shell grid items-center gap-10 py-14 lg:grid-cols-2 lg:gap-20 lg:py-20">
        <div><p className="eyebrow mb-5">The 11th annual ride · 2026</p><h1 className="section-heading text-6xl sm:text-7xl">Pedal for<br />P-Man.</h1><p className="mt-6 text-lg leading-relaxed text-slate-600">A day to remember Patrick, ride with friends, and help create more good days for people in recovery.</p><div className="my-8 space-y-4 border-y border-slate-200 py-6"><p className="flex items-center gap-3 text-xl font-semibold"><CalendarDays size={22} /> November 14, 2026</p><p className="flex items-center gap-3"><MapPin size={22} /> Grant Park · Atlanta, Georgia</p></div><Link href="/contact" className="button-primary">Ask about the 2026 ride <ArrowRight size={18} /></Link><p className="mt-4 text-sm text-slate-600">Registration details will be shared here when confirmed.</p></div>
        <div className="relative h-[380px] overflow-hidden rounded-[2rem] sm:h-[520px]"><Image src={pedal2025Hero.src} alt={pedal2025Hero.alt} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" /></div>
      </section>
      <section className="bg-[#e9e5da] py-16"><div className="page-shell"><RideRecap /></div></section>
      <section className="page-shell grid gap-10 py-20 md:grid-cols-2"><div><p className="eyebrow mb-4">Ten rides. One community.</p><h2 className="section-heading">A tradition worth<br />keeping.</h2><p className="mt-6 text-lg leading-relaxed text-slate-600">Since 2016, friends and family have come together on bikes to honor Patrick’s memory. Every year adds new faces and new memories.</p><Link href="/pedal/history" className="mt-6 inline-flex items-center gap-3 font-semibold underline underline-offset-4">Explore the ride’s history <ArrowRight size={18} /></Link></div><div className="rounded-2xl bg-blue-700 p-8 text-white md:p-10"><h2 className="font-playfair text-3xl">Can’t join the ride?</h2><p className="mt-5 leading-relaxed text-white/80">You can still help make sober social activities possible. Every donation goes to grants, while ride tickets support the event.</p><Link href="/donate" className="mt-8 inline-flex items-center gap-3 rounded-md bg-white px-6 py-3 font-semibold text-blue-700">Support a good day <ArrowRight size={18} /></Link></div></section>
    </>
  );
}
