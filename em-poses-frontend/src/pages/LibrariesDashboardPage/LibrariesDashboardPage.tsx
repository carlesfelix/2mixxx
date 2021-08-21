import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { createLibrary, getAllLibraries } from '../../api/libraries';
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
    isOpen: boolean, value?: Library, submitProgress: boolean
  }>({ isOpen: false, submitProgress: false });

  useEffect(() => {
    getAllLibraries().then(data => {
      setLibraries({ inProgress: false, error: null, data });
    }).catch(error => {
      setLibraries({ inProgress: false, error, data: [] });
    });
  }, []);
  function addNewLibraryHandler(): void {
    setLibraryInfoDialog({ isOpen: true, submitProgress: false });
  }
  function submitCreateHandler(library: Library): void {
    setLibraryInfoDialog(old => ({ ...old, submitProgress: true }));
    createLibrary(library).then(data => {
      setLibraries(old => ({ ...old, data: [ ...old.data, data ] }));
      setLibraryInfoDialog({ isOpen: false, submitProgress: false });
    });
  }
  function libraryInfoCloseHandler(): void {
    setLibraryInfoDialog({ isOpen: false, submitProgress: false });
  }
  return (
    <div className="LibrariesDashboardPage">
      <AsyncLayout error={libraries.error} inProgress={libraries.inProgress} errorMessage="Error">
        <div className="libraries-grid">
          {
            libraries.data.map((library) => (
              <LibraryItem key={library.id} library={library} />
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
        onSubmit={submitCreateHandler} isOpen={libraryInfoDialog.isOpen}
        value={libraryInfoDialog.value} onClose={libraryInfoCloseHandler}
        submitProgress={libraryInfoDialog.submitProgress}
      />
    </div>
  );
}
