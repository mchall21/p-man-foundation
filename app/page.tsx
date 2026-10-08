import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { EXTERNAL_LINKS } from '@/lib/constants';
import { ImpactSummary } from '@/components/ui/impact-summary';
import { RideRecap } from '@/components/ui/ride-recap';
import { pedal2025Hero, pedal2025Group } from '@/lib/media-2025';

export default function Home() {
  return (
    <>
      <section className="page-shell grid gap-10 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16 lg:py-20">
        <div>
          <p className="eyebrow mb-7">In Patrick’s memory. For a life in recovery.</p>
          <h1 className="font-playfair text-6xl leading-[1.02] tracking-tight sm:text-7xl lg:text-8xl">One more<br />good day<span className="text-amber-600">.</span></h1>
          <p className="mt-7 max-w-lg text-lg leading-relaxed text-slate-600">A bike ride. A shared meal. A day outside with friends. We fund the small things that help people in recovery build a life full of connection.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/donate" className="button-primary">Help create a good day <ArrowUpRight size={18} /></Link>
            <Link href="/about/patrick" className="button-secondary">Meet Patrick <ArrowRight size={18} /></Link>
          </div>
          <p className="mt-7 text-sm text-slate-600">100% of donations go to grants.</p>
        </div>
        <figure className="relative">
          <div className="relative h-[360px] overflow-hidden rounded-[2rem] sm:h-[490px] lg:h-[580px]">
            <Image src={pedal2025Hero.src} alt={pedal2025Hero.alt} fill priority sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <figcaption className="absolute bottom-7 left-7 text-sm text-white"><span className="block text-xs uppercase tracking-[.2em] text-white/80">Atlanta, Georgia</span><span className="mt-2 block font-medium">A good day together. Pedal for P-Man, 2025.</span></figcaption>
          </div>
        </figure>
      </section>
      <div className="bg-[#e9e5da]">
        <div className="page-shell flex flex-wrap items-center justify-between gap-4 py-6">
          <span className="text-lg"><span className="font-semibold">Let’s ride again.</span> November 14, 2026 · 9:30 AM · Grant Park, Atlanta</span>
          <div className="flex flex-wrap items-center gap-5"><Link href="/pedal" className="font-semibold underline underline-offset-4">Ride details</Link><a href={EXTERNAL_LINKS.eventbrite} className="button-primary">Get tickets <ArrowRight size={19} /></a></div>
        </div>
      </div>
      <section className="page-shell grid items-center gap-8 py-16 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <Image src="/images/patrick-bike.webp" alt="Patrick Hall" width={700} height={525} sizes="(max-width: 768px) 100vw, 40vw" className="h-auto w-full rounded-2xl" />
        <div><p className="eyebrow mb-4">Remembering Patrick</p><h2 className="section-heading">The person behind<br />P-Man.</h2><p className="mt-6 text-lg leading-relaxed text-slate-600">Patrick brought laughter, loyalty, and a love of music, sports, and cycling to the people around him. He described sobriety as stringing together “one more good day” after another. That idea powers everything we do.</p><div className="mt-7 flex flex-wrap gap-5"><Link href="/about/patrick" className="font-semibold underline underline-offset-4">Read Patrick’s story →</Link><Link href="/about/foundation" className="font-semibold underline underline-offset-4">Our foundation &amp; mission →</Link></div></div>
      </section>
      <ImpactSummary />
      <section className="bg-blue-50 py-12"><div className="page-shell max-w-3xl text-center"><h2 className="font-playfair text-3xl">100% of donations go to grants</h2><p className="mt-5 text-lg leading-relaxed text-slate-600">Our annual ride funds itself through ticket sales, so every dollar you donate directly supports sober social activities in our communities.</p><Link href="/grants" className="mt-6 inline-block font-semibold underline underline-offset-4">Explore our grants and apply →</Link></div></section>
      <section className="page-shell grid gap-10 py-20 md:grid-cols-2 md:items-center lg:gap-24">
        <div className="relative h-[360px] overflow-hidden rounded-2xl md:h-[430px]">
          <Image src={pedal2025Group.src} alt={pedal2025Group.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
        </div>
        <div>
          <p className="eyebrow mb-5">Small grants. Real connection.</p>
          <h2 className="section-heading">Recovery needs<br />community.</h2>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">Getting through today is easier when there’s something to look forward to. Our grants help make sober social activities accessible, from outdoor adventures to art, fitness, and simply spending time together.</p>
          <Link href="/impact" className="mt-7 inline-flex items-center gap-3 font-semibold text-blue-700">See what your support makes possible <ArrowRight size={18} /></Link>
          <div className="mt-8 border-t border-slate-200 pt-6"><p className="text-sm text-slate-600">Have an idea for your community?</p><Link href="/grants" className="mt-2 inline-block font-semibold underline underline-offset-4">Explore our grants</Link></div>
        </div>
      </section>
      <section className="page-shell pb-16"><p className="eyebrow mb-4">Our community, through the years</p><h2 className="section-heading mb-8">Familiar faces. More memories.</h2><div className="grid gap-4 md:grid-cols-3">{[1, 2, 3].map(index => <Image key={index} src={`/images/crowd-shots/crowd-shot-${index}.jpg`} alt={`The Pedal for P-Man community gathered at a past event, photograph ${index}`} width={700} height={525} sizes="(max-width: 768px) 100vw, 33vw" className="aspect-[4/3] w-full rounded-xl bg-[#e9e5da] object-contain" />)}</div><Link href="/pedal/history" className="mt-7 inline-block font-semibold underline underline-offset-4">See the shirts, photos, and ride history →</Link></section>
      <section className="bg-[#e9e5da] py-16 md:py-20"><div className="page-shell"><RideRecap /></div></section>
      <section className="page-shell py-20 text-center"><p className="eyebrow mb-5">Keep the good days going</p><h2 className="section-heading">A little support.<br />Something to look forward to.</h2><p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-600">Donate, join the ride, or bring a sober social activity to your community. There’s a place for you here.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><Link href="/donate" className="button-primary">Make a donation <ArrowUpRight size={18} /></Link><Link href="/pedal" className="button-secondary">Join the ride <ArrowRight size={18} /></Link></div></section>
    </>
  );
}
