import { atom } from 'recoil';
import { IPlaylist, ISong } from './types';

import songs from './songs.json';

const playlistState = atom<IPlaylist>({
  key: 'playlistState',
  default: {
    playlist: [...(songs as ISong[])]
  }
});

export { playlistState };
