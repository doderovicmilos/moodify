import { Mood, MoodLabel } from "../../../shared/types";

interface IUserSettings {
  mood: Mood;
  moodLabels: Record<Mood, MoodLabel>
};

interface IDashboardUI {
  isAddSongActive: boolean;
  isEditMoodActive: boolean;
};

export type { IDashboardUI, IUserSettings };