import { Character } from "@/data/questions";

export interface GameSettings {
  characters: Character[];
  questionNum: number;
}

export const defaultSettings: GameSettings = {
  characters: ['taki', 'anon'],
  questionNum: 10,
};
const SETTINGS_KEY = 'gameSettings';

export function getSettings(): GameSettings {
  if (typeof window === 'undefined') {
    return defaultSettings;
  }

  const settings = localStorage.getItem(SETTINGS_KEY);
  if (settings) {
    try {
      return JSON.parse(settings) as GameSettings;
    } catch {
      return defaultSettings;
    }
  }
  return defaultSettings;
}

export function saveSettings(settings: GameSettings): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }
} 