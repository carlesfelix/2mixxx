import { useReducer } from 'react';
import LibrariesContext from './LibrariesContext';
import librariesReducer from './librariesReducer';
import { LibrariesProviderProps } from './types';

export default function LibrariesProvider(props: LibrariesProviderProps) {
  const { children } = props;
  const [ state, dispatch ] = useReducer(librariesReducer, {
    libraries: { data: [], inProgress: true, error: false },
    addLibraryDialog: { inProgress: false, isOpen: false },
    editLibraryDialog: { inProgress: false, isOpen: false },
    confirmDeleteDialog: { inProgress: false, isOpen: false }
  });
  const value = { state, dispatch };
  return (
    <LibrariesContext.Provider value={value}>
      {children}
    </LibrariesContext.Provider>
  );
}
