import { ReactNode } from 'react';
import AsyncState from '../../types/AsyncState';
import DialogState from '../../types/DialogState';
import Library from '../../types/Library';

export type Action = { type: 'getLibrariesInProgress' } |
{ type: 'getLibrariesSuccess', payload: { libraries: Library[] } } |
{ type: 'getLibrariesError' } |
{ type: 'openAddLibraryDialog' } |
{ type: 'closeAddLibraryDialog' } |
{ type: 'addLibraryInProgress' } |
{ type: 'addLibrarySuccess', payload: { library: Library } } |
{ type: 'addLibraryError' } |
{ type: 'openEditLibraryDialog', payload: { library: Library } } |
{ type: 'closeEditLibraryDialog' } |
{ type: 'editLibraryInProgress' } |
{ type: 'editLibrarySuccess', payload: { library: Library } } |
{ type: 'editLibraryError' } |
{ type: 'openConfirmDeleteDialog', payload: { library: Library } } |
{ type: 'closeConfirmDeleteDialog' } |
{ type: 'deleteLibraryInProgress' } |
{ type: 'deleteLibrarySuccess' } |
{ type: 'deleteLibraryError' } |
{ type: 'importSongsToLibraryInProgress', payload: { libraryId: string, progress: number } } |
{ type: 'importSongsToLibrarySuccess', payload: { library: Library } } |
{ type: 'importSongsToLibraryError', payload: { libraryId: string } };
export type State = {
  libraries: AsyncState<Library[]>;
  addLibraryDialog: DialogState<undefined>;
  editLibraryDialog: DialogState<Library>;
  confirmDeleteDialog: DialogState<Library>;
  importProgress: { [id: string]: number };
};
export type Dispatch = (action: Action) => void;
export type LibrariesProviderProps = { children: ReactNode };
