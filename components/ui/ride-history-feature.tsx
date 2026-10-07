import Image from 'next/image';
import Link from 'next/link';

export function RideHistoryFeature() {
  return (
    <section className="my-12 grid items-center gap-8 rounded-2xl bg-[#e9e5da] p-6 md:grid-cols-2 md:p-10">
      <Image src="/images/pedal-history/tshirts/2019_Shirt.png" alt="The 2019 Pedal for P-Man shirt, front and back, with number 85" width={700} height={350} sizes="(max-width: 768px) 100vw, 600px" className="h-auto w-full" />
      <div><p className="eyebrow mb-4">The ride through the years</p><h2 className="font-playfair text-3xl md:text-4xl">Every shirt has a memory.</h2><p className="my-5 leading-relaxed text-slate-600">Revisit the shirts, faces, and moments from Pedal for P-Man, beginning with the first ride in 2016.</p><Link href="/pedal/history" className="button-primary">See the shirts &amp; past photos →</Link></div>
    </section>
  );
}
