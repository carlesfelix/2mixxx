import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { getAllLibraries } from '../../api/libraries';
import AsyncLayout from '../../components/AsyncLayout';
import AsyncState from '../../types/AsyncState';
import Library from '../../types/Library';
import LibraryInfoDialog from './components/LibraryInfoDialog';
import LibraryItem from './components/LibraryItem';
import './LibrariesDashboardPage.scss';

export default function LibrariesDashboardPage() {
  const [ libraries, setLibraries ] = useState<AsyncState<Library[]>>({
    inProgress: true, error: null, data: []
  });
  const [ libraryInfoDialog, setLibraryInfoDialog ] = useState<{
    isOpen: boolean, value?: Library
  }>({ isOpen: false });
  useEffect(() => {
    getAllLibraries().then(data => {
      setLibraries({ inProgress: false, error: null, data });
    }).catch(error => {
      setLibraries({ inProgress: false, error, data: [] });
    });
  }, []);
  function addNewLibraryHandler(): void {
    setLibraryInfoDialog({ isOpen: true });
  }
  function createHandler(library: Library): void {
    setLibraries(old => ({ ...old, data: [ ...old.data, library ] }));
    setLibraryInfoDialog({ isOpen: false });
  }
  function editHandler(library: Library): void {
    setLibraries(old => ({
      ...old,
      data: old.data.map(libraryData => library.id === libraryData.id ? library : libraryData)
    }));
    setLibraryInfoDialog({ isOpen: false });
  }
  function libraryInfoCloseHandler(): void {
    setLibraryInfoDialog({ isOpen: false });
  }
  function startEditHandler(library: Library): void {
    setLibraryInfoDialog({ isOpen: true, value: library });
  }
  function startDeleteHandler(library: Library): void {
    // setLibraryInfoDialog({ isOpen: true, value: library });
  }
  return (
    <div className="LibrariesDashboardPage">
      <AsyncLayout error={libraries.error} inProgress={libraries.inProgress} errorMessage="Error">
        <div className="libraries-grid">
          {
            libraries.data.map((library) => (
              <LibraryItem
                key={library.id} library={library}
                onStartDelete={startDeleteHandler}
                onStartEdit={startEditHandler}
              />
            ))
          }
        </div>
        <div className="libraries-actions">
          <button className="btn btn-primary" onClick={addNewLibraryHandler}>
            <FontAwesomeIcon icon={faPlus} />
            <span>Add new library</span>
          </button>
        </div>
      </AsyncLayout>
      <LibraryInfoDialog
        onCreate={createHandler} onEdit={editHandler}
        isOpen={libraryInfoDialog.isOpen}
        value={libraryInfoDialog.value} onClose={libraryInfoCloseHandler}
      />
    </div>
  );
}
