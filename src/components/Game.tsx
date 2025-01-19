"use client";
import { useState } from 'react';
import QuestionCard from '@/components/QuestionCard';
import { generateQuestions, getAllAssets } from '@/data/questions';

interface GameProps {
  onEnd: (score: number, questionNum: number) => void;
}

export default function Game({ onEnd }: GameProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);

  const questionNum = 4;
  const [selectedQuestions] = useState(() => {
    // Only generate questions on the client-side to avoid hydration mismatch
    if (typeof window === 'undefined') {
      return Array(questionNum).fill(null);
    }
    return generateQuestions(getAllAssets(), questionNum);
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
      <h2 className="mb-4">第{currentQuestionIndex + 1}题</h2>

      <>
        <QuestionCard
          question={selectedQuestions[currentQuestionIndex]}
          onAnswer={handleAnswer}
          questionId={currentQuestionIndex + 1}
          questionNum={questionNum}
          showFeedback={showFeedback}
        />
      </>

    </div>
  );
}
