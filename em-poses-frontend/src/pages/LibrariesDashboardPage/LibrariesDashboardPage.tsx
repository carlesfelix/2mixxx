import { useEffect } from 'react';
import { getAllLibraries } from '../../api/libraries';
import AsyncLayout from '../../components/AsyncLayout';
import useRequest, { requestAction } from '../../hooks/useRequest';
import Library from '../../types/Library';
import LibraryItem from './components/LibraryItem';
import './LibrariesDashboardPage.scss';

export default function LibrariesDashboardPage() {
  const [ libraries, dispatchLibraries ] = useRequest<Library[]>({
    initialData: [], initialInProgress: true
  });
  useEffect(() => {
    requestAction(dispatchLibraries, { requestFn: getAllLibraries, requestArgs: [] });
  }, [ dispatchLibraries ]);
  return (
    <div className="LibrariesDashboardPage">
      <AsyncLayout error={libraries.error} inProgress={libraries.inProgress} errorMessage="Error">
        {
          libraries.data.map((library) => (
            <LibraryItem key={library.id} library={library} />
          ))
        }
      </AsyncLayout>
    </div>
  );
}
