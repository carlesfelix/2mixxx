import { useEffect, useState } from 'react';
import { searchSongs } from '../../api/songs';
import InputText from '../../components/forms/inputs/InputText';
import RadioButtonCards from '../../components/forms/inputs/RadioButtonCards';
import PageLayout from '../../components/PageLayout';
import SongItem from '../../components/SongItem';
import AsyncState from '../../types/AsyncState';
import Song from '../../types/Song';
import './MakeASongRequestPage.scss';

export default function MakeASongRequestPage() {
  const [ query, setQuery ] = useState<string>('');
  const [ selectedSong, setSelectedSong ] = useState<string>('');
  const [ songs, setSongs ] = useState<AsyncState<Song[]>>({
    data: [], inProgress: false, error: false
  });
  useEffect(() => {
    const queryTrim = query.trim();
    setSelectedSong('');
    if (queryTrim.length > 2) {
      setSongs({
        data: [],
        inProgress: true,
        error: false
      });
      searchSongs(queryTrim).then(data => {
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
  }, [ query ]);
  function radioButtonCardsChangeHandler(itemValue: string): void {
    setSelectedSong(itemValue);
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
        </div>
        <div className="song-request-footer sub-toolbar">
          <div className="page-content">
            <button className="btn btn-primary" disabled={!selectedSong}>
              Send request
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
