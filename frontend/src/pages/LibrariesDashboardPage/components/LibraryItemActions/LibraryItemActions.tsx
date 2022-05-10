import { ReactNode } from 'react';
import BasicButton from '../../../../components/BasicButton';
import { useTranslation } from '../../../../services/i18n';
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
  const { t } = useTranslation();
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
        <BasicButton
          color="danger"
          onClick={deleteSongsHandler}
          inProgress={deleteSongsInProgress}
        >
          {t('Components.LibraryItemActions.deleteSongs')}
        </BasicButton>
      );
    }
    return (
      <BasicButton
        color="primary"
        onClick={importSongsHandler}
      >
        {t('Components.LibraryItemActions.importXmlFromItunes')}
      </BasicButton>
    );
  }
  return (
    <div className="LibraryItemActions">
      {getContent()}
    </div>
  );
}