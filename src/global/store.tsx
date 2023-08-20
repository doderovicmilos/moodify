import { atom } from 'recoil';
import { UserSettings } from './types';

const userSettingsState = atom<UserSettings>({
  key: 'userSettingsState',
  default: {
    mood: 'happy'
  }
});

export { userSettingsState }