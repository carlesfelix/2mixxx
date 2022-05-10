import { useEffect } from 'react';
import AsyncLayout from '../../components/AsyncLayout';
import BasicButton from '../../components/BasicButton';
import BottomActionWrapper from '../../components/BottomActionWrapper';
import ConfirmDialog from '../../components/ConfirmDialog';
import PageLayout from '../../components/PageLayout';
import {
  addLibraryAction, closeAddLibraryDialogAction, closeConfirmDeleteDialogAction,
  closeEditLibraryDialogAction, deleteLibraryAction, editLibraryAction,
  getLibrariesAction, openAddLibraryDialogAction, openConfirmDeleteDialogAction,
  openEditLibraryDialogAction
} from '../../contexts/libraries';
import { deleteSongsFromLibraryAction, importSongsToLibraryAction } from '../../contexts/libraries/libraries.actions';
import useLibraries from '../../contexts/libraries/useLibraries';
import { useTranslation } from '../../services/i18n';
import Library from '../../types/Library';
import Song from '../../types/Song';
import LibraryInfoDialog from './components/LibraryInfoDialog';
import LibraryItem from './components/LibraryItem';
import './LibrariesDashboardPage.scss';

export default function LibrariesDashboardPage() {
  const { t } = useTranslation();
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
  function importSongsHandler(library: Library, songs: Song[]): void {
    importSongsToLibraryAction({
      dispatch: librariesDispatch,
      libraryId: library.id!,
      songs
    });
  }
  return (
    <PageLayout
      toolbarTitle={t('Pages.LibrariesDashboardPage.toolbarTitle')}
      toolbarLinkBack="/dashboard"
      className="LibrariesDashboardPage"
      bottomBar={
        <BottomActionWrapper className="bottom-actions">
          <BasicButton onClick={openLibraryInfoDialogHandler} color="primary" className="bottom-action-btn">
            {t('Pages.LibrariesDashboardPage.bottomActionButton')}
          </BasicButton>
        </BottomActionWrapper>
      }
    >
      <div className="LibrariesDashboardPage__content page-content layout layout-center-v">
        <AsyncLayout
          error={libraries.libraries.error}
          inProgress={libraries.libraries.inProgress}
          errorMessage={t('Pages.LibrariesDashboardPage.librariesLoadError')}
        >
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
          message={t('Pages.LibrariesDashboardPage.confirmDeleteDialogTitle')}
          isOpen={libraries.confirmDeleteDialog.isOpen}
          inProgress={libraries.confirmDeleteDialog.inProgress}
          onRejected={dismissConfirmDeleteDialog}
          onConfirmed={confirmedDeleteHandler}
        />
      </div>
    </PageLayout>
  );
}
