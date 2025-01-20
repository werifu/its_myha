"use client";

import Footer from "./Footer";
import { useTranslation } from "react-i18next";

interface ResultsProps {
  score: number;
  total: number;
  onReplay: () => void;
  onReturn: () => void;
}

function getResultMessage(score: number, total: number, t: (key: string) => string): string {
  if (score === total && score > 4) return t('results.perfect');
  if (score >= total * 0.8 && score > 3) return t('results.excellent');
  if (score >= total * 0.6) return t('results.good');
  if (score >= total * 0.4) return t('results.okay');
  if (score >= total * 0.2) return t('results.poor');
  return t('results.miss');
}

export default function Results({ score, total, onReplay, onReturn }: ResultsProps) {
  const { t } = useTranslation();

  return (
    <div className="text-center" suppressHydrationWarning>
      <h1 className="flex gap-4 justify-center text-2xl mb-4 text-white font-bold text-shadow">
        {t('results.score')}: {score} / {total}
      </h1>
      <div className="text-6xl mb-8 font-bold text-shadow text-amber-400 [text-shadow:_-1.5px_-1.5px_0_#fff,_1.5px_-1.5px_0_#fff,_-1.5px_1.5px_0_#fff,_1.5px_1.5px_0_#fff,_-2.5px_-2.5px_2px_rgba(255,255,255,0.5),_2.5px_-2.5px_2px_rgba(255,255,255,0.5),_-2.5px_2.5px_2px_rgba(255,255,255,0.5),_2.5px_2.5px_2px_rgba(255,255,255,0.5)]">
        {getResultMessage(score, total, t)}
      </div>
      <div className="flex gap-4 justify-center">
        <button
          onClick={onReplay}
          className="text-3xl px-6 py-3 text-white hover:scale-125 transition-transform text-shadow font-bold"
        >
          {t('results.replay')}
        </button>
        <button
          onClick={onReturn}
          className="text-3xl px-6 py-3 text-white hover:scale-125 transition-transform text-shadow font-bold"
        >
          {t('results.menu')}
        </button>
      </div>
      <Footer />
    </div>
  );
}
