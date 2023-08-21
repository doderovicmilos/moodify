import { atom } from 'recoil';
import { IDashboardUI, IUserSettings } from './types';

const dashboardUIState = atom<IDashboardUI>({
  key: 'dashboardUIState',
  default: {
    isAddSongActive: false,
    isEditMoodActive: false
  }
});

const userSettingsState = atom<IUserSettings>({
  key: 'userSettingsState',
  default: {
    mood: 'happy',
    moodLabels: {
      happy: { 
        plain: "Happy", 
        emoji: "🥰"
      },
      sad: { 
        plain: "Sad", 
        emoji: "☹️"
      },
      energetic:  { 
        plain: "Energetic", 
        emoji: "✊"
      },
      relaxed: { 
        plain: "Relaxed", 
        emoji: "😞"
      }
    }
  }
});

export { dashboardUIState, userSettingsState };