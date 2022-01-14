import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { searchSongs } from '../../api/songs';
import AsyncLayout from '../../components/AsyncLayout';
import BottomActionButton from '../../components/BottomActionButton';
import InputText from '../../components/forms/inputs/InputText';
import RadioButtonBox from '../../components/forms/inputs/RadioButtonBox';
import PageLayout from '../../components/PageLayout';
import environment from '../../environment';
import useSocketConnectionManager from '../../hooks/useSocketConnectionManager';
import { emitNewSongRequest } from '../../socket/emitters';
import AsyncState from '../../types/AsyncState';
import Song from '../../types/Song';
import SongRequestProgressDialog from './components/SongRequestProgressDialog';
import SongResult from './components/SongResult';
import './MakeASongRequestPage.scss';

export default function MakeASongRequestPage() {
  const mainSocket = useSocketConnectionManager(environment.REACT_APP_SOCKET_BASE_URI);
  const [ query, setQuery ] = useState<string>('');
  const [ selectedSong, setSelectedSong ] = useState<string>('');
  const [ songs, setSongs ] = useState<AsyncState<Song[]>>({
    data: [], inProgress: false, error: false
  });
  const [ requestSent, setRequestSent ] = useState<AsyncState<boolean>>({
    data: false, inProgress: false, error: false
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
    if (mainSocket) {
      setRequestSent({
        data: false, inProgress: true,
        error: false
      });
      emitNewSongRequest(mainSocket, selectedSong).then(() => {
        setRequestSent({
          data: true, inProgress: false,
          error: false
        });
      }).catch(() => {
        setRequestSent({
          data: false, inProgress: false,
          error: true
        });
      });
    }
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
              autoComplete: 'off'
            }}
          />
        </div>
      }
      bottomBar={
        <BottomActionButton
          className="btn btn-primary"
          disabled={!selectedSong || requestSent.inProgress}
          onClick={sendRequestHandler}
        >
          {t('Pages.MakeASongRequestPage.bottomAction')}
        </BottomActionButton>
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
      <SongRequestProgressDialog isOpen={requestSent.data} />
    </PageLayout>
  );
}
