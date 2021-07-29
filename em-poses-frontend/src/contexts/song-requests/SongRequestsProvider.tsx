import { useReducer } from 'react';
import SongRequestsContext from './SongRequestsContext';
import songRequestsReducer from './songRequestsReducer';
import { SongRequestsProviderProps } from './types';

export default function SongRequestsProvider(props: SongRequestsProviderProps) {
  const { children } = props;
  const [ state, dispatch ] = useReducer(songRequestsReducer, { songs: [] });
  const value = { state, dispatch };
  return (
    <SongRequestsContext.Provider value={value}>
      {children}
    </SongRequestsContext.Provider>
  );
}
