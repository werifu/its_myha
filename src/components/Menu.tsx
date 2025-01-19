"use client";

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Footer from '@/components/Footer';

interface MenuProps {
  onStart: () => void;
}

export default function Menu({ onStart }: MenuProps) {
  const router = useRouter();

  const navigateToAbout = () => {
    router.push('/about');
  };

  return (
    <>
      <Image src="/its_myha.png" alt="问答游戏" width={400} height={200} className="mb-0 drop-shadow-md" />
      <button
        onClick={onStart}
        className="text-3xl px-6 py-3 text-white hover:scale-125 transition-transform text-shadow font-bold"
      >
        开始游戏
      </button>

      <div className="mt-4">
        <button
          onClick={() => router.push('/settings')}
          className="text-3xl px-6 py-3 text-white hover:scale-125 transition-transform text-shadow font-bold"
        >
          游戏设定
        </button>
      </div>
      <div className="mt-4">
        <button
          onClick={navigateToAbout}
          className="text-3xl px-6 py-3 text-white hover:scale-125 transition-transform text-shadow font-bold"
        >
          关于
        </button>
      </div>
      <Footer />
    </>
  );
} 