import { ReactNode } from 'react';
import { ITrack } from '../../models/ITrack';

export type Action =
  { type: 'loadAllSongs', payload: { songs: ITrack[] } } |
  { type: 'deleteSong', payload: { id: number } } |
  { type: 'addSong', payload: { song: ITrack } };

export type Dispatch = (action: Action) => void;
export type State = { songs: ITrack[] };
export type SongRequestsProviderProps = { children: ReactNode };
