"use client";

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '@/components/LanguageSelector';
import { useEffect } from 'react';

interface MenuProps {
  onStart: () => void;
}

export default function Menu({ onStart }: MenuProps) {
  const router = useRouter();
  const { t, i18n } = useTranslation();

  const navigateToAbout = () => {
    router.push('/about');
  };

  const navigateToGallery = () => {
    router.push('/gallery');
  };

  useEffect(() => {
    const handleLanguageChange = () => {
      // Language has changed, you can perform any necessary updates here
      console.log('Language changed to:', i18n.language);
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  return (
    <>
      <Image src="/its_myha.png" alt={t('game_title')} width={400} height={200} className="mb-0 drop-shadow-md" />
      <button
        onClick={onStart}
        className="text-3xl px-6 py-3 text-white hover:scale-125 transition-transform text-shadow font-bold"
        suppressHydrationWarning
      >
        {t('start_game')}
      </button>

      <div className="mt-4">
        <button
          onClick={() => router.push('/settings')}
          className="text-3xl px-6 py-3 text-white hover:scale-125 transition-transform text-shadow font-bold"
          suppressHydrationWarning
        >
          {t('game_settings')}
        </button>
      </div>
      <div className="mt-4">
        <button
          onClick={navigateToAbout}
          className="text-3xl px-6 py-3 text-white hover:scale-125 transition-transform text-shadow font-bold"
          suppressHydrationWarning
        >
          {t('about')}
        </button>
      </div>
      <div className="mt-4">
        <button
          onClick={navigateToGallery}
          className="text-3xl px-6 py-3 text-white hover:scale-125 transition-transform text-shadow font-bold"
          suppressHydrationWarning
        >
          {t('gallery')}
        </button>
      </div>
      <div className='mb-4'></div>
      <LanguageSelector />
      <Footer />
    </>
  );
}