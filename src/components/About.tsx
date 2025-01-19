"use client";

import { useRouter } from 'next/navigation';
import Footer from './Footer';
import Image from 'next/image';

export default function About() {
  const router = useRouter();

  const handleReturn = () => {
    router.push('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <Image src="/its_myha.png" alt="its_myha" width={400} height={200} className="mb-5" />
      <a href="https://www.bilibili.com/video/BV1DBcie2Er9" target="_blank" rel="noopener noreferrer" className="text-lg text-white text-shadow font-bold mb-5">
        灵感来自【Radio企划】MyGO!!!!!の「迷子集会」#109
      </a>
      <Image src="/lack_ha.jpg" alt="lack_ha" width={400} height={200} className="mb-5" />
      <ul className="text-lg max-w-2xl text-white text-shadow list-none">
        <li>- 本游戏是 BanG Dream 粉丝创作的同人作品，与官方无任何联系。</li>
        <li>- This game is a fan-made work of BanG Dream Project and has no official affiliation with Bushiroad.</li>
        <li>- このゲームは BanG Dream のファンによる同人作品であり、公式とは一切関係ありません。</li>
      </ul>
      <p className="text-lg max-w-2xl text-center text-white text-shadow">
        by Werifu
      </p>
      <div className="flex justify-center">
        <button
          onClick={handleReturn}
          className="text-3xl px-6 py-3 text-white hover:scale-125 transition-transform text-shadow font-bold"
        >
          返回主页
        </button>
      </div>
      <Footer />
    </div>
  );
} 
