import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { searchSongs } from '../../api/songs';
import AsyncLayout from '../../components/AsyncLayout';
import InputText from '../../components/forms/inputs/InputText';
import RadioButtonCards from '../../components/forms/inputs/RadioButtonCards';
import PageLayout from '../../components/PageLayout';
import SongItem from '../../components/SongItem';
import { addSongRequest } from '../../socket/song-requests';
import AsyncState from '../../types/AsyncState';
import Song from '../../types/Song';
import SongRequestProgressDialog from './components/SongRequestProgressDialog';
import './MakeASongRequestPage.scss';

export default function MakeASongRequestPage() {
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
  function radioButtonCardsChangeHandler(itemValue: string): void {
    setSelectedSong(itemValue);
  }
  function sendRequestHandler(): void {
    setRequestSent({
      data: false, inProgress: true,
      error: false
    });
    addSongRequest(selectedSong).then(() => {
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
  return (
    <PageLayout toolbarTitle="Make a song request" toolbarLinkBack="/">
      <div className="MakeASongRequestPage">
        <div className="search-songs-form sub-toolbar">
          <div className="page-content">
            <InputText
              onChange={setQuery}
              value={query}
              extraProps={{ placeholder: 'Search songs', autoComplete: 'off' }}
              className="search-input"
            />
          </div>
        </div>
        <div className="page-content song-request-content">
          <AsyncLayout
            className="song-request-async"
            error={songs.error}
            inProgress={songs.inProgress}
          >
            {
              emptySearch && (
                <div className="empty-message-container">
                  <p>Start searching something in order to see results</p>
                </div>
              )
            }
            {
              resultsNotFound && (
                <div className="empty-message-container">
                  <p>Songs not found</p>
                </div>
              )
            }
            <RadioButtonCards
              onChange={radioButtonCardsChangeHandler}
              value={selectedSong}
              extraProps={{
                items: songs.data.map(song => ({
                  label: (
                    <SongItem song={song} />
                  ),
                  value: song.id
                }))
              }}
            />
          </AsyncLayout>
        </div>
        <div className="song-request-footer sub-toolbar">
          <div className="page-content">
            <button
              className="btn btn-primary"
              disabled={!selectedSong || requestSent.inProgress}
              onClick={sendRequestHandler}
            >
              Send request
            </button>
          </div>
        </div>
      </div>
      <SongRequestProgressDialog isOpen={requestSent.data} />
    </PageLayout>
  );
}
