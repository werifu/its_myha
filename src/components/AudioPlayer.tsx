"use client";
import { forwardRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { Character } from '@/data/questions';

interface AudioPlayerProps {
  src: string;
  character: Character;
}

const AudioPlayer = forwardRef<HTMLAudioElement, AudioPlayerProps>(
  ({ src, character }, ref) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [imageSize, setImageSize] = useState(200);

    useEffect(() => {
      const updateSize = () => {
        const width = window.innerWidth;
        if (width < 640) { // mobile
          setImageSize(200);
        } else if (width < 1024) { // tablet
          setImageSize(250);
        } else { // desktop
          setImageSize(300);
        }
      };

      updateSize();
      window.addEventListener('resize', updateSize);
      return () => window.removeEventListener('resize', updateSize);
    }, []);

    const handlePlay = () => {
      const audio = ref as React.RefObject<HTMLAudioElement>;
      if (audio.current) {
        audio.current.play();
        setIsPlaying(true);
        setTimeout(() => setIsPlaying(false), 500);
      }
    };
    return (
      <div className="flex justify-center items-center">
        <button
          onClick={handlePlay}
          className={`transition-all duration-300 ${isPlaying ? 'scale-125 rotate-12' : ''
            }`}
        >
          <Image
            src={`/${character}-shout-border.png`}
            alt="Play"
            width={imageSize}
            height={imageSize}
          />
        </button>
        <audio src={src} ref={ref} className="hidden" />
      </div>
    );
  }
);

AudioPlayer.displayName = 'AudioPlayer';

export default AudioPlayer;
