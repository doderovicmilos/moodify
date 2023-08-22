import { Mood } from '../../shared/types';

interface ISong {
  rank: number;
  title: string;
  artist: string;
  album: string;
  mood: Mood;
}

interface IPlaylist {
  playlist: ISong[];
}

export type { ISong, IPlaylist };
