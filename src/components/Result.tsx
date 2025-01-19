"use client";

import { useRouter } from 'next/navigation';

interface ResultProps {
  score: number;
  total: number;
}

export default function Result({ score, total }: ResultProps) {
  const router = useRouter();

  const handleRestart = () => {
    router.push('/');
  };

  const accuracyRate = total > 0 ? ((score / total) * 100).toFixed(2) : '0.00';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl mb-4">游戏结果</h1>
      <p className="text-xl mb-2">您的分数: {score} / {total}</p>
      <p className="text-xl mb-6">准确率: {accuracyRate}%</p>
      <button
        onClick={handleRestart}
        className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        重新开始游戏
      </button>
    </div>
  );
} 