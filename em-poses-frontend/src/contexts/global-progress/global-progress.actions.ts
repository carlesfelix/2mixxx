import { importSongsToLibrary } from '../../api/libraries';
import { Dispatch } from './types';

export function updateProgressAction(dispatch: Dispatch, progressId: string, progressEvent: ProgressEvent): void {
  const { loaded, total } = progressEvent;
  dispatch({ type: 'updateProgress', payload: { progressId, progress: Math.round((loaded / total) * 100) } });
}

export function deleteProgressAction(dispatch: Dispatch, progressId: string): void {
  dispatch({ type: 'deleteProgress', payload: { progressId } });
}

type ImportSongsToLibraryActionProps = {
  libraryId: string;
  file: File;
  progressId: string;
}
export function importSongsToLibraryAction(dispatch: Dispatch, props: ImportSongsToLibraryActionProps): void {
  const { libraryId, file, progressId } = props;
  importSongsToLibrary(libraryId, file, (event: ProgressEvent) => {
    updateProgressAction(dispatch, progressId, event);
  }).finally(() => {
    deleteProgressAction(dispatch, progressId);
  });
}
