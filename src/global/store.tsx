import { atom } from 'recoil';
import { UserSettings } from './types';

const userSettingsState = atom<UserSettings>({
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

export { userSettingsState }