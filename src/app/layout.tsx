"use client"

import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          background: `repeating-linear-gradient(
            20deg,
            #77BBDD,
            #77BBDD 40px,
            #88CCEE 40px,
            #88CCEE 80px
          )`
        }}
      >
        <div className="p-4">
          {/* LanguageSelector removed */}
        </div>
        {children}
      </body>
    </html>
  );
}

export default RootLayout;
