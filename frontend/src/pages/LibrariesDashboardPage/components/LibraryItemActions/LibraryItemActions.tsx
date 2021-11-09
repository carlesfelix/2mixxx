import { ReactNode } from 'react';
import './LibraryItemActions.scss';

type Props = {
  importProgress?: number;
  songs?: number;
  deleteSongsInProgress: boolean;
  onDeleteSongs: () => void;
  onImportSongs: () => void;
};

export default function LibrarySongManager(props: Props) {
  const {
    importProgress, songs, onDeleteSongs, onImportSongs,
    deleteSongsInProgress
  } = props;
  function deleteSongsHandler(): void {
    onDeleteSongs();
  }
  function importSongsHandler(): void {
    onImportSongs();
  }
  function getContent(): ReactNode {
    if (typeof importProgress === 'number') {
      return (
        <span>{importProgress}%</span>
      );
    }
    if (songs) {
      return (
        <button className="btn btn-danger" onClick={deleteSongsHandler} disabled={deleteSongsInProgress}>
          Delete songs
        </button>
      );
    }
    return (
      <button className="btn btn-primary" onClick={importSongsHandler}>
        Import songs
      </button>
    );
  }
  return (
    <div className="LibraryItemActions">
      {getContent()}
    </div>
  );
}