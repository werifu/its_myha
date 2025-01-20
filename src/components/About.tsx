"use client";

import { useRouter } from 'next/navigation';
import Footer from './Footer';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

export default function About() {
  const router = useRouter();
  const { t } = useTranslation();

  const handleReturn = () => {
    router.push('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <Image src="/its_myha.png" alt="its_myha" width={400} height={200} className="mb-5" />
      <p className="text-lg text-white text-shadow font-bold mb-5">
        {t('game_instruction')}
      </p>
      <a
        href={t('mygo_center_109')}
        target="_blank"
        rel="noopener noreferrer"
        className="text-lg text-white text-shadow font-bold mb-5 hover:scale-110 transition-transform underline"
      >
        {t('inspiration')}
      </a>
      <Image src={t('lack_ha_img')} alt="lack_ha" width={400} height={200} className="mb-5" />
      <ul className="text-lg text-white text-shadow font-bold mb-5">
        <li>{t('disclaimer')}</li>
      </ul>
      <p className="text-lg text-white text-shadow font-bold mb-5">
        by Werifu
      </p>
      <div className="flex justify-center">
        <button
          onClick={handleReturn}
          className="text-3xl px-6 py-3 text-white hover:scale-125 transition-transform text-shadow font-bold"
        >
          {t('return_menu')}
        </button>
      </div>
      <Footer />
    </div>
  );
} 
