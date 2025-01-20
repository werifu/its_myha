"use client";

import { allAssets } from '@/data/questions';
import Image from 'next/image';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';

export function Gallery() {
  const router = useRouter();
  const { t } = useTranslation();
  const audioRefs = useRef<Record<number, HTMLAudioElement | null>>({});

  const handleImageClick = (index: number) => {
    const audio = audioRefs.current[index];
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(err => {
        console.debug('Audio playback failed:', err);
      });
    }
  };

  const flattenAssets = allAssets.flat();

  return (
    <div className="flex min-h-screen">
      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl mb-4 text-white font-bold text-shadow">{t('gallery')}</h1>
        <p className="text-xl mb-8 text-white text-center text-shadow">
          {t('click_to_play_sound')}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {flattenAssets.map((asset, index) => (
            <div key={index} className="relative">
              <button onClick={() => handleImageClick(index)} className="focus:outline-none">
                <Image
                  src={asset.image}
                  alt={`Asset ${index + 1}`}
                  width={300}
                  height={300}
                  className="rounded-lg shadow-lg hover:scale-105 transition-transform"
                />
              </button>
              <audio
                ref={(el) => { audioRefs.current[index] = el; }}
                src={asset.audio}
              />
            </div>
          ))}
        </div>
        <button
          onClick={() => router.push('/')}
          className="mt-8 text-2xl px-6 py-3 text-white hover:scale-110 transition-transform text-shadow font-bold"
        >
          {t('return_menu')}
        </button>
      </div>

      {/* Fixed vertical menu */}
      <div className="fixed right-0 top-0 h-full flex items-center">
        <div className="p-0 rounded-l-lg">
          <button
            onClick={() => router.push('/')}
            className="writing-vertical-rl text-2xl px-2 py-3 text-white hover:scale-110 transition-transform text-shadow font-bold"
          >
            {t('return_menu')}
          </button>
        </div>
      </div>
    </div>
  );
} 