import { Mood, MoodLabel } from "../shared/types";

interface UserSettings {
  mood: Mood;
  moodLabels: Record<Mood, MoodLabel>
};

export type { UserSettings }


