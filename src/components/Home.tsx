"use client";
import { useState } from 'react';
import Game from '@/components/Game';
import Results from '@/components/Results';
import Main from '@/components/Main';

export default function Home() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [showResults, setShowResults] = useState<{ score: number, questionNum: number } | null>(null);
  const startGame = () => {
    setIsGameStarted(true);
    setShowResults(null);
  };

  const endGame = (score: number, questionNum: number) => {
    setShowResults({ score, questionNum });
    setIsGameStarted(false);
  }; 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {isGameStarted ? (
        <Game onEnd={endGame} />
      ) : showResults ? (<Results score={showResults.score} total={showResults.questionNum} onReplay={startGame}></Results>) : (
        <Main onStart={startGame} />
      )}
    </div>
  );
}
