import type { Metadata } from 'next';
import DayStudio from './studio';

export const metadata: Metadata = {
  title: 'One dot. One good day.',
  description: 'Explore the good days behind the P-Man Foundation artwork, one grant at a time.',
  robots: { index: false, follow: false },
};

export default function DayStudioPage() { return <DayStudio />; }
