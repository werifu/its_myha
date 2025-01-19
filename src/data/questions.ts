import shuffle from '@/utils/shuffle';
import { assets } from '@/data/assets';
export type Character = 'taki' | 'anon';

export interface Question {
  id: number,
  character: Character,
  audio: string, // Path to the audio file
  correctImage: string, // Path to the correct image
  options: string[], // Array of image paths
}

export interface QuestionFilter {
  characters?: Character[],
  words?: "ha", // may be "e?"
}

export interface Asset {
  character: Character,
  audio: string,
  image: string,
}

export function getAllAssets() {
  const allAssets: Asset[][] = [];

  // Process anon assets
  allAssets.push(assets.anon.map(asset => (
    {
      character: 'anon',
      audio: asset.audio,
      image: asset.image,
    }
  )));

  // Process taki assets 
  allAssets.push(assets.taki.map(asset => (
    {
      character: 'taki',
      audio: asset.audio,
      image: asset.image,
    }
  )));


  return allAssets;
}

export function generateQuestions(assets: Asset[][], num: number, filter?: QuestionFilter): Question[] {
  // Determine which character indices to use based on filter
  const availableCharIndices = ['anon', 'taki'].reduce((acc, char, index) => {
    if (!filter?.characters || filter.characters.includes(char as Character)) {
      acc.push(index);
    }
    return acc;
  }, [] as number[]);

  // Flatten available assets based on character filter
  const availableAssets = availableCharIndices.flatMap(idx => assets[idx]);

  // Ensure we have enough assets
  if (availableAssets.length < 1) {
    throw new Error('No assets available for the specified filter');
  }

  // Track used audio files to avoid duplicates
  const usedAudio = new Set<string>();

  // Filter assets that haven't been used yet
  const getUnusedAssets = () => availableAssets.filter(asset => !usedAudio.has(asset.audio));

  // Check if we have enough unique assets
  if (num > availableAssets.length) {
    throw new Error(`Requested ${num} questions but only ${availableAssets.length} unique assets available`);
  }

  const questions: Question[] = [];

  for (let i = 0; i < num; i++) {
    const unusedAssets = getUnusedAssets();
    if (unusedAssets.length === 0) {
      throw new Error('No more unused assets available');
    }

    // Randomly select an unused asset for the question
    const questionAsset = unusedAssets[Math.floor(Math.random() * unusedAssets.length)];
    usedAudio.add(questionAsset.audio);

    // Get all assets for the same character
    const characterAssets = availableAssets.filter(asset =>
      asset.character === questionAsset.character
    );

    // Get 3 random different images (excluding the correct one) for options
    const otherImages = shuffle(
      characterAssets
        .filter(asset => asset.image !== questionAsset.image)
        .map(asset => asset.image)
    ).slice(0, 3);

    // Combine correct image with other options and shuffle
    const options = shuffle([...otherImages, questionAsset.image]);

    questions.push({
      id: i,
      character: questionAsset.character,
      audio: questionAsset.audio,
      correctImage: questionAsset.image,
      options,
    });
  }

  return questions;
}

