import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import AsyncLayout from '../../components/AsyncLayout';
import ConfirmDialog from '../../components/ConfirmDialog';
import {
  addLibraryAction, closeAddLibraryDialogAction, closeConfirmDeleteDialogAction,
  closeEditLibraryDialogAction, deleteLibraryAction, editLibraryAction,
  getLibrariesAction, openAddLibraryDialogAction, openConfirmDeleteDialogAction,
  openEditLibraryDialogAction
} from '../../contexts/libraries';
import { deleteSongsFromLibraryAction, importSongsToLibraryAction } from '../../contexts/libraries/libraries.actions';
import useLibraries from '../../contexts/libraries/useLibraries';
import Library from '../../types/Library';
import LibraryInfoDialog from './components/LibraryInfoDialog';
import LibraryItem from './components/LibraryItem';
import './LibrariesDashboardPage.scss';

export default function LibrariesDashboardPage() {
  const { state: libraries, dispatch: librariesDispatch } = useLibraries();
  useEffect(() => {
    getLibrariesAction(librariesDispatch);
  }, [ librariesDispatch ]);
  function openLibraryInfoDialogHandler(): void {
    openAddLibraryDialogAction(librariesDispatch);
  }
  function addLibrarySubmitHandler(library: Library): void {
    addLibraryAction(librariesDispatch, library);
  }
  function editLibrarySubmitHandler(library: Library): void {
    editLibraryAction(librariesDispatch, library);
  }
  function closeAddLibraryDialog(): void {
    closeAddLibraryDialogAction(librariesDispatch);
  }
  function closeEditLibraryDialog(): void {
    closeEditLibraryDialogAction(librariesDispatch);
  }
  function openEditLibraryDialog(library: Library): void {
    openEditLibraryDialogAction(librariesDispatch, library);
  }
  function openConfirmDeleteDialog(library: Library): void {
    openConfirmDeleteDialogAction(librariesDispatch, library);
  }
  function dismissConfirmDeleteDialog(): void {
    closeConfirmDeleteDialogAction(librariesDispatch);
  }
  function confirmedDeleteHandler(): void {
    deleteLibraryAction(librariesDispatch, libraries.confirmDeleteDialog.data?.id!);
  }
  function deleteSongsHandler(library: Library): void {
    deleteSongsFromLibraryAction(librariesDispatch, library.id!);
  }
  function importSongsHandler(library: Library, file: File): void {
    importSongsToLibraryAction({ dispatch: librariesDispatch, libraryId: library.id!, file });
  }
  return (
    <div className="LibrariesDashboardPage">
      <AsyncLayout error={libraries.libraries.error} inProgress={libraries.libraries.inProgress} errorMessage="Error">
        <div className="libraries-grid">
          {
            libraries.libraries.data.map((library) => (
              <LibraryItem
                key={library.id} library={library}
                onStartDelete={openConfirmDeleteDialog}
                onStartEdit={openEditLibraryDialog}
                onDeleteSongs={deleteSongsHandler}
                onImportSongs={importSongsHandler}
                importProgress={libraries.importProgress[library.id!]}
                deleteSongsInProgress={libraries.deleteInProgress[library.id!]}
              />
            ))
          }
        </div>
        <div className="libraries-actions">
          <button className="btn btn-primary" onClick={openLibraryInfoDialogHandler}>
            <FontAwesomeIcon icon={faPlus} />
            <span>Add new library</span>
          </button>
        </div>
      </AsyncLayout>
      <LibraryInfoDialog
        state={libraries.addLibraryDialog} onSubmit={addLibrarySubmitHandler}
        onClose={closeAddLibraryDialog}
      />
      <LibraryInfoDialog
        state={libraries.editLibraryDialog} onSubmit={editLibrarySubmitHandler}
        onClose={closeEditLibraryDialog}
      />
      <ConfirmDialog
        message="The library and all its songs will be deleted"
        isOpen={libraries.confirmDeleteDialog.isOpen}
        inProgress={libraries.confirmDeleteDialog.inProgress}
        onRejected={dismissConfirmDeleteDialog} onConfirmed={confirmedDeleteHandler}
      />
    </div>
  );
}
