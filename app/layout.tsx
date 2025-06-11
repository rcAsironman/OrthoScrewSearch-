import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import AppInitializer from './AppInitializer'; // use the wrapper

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'OrthoScrewSearch',
  description: 'An image recognition system framework webapp',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AppInitializer>{children}</AppInitializer>
      </body>
    </html>
  );
}
