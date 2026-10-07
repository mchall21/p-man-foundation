'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Play, ArrowUpRight } from 'lucide-react';
import { pedal2025Group, pedal2025Video } from '@/lib/media-2025';


export function RideRecap() {
  const [playing, setPlaying] = useState(false);
  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-6"><div><p className="eyebrow mb-4">Pedal for P-Man · 2025</p><h2 className="section-heading">One ride. So many good days.</h2></div><Link href="/pedal/2025" className="inline-flex items-center gap-2 font-semibold underline underline-offset-4">Explore the photos <ArrowUpRight size={18} /></Link></div>
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-slate-900">
        {playing ? <video src={pedal2025Video.src} poster={pedal2025Video.poster} aria-label="2025 Pedal for P-Man recap video" controls autoPlay playsInline preload="metadata" className="h-full w-full" /> : <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0 w-full text-white" aria-label="Load the 2025 Pedal for P-Man recap video"><Image src={pedal2025Group.src} alt="" fill sizes="(max-width: 1280px) 100vw, 1200px" className="object-cover" /><span className="absolute inset-0 bg-black/35 transition-colors group-hover:bg-black/45" /><span className="absolute inset-0 flex flex-col items-center justify-center gap-4"><span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-blue-700 md:h-20 md:w-20"><Play size={28} fill="currentColor" /></span><span className="text-lg font-semibold md:text-2xl">Watch the 2025 film</span></span></button>}
      </div>
      <p className="mt-4 text-sm text-slate-600">A look back at the 10th annual ride — and the people who made it possible.</p>
    </div>
  );
}
