"use client";

interface ResultsProps {
  score: number;
  total: number;
  onReplay: () => void;
}

export default function Results({ score, total, onReplay }: ResultsProps) {
  return (
    <div className="text-center">
      <h2 className="text-2xl mb-4">
        分数: {score} / {total}
      </h2>
      <button
        onClick={onReplay}
        className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        重玩
      </button>
    </div>
  );
}
