import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Muhammet Ayberk Arslan',
  description: 'Portfolio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-black text-white">{children}</body>
    </html>
  );
}
