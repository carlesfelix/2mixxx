import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { getAllLibraries, createLibrary } from '../../api/libraries';
import AsyncLayout from '../../components/AsyncLayout';
import AsyncState from '../../types/AsyncState';
import Library from '../../types/Library';
import LibraryItem from './components/LibraryItem';
import './LibrariesDashboardPage.scss';

export default function LibrariesDashboardPage() {
  const [ libraries, setLibraries ] = useState<AsyncState<Library[]>>({
    inProgress: true, error: null, data: []
  });
  useEffect(() => {
    getAllLibraries().then(data => {
      setLibraries({ inProgress: false, error: null, data });
    }).catch(error => {
      setLibraries({ inProgress: false, error, data: [] });
    });
  }, []);
  function addNewLibraryHandler(): void {
    createLibrary({ title: 'test', createdAt: '', updatedAt: '', id: '' }).then(data => {
      setLibraries(old => ({ ...old, data: [ ...old.data, data ] }));
    });
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
    </div>
  );
}
