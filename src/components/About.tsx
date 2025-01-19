"use client";

import Link from 'next/link';

export default function About() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl mb-4">关于开发者</h1>
      <p className="text-lg max-w-2xl text-center">
        你好！我是[您的名字]，这个有趣的问答游戏的开发者。我热衷于创建互动且引人入胜的应用程序。这个项目是使用 Next.js、TypeScript 和 Tailwind CSS 构建的。
      </p>
      <div className="mt-6">
        <Link href="/">
          <a className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            返回主页
          </a>
        </Link>
      </div>
    </div>
  );
} 