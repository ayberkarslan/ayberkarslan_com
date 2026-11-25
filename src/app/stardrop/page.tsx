import type { Metadata } from 'next';
import localFont from 'next/font/local';

const michroma = localFont({
  src: './fonts/Michroma-Regular.ttf',
  weight: '400',
  style: 'normal',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'STARDROP — Çok yakında',
  description: 'STARDROP. Çok yakında.',
  alternates: { canonical: 'https://ayberkarslan.com/stardrop' },
};

export default function StardropPage() {
  return (
    <main lang="tr" className={`${michroma.className} flex min-h-svh flex-col items-center justify-center gap-6 bg-black px-6 text-center text-white`}>
      <h1 className="text-[clamp(1.75rem,7vw,5rem)] font-normal tracking-[0.08em]">STARDROP</h1>
      <p className="text-sm text-white/50 sm:text-base">çok yakında</p>
    </main>
  );
}
