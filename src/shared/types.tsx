type Mood = 'happy' | 'sad' | 'energetic' | 'relaxed';

interface MoodLabel {
  plain: string;
  emoji: string;
}

export type { Mood, MoodLabel };