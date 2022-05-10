import { faEllipsisV, faMusic, faRecordVinyl } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEventHandler, useRef, useState } from 'react';
import OverlayMenu from '../../../../components/OverlayMenu';
import { loadSongsFromItunesFile } from '../../../../services/file';
import { useTranslation } from '../../../../services/i18n';
import Library from '../../../../types/Library';
import Song from '../../../../types/Song';
import { getLibraryMenu } from '../../helpers';
import LibraryActions from '../LibraryItemActions';
import WrongFileDialog from '../WrongFileDialog';
import './LibraryItem.scss';

type Props = {
  library: Library,
  onStartEdit: (value: Library) => void;
  onStartDelete: (value: Library) => void;
  onImportSongs: (library: Library, songs: Song[]) => void;
  onDeleteSongs: (library: Library) => void;
  importProgress?: number;
  deleteSongsInProgress?: boolean;
};
export default function LibraryItem(props: Props) {
  const {
    library, onStartDelete, onStartEdit, onDeleteSongs, onImportSongs,
    importProgress, deleteSongsInProgress = false
  } = props;
  const { title } = library;
  const { t } = useTranslation();
  const [ loadFileStatus, setLoadFileStatus ] = useState<
    'initial' | 'progress' | 'error'
  >('initial');
  const fileRef = useRef<HTMLInputElement>(null);
  const libraryMenu = getLibraryMenu({
    t, onDeleteLibrary: deleteLibraryHandler,
    onEditInfo: editInfoHandler
  });
  function changeFileInputHandler(): ChangeEventHandler<HTMLInputElement> {
    return event => {
      setLoadFileStatus('progress');
      const { currentTarget } = event;
      const { files } = currentTarget;
      if (files?.length) {
        const file = files.item(0);
        if (file) {
          loadSongsFromItunesFile(file).then(songs => {
            onImportSongs(library, songs);
            setLoadFileStatus('initial')
          }).catch(() => {
            setLoadFileStatus('error');
          });
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
      fileRef.current.value = '';
      fileRef.current.click();
    }
  }
  function wrongFileDialogCloseHandler(): void {
    setLoadFileStatus('initial');
  }
  return (
    <div className="card card-primary LibraryItem">
      <div className="library-header">
        <span className="library-icon card-title">
          <FontAwesomeIcon icon={faRecordVinyl} />
        </span>
        <span className="library-title card-title">
          <span>
            {title}
          </span>
        </span>
        <span className="library-menu card-title">
          <OverlayMenu items={libraryMenu}>
            <span className="library-menu-btn">
              <FontAwesomeIcon icon={faEllipsisV} />
            </span>
          </OverlayMenu>
        </span>
      </div>
      <div className="library-actions">
        <LibraryActions
          songs={library.songs}
          onDeleteSongs={deleteSongsHandler}
          onImportSongs={importSongsHandler}
          importProgress={importProgress}
          loadFileProgress={loadFileStatus === 'progress'}
          deleteSongsInProgress={deleteSongsInProgress}
        />
      </div>
      <div className="library-footer">
        <span className="badge badge-secondary songs-badge">
          {
            library.songs ? (
              <span>
                <span>
                  <FontAwesomeIcon icon={faMusic} />
                </span>
                <span>{library.songs}</span>
              </span>
            ) : (
              <span>{t('Components.LibraryItem.empty')}</span>
            )
          }
        </span>
      </div>
      <input
        type="file"
        accept=".xml"
        style={{ display: 'none' }}
        ref={fileRef}
        onChange={changeFileInputHandler()}
      />
      <WrongFileDialog
        isOpen={loadFileStatus === 'error'}
        onClose={wrongFileDialogCloseHandler}
      />
    </div>
  );
}
