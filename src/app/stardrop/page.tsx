import type { Metadata } from 'next';
import Link from 'next/link';
import { Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Stardrop — Yakında',
  description: 'Stardrop hazırlanıyor. Çok yakında burada.',
  alternates: { canonical: 'https://ayberkarslan.com/stardrop' },
};

export default function StardropPage() {
  return (
    <main lang="tr" className="relative isolate flex min-h-svh flex-col overflow-hidden bg-black px-6 text-white selection:bg-[#0bde0e] selection:text-black">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 opacity-15" />
        <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0bde0e]/10 blur-[100px]" />
      </div>

      <header className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 py-7 sm:py-10">
        <Link href="/" className="rounded-sm text-sm text-white/60 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#0bde0e]">
          ayberkarslan.com
        </Link>
        <span className="font-mono text-sm tracking-widest text-[#0bde0e]">STARDROP</span>
      </header>

      <section aria-labelledby="stardrop-title" className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center py-20 text-center">
        <div className="mb-10 flex h-20 w-20 items-center justify-center rounded-3xl border border-[#0bde0e]/25 bg-[#0bde0e]/5 shadow-[0_0_70px_rgba(11,222,14,0.08)]">
          <Star aria-hidden="true" className="h-9 w-9 text-[#0bde0e]" strokeWidth={1.5} />
        </div>
        <p className="mb-5 font-mono text-sm uppercase tracking-[0.25em] text-[#0bde0e]">Yeni bir şey hazırlanıyor</p>
        <h1 id="stardrop-title" className="text-6xl font-semibold tracking-tight sm:text-8xl">Stardrop<span className="text-[#0bde0e]">.</span></h1>
        <p className="mt-8 text-2xl font-medium tracking-tight sm:text-3xl">Çok yakında burada.</p>
        <p className="mt-4 max-w-sm text-base leading-7 text-white/55">Hazırlıklar devam ediyor. Gelişmeler için bu sayfayı tekrar ziyaret edebilirsin.</p>
        <Link href="/" className="mt-10 inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 text-sm font-medium text-white/80 transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0bde0e]">
          Ana sayfaya dön
        </Link>
      </section>

      <footer className="mx-auto w-full max-w-5xl border-t border-white/10 py-6 text-center text-sm text-white/40 sm:text-left">
        Muhammet Ayberk Arslan
      </footer>
    </main>
  );
}
