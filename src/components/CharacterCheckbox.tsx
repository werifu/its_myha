import React, { useRef, useEffect } from 'react';
import { Character } from '@/data/questions';
import Image from 'next/image';

interface CharacterCheckboxProps {
  character: Character;
  isSelected: boolean;
  onChange: (character: Character) => void;
}

const CharacterCheckbox: React.FC<CharacterCheckboxProps> = ({ character, isSelected, onChange }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const prevSelectedRef = useRef(isSelected);

  useEffect(() => {
    if (!prevSelectedRef.current && isSelected) {
      // Only play when changing from unchecked to checked
      if (audioRef.current) {
        audioRef.current.play().catch(err => {
          // Silently handle autoplay restriction errors
          console.debug('Audio autoplay prevented:', err);
        });
      }
    }
    prevSelectedRef.current = isSelected;
  }, [isSelected]);

  const handleChange = () => {
    onChange(character);
  };

  const assetUrl = `${character}-shout-border.png`;
  console.log(assetUrl);
  return (
    <label className="cursor-pointer">
      <input
        type="checkbox"
        value={character}
        checked={isSelected}
        onChange={handleChange}
        className="hidden"
      />
      <div className="relative">
        <div className={`transition-transform duration-200 ${
          isSelected ? 'transform scale-125 rotate-12' : ''
        }`}>
          <Image
            src={`/${assetUrl}`}
            alt={character}
            width={120}
            height={120}
          />
        </div>
        {isSelected && (
          <div className="absolute bottom-2 right-2 text-4xl text-blue-500 [text-shadow:_-1px_-1px_0_#fff,_1px_-1px_0_#fff,_-1px_1px_0_#fff,_1px_1px_0_#fff]">✔️</div>
        )}
      </div>
      <audio ref={audioRef} src={`/assets/${character}-2.MP3`} />
    </label>
  );
};

export default CharacterCheckbox;
