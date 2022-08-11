import { useEffect, useState } from 'react';
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
    connectionStatus
  } = useRoomSession();
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
  return (
    <PageLayout
      className="MakeASongRequestPage"
      toolbarTitle={t('Pages.MakeASongRequestPage.toolbarTitle')}
      toolbarLinkBack="/"
      topBar={
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
      }
      bottomBar={
        connectionStatus.connected && (
          <BottomActionWrapper className="bottom-actions">
            <BasicButton
              inProgress={sendNewRequestStatus.inProgress}
              disabled={!selectedSong}
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
          {
            emptySearch && (
              <div className="empty-message-container">
                <p>
                  {t('Pages.MakeASongRequestPage.emptyQueryMessage')}
                </p>
              </div>
            )
          }
          {
            resultsNotFound && (
              <div className="not-found-message-container">
                <p>
                  {t('Pages.MakeASongRequestPage.emptyRecords')}
                </p>
              </div>
            )
          }
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
        </AsyncLayout>
      </div>
      <SongRequestProgressDialog
        isOpen={!sendNewRequestStatus.data.newRequestConfirmed}
        onConfirm={confirmNewRequestSentHandler}
      />
    </PageLayout>
  );
}
