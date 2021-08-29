import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEventHandler, useRef } from 'react';
import OverlayMenu from '../../../../components/OverlayMenu';
import Library from '../../../../types/Library';
import { getLibraryMenu } from '../../helpers';
import './LibraryItem.scss';

type Props = {
  library: Library,
  onStartEdit: (value: Library) => void;
  onStartDelete: (value: Library) => void;
  onImportSongs: (library: Library, file: File) => void;
  onDeleteSongs: (library: Library) => void;
  importProgress?: number;
};
export default function LibraryItem(props: Props) {
  const {
    library, onStartDelete, onStartEdit, onDeleteSongs, onImportSongs,
    importProgress
  } = props;
  const { title } = library;
  const fileRef = useRef<HTMLInputElement>(null);
  const libraryMenu = getLibraryMenu({
    onDeleteLibrary: deleteLibraryHandler, onEditInfo: editInfoHandler
  });
  function changeFileInputHandler(): ChangeEventHandler<HTMLInputElement> {
    return event => {
      const { currentTarget } = event;
      const { files } = currentTarget;
      if (files?.length) {
        const file = files.item(0);
        if (file) {
          onImportSongs(library, file);
        }
      }
    };
  }
  function deleteLibraryHandler(): void {
    onStartDelete(library);
  }
  function editInfoHandler(): void {
    onStartEdit(library);
  }
  function deleteSongsHandler(): void {
    onDeleteSongs(library);
  }
  function importSongsHandler(): void {
    if (fileRef.current) {
      fileRef.current.click();
    }
  }
  return (
    <div className="card card-primary LibraryItem">
      <span className="library-title">
        {title}
      </span>
      {importProgress}%
      {
        library.songs ? (
          <button className="btn btn-danger" onClick={deleteSongsHandler}>
            Delete songs
          </button>
        ) : (
          <button className="btn btn-primary" onClick={importSongsHandler}>
            Import songs
          </button>
        )
      }
      <input type="file" accept=".xml" style={{ display: 'none' }} ref={fileRef} onChange={changeFileInputHandler()} />
      <span className="library-menu">
        <OverlayMenu items={libraryMenu}>
          <span className="library-menu-btn">
            <FontAwesomeIcon icon={faEllipsisV} />
          </span>
        </OverlayMenu>
      </span>
    </div>
  );
}
