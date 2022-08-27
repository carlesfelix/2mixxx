import { ReactNode, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { searchSongs } from '../../api/songs';
import AsyncLayout from '../../components/AsyncLayout';
import BasicButton from '../../components/BasicButton';
import BottomActionWrapper from '../../components/BottomActionWrapper';
import InputText from '../../components/forms/inputs/InputText';
import RadioButtonBox from '../../components/forms/inputs/RadioButtonBox';
import PageLayout from '../../components/PageLayout';
import { useRoomSession } from '../../contexts/room-session';
import { useTranslation } from '../../services/i18n';
import AsyncState from '../../types/AsyncState';
import Song from '../../types/Song';
import SongRequestProgressDialog from './components/SongRequestProgressDialog';
import SongResult from './components/SongResult';
import './MakeASongRequestPage.scss';

export default function MakeASongRequestPage() {
  const { t } = useTranslation();
  const {
    sendNewRequest,
    confirmNewRequestSent,
    sendNewRequestStatus,
    connectionStatus,
    songRequests
  } = useRoomSession();
  const limitReached = songRequests.data.length >= 25;
  const [ query, setQuery ] = useState<string>('');
  const [ selectedSong, setSelectedSong ] = useState<string>('');
  const [ songs, setSongs ] = useState<AsyncState<Song[]>>({
    data: [], inProgress: false, error: false
  });
  const queryTrim = query.trim();
  const [ queryTrimDebounced ] = useDebounce(queryTrim, 500);
  const queryLength = queryTrimDebounced.length;
  const noSongs = !songs.data.length;
  const emptySearch = !queryLength && noSongs;
  const resultsNotFound = !!queryLength && noSongs;
  useEffect(() => {
    setSelectedSong('');
    if (queryLength > 2) {
      setSongs({
        data: [],
        inProgress: true,
        error: false
      });
      searchSongs(queryTrimDebounced).then(data => {
        setSongs({
          data,
          inProgress: false,
          error: false
        });
      }).catch(() => {
        setSongs({
          data: [],
          inProgress: false,
          error: true
        });
      });
    } else {
      setSongs({
        data: [],
        inProgress: false,
        error: false
      });
    }
  }, [ queryTrimDebounced, queryLength ]);
  function radioButtonBoxChangeHandler(itemValue: string): void {
    setSelectedSong(itemValue);
  }
  function sendRequestHandler(): void {
    sendNewRequest(selectedSong);
  }
  function confirmNewRequestSentHandler(): void {
    confirmNewRequestSent();
  }
  function getSearchContent(): ReactNode {
    if (limitReached) {
      return (
        <div className="limit-message-container">
          <p>
            {t('Pages.MakeASongRequestPage.limitMessage')}
          </p>
        </div>
      );
    }
    if (emptySearch) {
      return (
        <div className="empty-message-container">
          <p>
            {t('Pages.MakeASongRequestPage.emptyQueryMessage')}
          </p>
        </div>
      );
    }
    if (resultsNotFound) {
      return (
        <div className="not-found-message-container">
          <p>
            {t('Pages.MakeASongRequestPage.emptyRecords')}
          </p>
        </div>
      );
    }
    return (
      <RadioButtonBox
        onChange={radioButtonBoxChangeHandler}
        value={selectedSong}
        className="list"
        extraProps={{
          itemClassName: 'card card-primary list-item',
          items: songs.data.map(song => ({
            label: (
              <SongResult song={song} />
            ),
            value: song.id
          }))
        }}
      />
    );
  }
  return (
    <PageLayout
      className="MakeASongRequestPage"
      toolbarTitle={t('Pages.MakeASongRequestPage.toolbarTitle')}
      toolbarLinkBack="/"
      topBar={
        !limitReached && (
          <div className="filter-container">
            <InputText
              className="search-input"
              onChange={setQuery}
              value={query}
              extraProps={{
                placeholder: t('Pages.MakeASongRequestPage.searchForm.fields.query.placeholder'),
                autoComplete: 'off',
                disabled: sendNewRequestStatus.inProgress || !connectionStatus.connected 
              }}
            />
          </div>
        )
      }
      bottomBar={
        !limitReached && (
          <BottomActionWrapper className="bottom-actions">
            <BasicButton
              inProgress={sendNewRequestStatus.inProgress}
              disabled={!selectedSong || !connectionStatus.connected}
              onClick={sendRequestHandler}
              color="primary"
              className="bottom-action-btn"
            >
              {t('Pages.MakeASongRequestPage.bottomAction')}
            </BasicButton>
          </BottomActionWrapper>
        )
      }
    >
      <div className="page-content song-request-content">
        <AsyncLayout
          error={songs.error}
          inProgress={songs.inProgress}
          errorMessage={t('Pages.MakeASongRequestPage.songsLoadError')}
        >
          {getSearchContent()}
        </AsyncLayout>
      </div>
      <SongRequestProgressDialog
        isOpen={!sendNewRequestStatus.data.newRequestConfirmed}
        onConfirm={confirmNewRequestSentHandler}
      />
    </PageLayout>
  );
}
