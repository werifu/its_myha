"use client"

import React, { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
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
  useEffect(() => {
    if (typeof window !== 'undefined') { // Ensure this runs only on the client
      const savedLanguage = localStorage.getItem('language');
      if (savedLanguage && i18n.language !== savedLanguage) {
        i18n.changeLanguage(savedLanguage);
      }
    }
  }, []);

  return (
    <html lang={i18n.language} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased 'h-[100dvh]'`}
        style={{
          background: `repeating-linear-gradient(
            20deg,
            #77BBDD,
            #77BBDD 40px,
            #88CCEE 40px,
            #88CCEE 80px
          )`,
        }}
        suppressHydrationWarning
      >
        <I18nextProvider i18n={i18n}>
          {children}
        </I18nextProvider>
      </body>
    </html>
  );
}

export default RootLayout;
