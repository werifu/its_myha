"use client";

import Footer from "./Footer";

interface ResultsProps {
  score: number;
  total: number;
  onReplay: () => void;
  onReturn: () => void;
}

function getResultMessage(score: number, total: number): string {
  if (score === total && score > 4) return '别玩了立希酱';
  if (score >= total * 0.8 && score > 3) return '只有你能找到这里';
  if (score >= total * 0.6) return '哈？';
  if (score >= total * 0.4) return '有传达到真是太好了';
  if (score >= total * 0.2) return '这家伙什么都不懂';
  return '最恶';
}

export default function Results({ score, total, onReplay, onReturn }: ResultsProps) {
  return (
    <div className="text-center" suppressHydrationWarning>
      <h1 className="flex gap-4 justify-center text-2xl mb-4 text-white font-bold text-shadow">
        分数： {score} / {total}
      </h1>
      <div className="text-6xl mb-8 font-bold text-shadow text-amber-400 [text-shadow:_-2px_-2px_0_#fff,_2px_-2px_0_#fff,_-2px_2px_0_#fff,_2px_2px_0_#fff]">
        {getResultMessage(score, total)}
      </div>
      <div className="flex gap-4 justify-center">
        <button
          onClick={onReplay}
          className="text-3xl px-6 py-3 text-white hover:scale-125 transition-transform text-shadow font-bold"
        >
          重玩
        </button>
        <button
          onClick={onReturn}
          className="text-3xl px-6 py-3 text-white hover:scale-125 transition-transform text-shadow font-bold"
        >
          主页
        </button>
      </div>
      <Footer />
    </div>
  );
}
