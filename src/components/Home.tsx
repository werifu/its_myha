"use client";
import { useState, useEffect } from 'react';
import Game from '@/components/Game';
import Results from '@/components/Results';
import Menu from '@/components/Menu';
import { GameSettings, defaultSettings } from '@/utils/settings';
import { getSettings } from '@/utils/settings';

export default function Home() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [showResults, setShowResults] = useState<{ score: number, questionNum: number } | null>(null);
  const [settings, setSettings] = useState<GameSettings>(defaultSettings);

  useEffect(() => {
    const currentSettings = getSettings();
    setSettings(currentSettings);
  }, []);

  const startGame = () => {
    setIsGameStarted(true);
    setShowResults(null);
  };

  const endGame = (score: number, questionNum: number) => {
    setShowResults({ score, questionNum });
    setIsGameStarted(false);
  };

  const returnMenu = () => {
    setIsGameStarted(false);
    setShowResults(null);
  }
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        {isGameStarted ? (
          <Game
            onEnd={endGame}
            settings={settings}
          />
        ) : showResults ? (
          <Results
            score={showResults.score}
            total={showResults.questionNum}
            onReplay={startGame}
            onReturn={returnMenu}
          />
        ) : (
          <Menu onStart={startGame} />
        )}
      </div>
    </>
  );
}
