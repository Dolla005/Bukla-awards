import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/components/Providers';

export const metadata: Metadata = {
  title: 'Bukla Awards 2026 - Kenya\'s Biggest Nightlife Awards',
  description: 'Recognizing excellence in Kenya\'s nightlife industry. Celebrating the best Clubs, DJs, MCs, Hosts, Hostesses, Influencers and everyone who makes the nightlife unforgettable.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
