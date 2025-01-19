"use client";
import { useState } from 'react';
import QuestionCard from '@/components/QuestionCard';
import { allAssets, generateQuestions } from '@/data/questions';
import { GameSettings } from '@/utils/settings';

interface GameProps {
  onEnd: (score: number, questionNum: number) => void;
  settings: GameSettings;
}

export default function Game({ onEnd, settings }: GameProps) {
  const { characters, questionNum } = settings;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);

  const [selectedQuestions] = useState(() => {
    // Only generate questions on the client-side to avoid hydration mismatch
    if (typeof window === 'undefined') {
      return Array(questionNum).fill(null);
    }
    return generateQuestions(allAssets, questionNum, { characters });
  });

  const handleAnswer = async (correct: boolean) => {
    setShowFeedback(true);

    await new Promise(resolve => setTimeout(resolve, 2000));

    if (currentQuestionIndex + 1 < questionNum) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswers([...selectedAnswers, correct ? 1 : 0]);
    } else {
      // Notify the parent component that the game has ended and show results
      onEnd([...selectedAnswers, correct ? 1 : 0].reduce((a, b) => a + b, 0), questionNum);
      setCurrentQuestionIndex(0);
      setSelectedAnswers([]);
    }
    setShowFeedback(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <>
        <div className="mb-8 text-3xl text-white text-shadow font-bold">
          {currentQuestionIndex + 1} / {questionNum}
        </div>
        <QuestionCard
          question={selectedQuestions[currentQuestionIndex]}
          onAnswer={handleAnswer}
          showFeedback={showFeedback}
        />
      </>
    </div>
  );
}
