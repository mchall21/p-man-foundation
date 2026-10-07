import Link from 'next/link';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Support the Ride', description: 'Support Pedal for P-Man and help fund more good days.' };
export default function PledgePage() {
  return <div className="page-shell max-w-3xl py-20"><p className="eyebrow mb-5">Support from anywhere</p><h1 className="section-heading">You don’t need a bike<br />to make a difference.</h1><p className="mt-7 text-lg leading-relaxed text-slate-600">Per-mile pledges are not currently available. You can support the foundation with a donation today, or get in touch about helping with the ride.</p><div className="mt-8 flex flex-wrap gap-3"><Link href="/donate" className="button-primary">Make a donation</Link><Link href="/contact" className="button-secondary">Get in touch</Link></div><Link href="/pedal" className="mt-10 inline-block underline underline-offset-4">See the 2026 ride details →</Link></div>;
}
