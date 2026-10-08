'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ArrowUpRight, Bike } from 'lucide-react';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/about/patrick', label: 'Our story' },
  { href: '/about/foundation', label: 'Our mission' },
  { href: '/impact', label: 'Our impact' },
  { href: '/grants', label: 'Grants' },
  { href: '/pedal', label: 'The ride' },
  { href: '/pedal/history', label: 'Ride history' },
  { href: '/contact', label: 'Contact' },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  return (
    <header className="sticky top-0 z-50 border-b border-[#e4e6df] bg-[#f8f7f2]/95 backdrop-blur-sm">
      <nav className="page-shell" aria-label="Main navigation">
        <div className="flex h-20 items-center justify-between gap-6">
          <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-3" aria-label="P-Man Foundation home"><Bike size={32} strokeWidth={1.5} /><span className="leading-none"><span className="block text-xl font-extrabold tracking-[.06em]">P–MAN</span><span className="mt-1.5 block text-[9px] font-semibold tracking-[.22em]">FOUNDATION</span></span></Link>
          <div className="hidden items-center gap-4 xl:gap-6 lg:flex">{links.map(link => <Link key={link.href} href={link.href} aria-current={path === link.href ? 'page' : undefined} className={`text-sm transition-colors hover:text-blue-500 ${path === link.href ? 'font-bold underline underline-offset-8' : 'font-medium'}`}>{link.label}</Link>)}<Link href="/donate" className="button-primary">Donate <ArrowUpRight size={16} /></Link></div>
          <button type="button" className="flex h-11 w-11 items-center justify-center lg:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'Close main menu' : 'Open main menu'}>{open ? <X /> : <Menu />}</button>
        </div>
        {open && <div id="mobile-navigation" className="space-y-1 border-t border-slate-200 pb-6 pt-3 lg:hidden">{links.map(link => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="block rounded px-3 py-3 font-medium hover:bg-blue-50">{link.label}</Link>)}<Link href="/donate" className="button-primary mt-3 w-full" onClick={() => setOpen(false)}>Donate <ArrowUpRight size={16} /></Link></div>}
      </nav>
    </header>
  );
}
