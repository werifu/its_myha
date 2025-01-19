"use client";
import { useState, useRef } from 'react';
import Image from 'next/image';
import { Question } from '@/data/questions';
import AudioPlayer from '@/components/AudioPlayer';

interface QuestionCardProps {
  question: Question;
  onAnswer: (isCorrect: boolean) => Promise<void>;
  showFeedback: boolean;
}

export default function QuestionCard({
  question,
  onAnswer,
  showFeedback,
}: QuestionCardProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleSelection = async (option: string) => {
    if (selected) return;
    setSelected(option);
    const correct = option === question.correctImage;
    await onAnswer(correct);
    setSelected(null);
  };

  return (
    <div className="w-full max-w-3xl">
      <div className="mb-5">
        <AudioPlayer character={question.character} src={question.audio} ref={audioRef} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-sm md:max-w-none mx-auto px-10 md:px-0">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelection(option)}
            className={`relative p-0
              transition-all
              duration-200
              rounded-lg
              overflow-hidden
              ${showFeedback
                ? (option === selected ?
                  (option === question.correctImage ?
                    'outline outline-4 outline-green-500 after:absolute after:inset-0 after:bg-green-500/30'
                    : 'outline outline-4 outline-red-500 after:absolute after:inset-0 after:bg-red-500/30'
                  )
                  : 'outline outline-2 outline-gray-300'
                )
                : 'outline outline-2 outline-gray-300'
              }
              `}
          >
            <Image
              src={option}
              alt={`选项 ${index + 1}`}
              width={1600}
              height={900}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
