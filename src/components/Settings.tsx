'use client';

import { useState, useEffect } from 'react';
import { GameSettings, defaultSettings, getSettings, saveSettings } from '@/utils/settings';
import { useRouter } from 'next/navigation';
import { Character } from '@/data/questions';
import { assets } from '@/data/assets';
import CharacterCheckbox from './CharacterCheckbox';
import { useTranslation } from 'react-i18next';

export default function Settings() {
  const router = useRouter();
  const { t } = useTranslation();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [questionNum, setQuestionNum] = useState<number>(defaultSettings.questionNum);
  const [maxQuestions, setMaxQuestions] = useState<number>(0);

  useEffect(() => {
    const calculateMax = () => {
      if (characters.length === 0) return 0;
      return characters.reduce((total, char) => total + (assets[char]?.length || 0), 0);
    };

    const newMax = calculateMax();
    setMaxQuestions(newMax);

    if (questionNum > newMax) {
      setQuestionNum(newMax);
    }
  }, [characters, questionNum]);

  useEffect(() => {
    const currentSettings = getSettings();
    setCharacters(currentSettings.characters);
    setQuestionNum(currentSettings.questionNum);
  }, []);

  const handleCharacterChange = (character: Character) => {
    setCharacters(prev =>
      prev.includes(character)
        ? prev.filter(c => c !== character)
        : [...prev, character]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const settings: GameSettings = {
      characters: characters.length > 0 ? characters : defaultSettings.characters,
      questionNum: questionNum > 0 ? questionNum : defaultSettings.questionNum,
    };
    saveSettings(settings);
    router.push('/');
  };

  const handleDefault = () => {
    setCharacters(defaultSettings.characters);
    setQuestionNum(defaultSettings.questionNum);
  };

  // List of available characters
  const availableCharacters: Character[] = ['taki', 'anon']; // Add more characters here as needed

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8" suppressHydrationWarning>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-10">
          <h2 className="text-xl mb-10 text-white text-shadow font-bold">{t('characters')}</h2>
          <div className="flex gap-8 justify-center">
            {availableCharacters.map(character => (
              <CharacterCheckbox
                key={character}
                character={character}
                isSelected={characters.includes(character)}
                onChange={handleCharacterChange}
              />
            ))}
          </div>
        </div>
        <div className="mb-10">
          <label className="block text-xl mb-6 text-white text-shadow font-bold">
            {t('number_of_questions')}: {questionNum}
          </label>
          <div className="flex items-center gap-2">
            <span className="text-sm text-white/80 text-shadow">1</span>
            <input
              type="range"
              min={1}
              max={maxQuestions}
              value={questionNum}
              onChange={e => setQuestionNum(Number(e.target.value))}
              className="w-full h-8 bg-gray-200 rounded-lg appearance-none cursor-pointer 
                [&::-webkit-slider-thumb]:h-12
                [&::-webkit-slider-thumb]:w-8
                [&::-webkit-slider-thumb]:appearance-none 
                [&::-webkit-slider-thumb]:bg-[#3388BB] 
                [&::-webkit-slider-thumb]:rounded-md 
                [&::-webkit-slider-thumb]:border 
                [&::-webkit-slider-thumb]:border-gray-300 
                [&::-webkit-slider-thumb]:shadow
                [&::-webkit-slider-thumb]:rounded-md
                [&::-webkit-slider-thumb]:outline
                [&::-webkit-slider-thumb]:outline-white
                [&::-webkit-slider-thumb]:outline-2
                "
            />
            <span className="text-sm text-white/80 text-shadow">{maxQuestions}</span>
          </div>
        </div>
        <div className="flex gap-4 justify-center">
          <button
            type="button"
            onClick={handleDefault}
            className="text-3xl px-6 py-3 text-white 
              hover:scale-125 
              transition-transform 
              text-shadow 
              font-bold 
              text-center"
          >
            {t('default')}
          </button>
          <button
            type="submit"
            className="text-3xl px-6 py-3 text-white 
              hover:scale-125 
              transition-transform 
              text-shadow 
              font-bold 
              text-center"
          >
            {t('save')}
          </button>
        </div>
      </form>
    </div>
  );
} 