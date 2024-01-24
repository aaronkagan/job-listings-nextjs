import type { Metadata } from 'next';
import { League_Spartan } from 'next/font/google';
import './globals.css';

const league_spartan = League_Spartan({
  weight: ['500', '700'],
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'Job Listings',
  description: 'A full stack job listings app created with NextJS and supabase'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={league_spartan.className}>{children}</body>
    </html>
  );
}
