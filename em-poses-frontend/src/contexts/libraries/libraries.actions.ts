import { createLibrary, deleteLibraryById, getAllLibraries, importSongsToLibrary, updateLibraryById } from '../../api/libraries';
import Library from '../../types/Library';
import { Dispatch } from './types';

export async function getLibrariesAction(dispatch: Dispatch): Promise<void> {
  dispatch({ type: 'getLibrariesInProgress' });
  try {
    const libraries = await getAllLibraries();
    dispatch({ type: 'getLibrariesSuccess', payload: { libraries } });
  } catch {
    dispatch({ type: 'getLibrariesError' });
  }
}

export function openAddLibraryDialogAction(dispatch: Dispatch): void {
  dispatch({ type: 'openAddLibraryDialog' });
}

export function closeAddLibraryDialogAction(dispatch: Dispatch): void {
  dispatch({ type: 'closeAddLibraryDialog' });
}

export async function addLibraryAction(dispatch: Dispatch, library: Library): Promise<void> {
  dispatch({ type: 'addLibraryInProgress' });
  try {
    const result = await createLibrary(library);
    dispatch({ type: 'addLibrarySuccess', payload: { library: result } })
  } catch {
    dispatch({ type: 'addLibraryError' });
  }
}

export function openEditLibraryDialogAction(dispatch: Dispatch, library: Library): void {
  dispatch({ type: 'openEditLibraryDialog', payload: { library } });
}

export function closeEditLibraryDialogAction(dispatch: Dispatch): void {
  dispatch({ type: 'closeEditLibraryDialog' });
}

export async function editLibraryAction(dispatch: Dispatch, library: Library): Promise<void> {
  dispatch({ type: 'editLibraryInProgress' });
  try {
    await updateLibraryById(library);
    dispatch({ type: 'editLibrarySuccess', payload: { library } })
  } catch {
    dispatch({ type: 'editLibraryError' });
  }
}

export function openConfirmDeleteDialogAction(dispatch: Dispatch, library: Library): void {
  dispatch({ type: 'openConfirmDeleteDialog', payload: { library } });
}

export function closeConfirmDeleteDialogAction(dispatch: Dispatch): void {
  dispatch({ type: 'closeConfirmDeleteDialog' });
}

export async function deleteLibraryAction(dispatch: Dispatch, libraryId: string): Promise<void> {
  dispatch({ type: 'deleteLibraryInProgress' });
  try {
    await deleteLibraryById(libraryId);
    dispatch({ type: 'deleteLibrarySuccess' })
  } catch {
    dispatch({ type: 'deleteLibraryError' });
  }
}

type ImportSongsToLibraryActionProps = {
  dispatch: Dispatch;
  libraryId: string;
  file: File;
}
export async function importSongsToLibraryAction(props: ImportSongsToLibraryActionProps): Promise<void> {
  const { dispatch, libraryId, file } = props;
  dispatch({ type: 'importSongsToLibraryInProgress', payload: { libraryId, progress: 0 } });
  try {
    const library = await importSongsToLibrary(libraryId, file, (event: ProgressEvent) => {
      const { total, loaded } = event;
      dispatch({
        type: 'importSongsToLibraryInProgress',
        payload: { libraryId, progress: Math.round(loaded / total * 100) }
      });
    });
    dispatch({ type: 'importSongsToLibrarySuccess', payload: { library } });
  } catch {
    dispatch({ type: 'importSongsToLibraryError', payload: { libraryId } });
  }
}
