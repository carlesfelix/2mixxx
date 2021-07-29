import { Action, State } from './types';

export default function songRequestsReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'loadAllSongs':
      return {
        songs: action.payload.songs
      };
    case 'deleteSong':
      return {
        songs: state.songs.filter(({ id }) => id !== action.payload.id)
      };
    case 'addSong':
      return {
        songs: [
          ...state.songs,
          action.payload.song
        ]
      };
    default: {
      throw new Error('Unhandled action')
    }
  }
}
