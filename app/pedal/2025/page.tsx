import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { pedal2025Photos } from '@/lib/media-2025';
import { RideRecap } from '@/components/ui/ride-recap';

export const metadata: Metadata = { title: 'The 2025 Ride — Photos & Film', description: 'Photos and the recap film from the 10th annual Pedal for P-Man ride.' };

export default function Ride2025Page() {
  return <div className="page-shell py-14 md:py-20"><Link href="/pedal/history" className="mb-8 inline-block text-sm font-semibold underline underline-offset-4">← Ride history &amp; photos from past years</Link><p className="eyebrow mb-5">The 10th annual Pedal for P-Man</p><h1 className="section-heading">A look back at 2025.</h1><p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">Bikes, familiar faces, new friends, and a reason to get together. Thank you to everyone who rode, walked, volunteered, and helped keep Patrick’s memory moving forward.</p><div className="my-10 flex flex-wrap gap-3"><Link href="/pedal" className="button-primary">Join us in 2026 <ArrowUpRight size={18} /></Link></div><div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">{pedal2025Photos.map((photo, i) => <a key={photo.src} href={photo.src} target="_blank" rel="noopener noreferrer" className={`group relative block overflow-hidden rounded-xl ${i === 0 ? 'sm:col-span-2 lg:col-span-2' : ''}`} aria-label={`View photo: ${photo.alt}`}><Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes={i === 0 ? '(max-width: 640px) 100vw, 66vw' : '(max-width: 640px) 100vw, 33vw'} className="h-80 w-full object-cover transition-transform duration-300 group-hover:scale-[1.025]" /></a>)}</div><div className="mt-20"><RideRecap /></div></div>;
}
