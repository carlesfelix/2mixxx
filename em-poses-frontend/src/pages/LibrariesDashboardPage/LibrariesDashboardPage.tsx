import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { createLibrary, deleteLibraryById, getAllLibraries, updateLibraryById } from '../../api/libraries';
import AsyncLayout from '../../components/AsyncLayout';
import ConfirmDialog from '../../components/ConfirmDialog';
import AsyncState from '../../types/AsyncState';
import DialogState from '../../types/DialogState';
import Library from '../../types/Library';
import LibraryInfoDialog from './components/LibraryInfoDialog';
import LibraryItem from './components/LibraryItem';
import './LibrariesDashboardPage.scss';

export default function LibrariesDashboardPage() {
  const [ libraries, setLibraries ] = useState<AsyncState<Library[]>>({
    inProgress: true, error: null, data: []
  });
  const [ libraryInfoDialog, setLibraryInfoDialog ] = useState<DialogState<Library>>({
    isOpen: false, inProgress: false
  });
  const [ confirmDeleteDialog, setConfirmDeleteDialog ] = useState<DialogState<Library>>({
    isOpen: false, inProgress: false
  });
  useEffect(() => {
    getAllLibraries().then(data => {
      setLibraries({ inProgress: false, error: null, data });
    }).catch(error => {
      setLibraries({ inProgress: false, error, data: [] });
    });
  }, []);
  function openLibraryInfoDialogHandler(): void {
    setLibraryInfoDialog({ isOpen: true, inProgress: false });
  }
  function addLibrarySubmitHandler(library: Library): void {
    setLibraryInfoDialog(old => ({ ...old, inProgress: true }));
    createLibrary(library).then(res => {
      setLibraries(old => ({ ...old, data: [ ...old.data, res ] }));
      setLibraryInfoDialog({ isOpen: false, inProgress: false });
    }).catch(() => {
      setLibraryInfoDialog(old => ({ ...old, inProgress: false }));
    });
  }
  function editLibrarySubmitHandler(library: Library): void {
    setLibraryInfoDialog(old => ({ ...old, inProgress: true }));
    updateLibraryById(library).then(() => {
      setLibraries(old => ({
        ...old,
        data: old.data.map(libraryData => library.id === libraryData.id ? library : libraryData)
      }));
      setLibraryInfoDialog({ isOpen: false, inProgress: false });
    }).catch(() => {
      setLibraryInfoDialog(old => ({ ...old, inProgress: false }));
    });
  }
  function closeLibraryInfo(): void {
    setLibraryInfoDialog({ isOpen: false, inProgress: false });
  }
  function openEditLibraryDialog(library: Library): void {
    setLibraryInfoDialog({ isOpen: true, data: library, inProgress: false });
  }
  function openConfirmDeleteDialog(library: Library): void {
    setConfirmDeleteDialog({ data: library, isOpen: true, inProgress: false });
  }
  function dismissConfirmDeleteDialog(): void {
    setConfirmDeleteDialog({ isOpen: false, inProgress: false });
  }
  function confirmedDeleteHandler(library?: Library): void {
    if (library) {
      setConfirmDeleteDialog(old => ({ ...old, inProgress: true }));
      deleteLibraryById(library.id!).then(() => {
        setConfirmDeleteDialog({ isOpen: false, inProgress: false });
        setLibraries(old => ({
          ...old,
          data: old.data.filter(({ id }) => id !== library.id)
        }));
      }).catch(() => {
        setConfirmDeleteDialog(old => ({ ...old, inProgress: false }));
      });
    }
  }
  return (
    <div className="LibrariesDashboardPage">
      <AsyncLayout error={libraries.error} inProgress={libraries.inProgress} errorMessage="Error">
        <div className="libraries-grid">
          {
            libraries.data.map((library) => (
              <LibraryItem
                key={library.id} library={library}
                onStartDelete={openConfirmDeleteDialog}
                onStartEdit={openEditLibraryDialog}
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
        state={libraryInfoDialog} onCreate={addLibrarySubmitHandler}
        onEdit={editLibrarySubmitHandler} onClose={closeLibraryInfo}
      />
      <ConfirmDialog<Library>
        message="The library and all its songs will be deleted"
        isOpen={confirmDeleteDialog.isOpen} onRejected={dismissConfirmDeleteDialog}
        onConfirmed={confirmedDeleteHandler} data={confirmDeleteDialog.data}
        inProgress={confirmDeleteDialog.inProgress}
      />
    </div>
  );
}
