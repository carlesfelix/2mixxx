import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';
import { emitGetSongRequests } from '../../socket/song-requests/emitters';
import { useNewSongRequest } from '../../socket/song-requests/listeners';
import SongRequest from '../../types/SongRequest';
import SongRequestQueue from './components/SongRequestQueue';
import './SongRequestsPage.scss';

export default function SongRequestsPage() {
  const [ songRequests, setSongRequests ] = useState<SongRequest[]>([]);
  const newSongRequest = useNewSongRequest();
  useEffect(() => {
    if (newSongRequest.data) {
      setSongRequests(old => [ ...old, newSongRequest.data! ]);
    }
  }, [ newSongRequest ]);
  useEffect(() => {
    emitGetSongRequests().then(res => {
      setSongRequests(res.data)
    }).catch(err => console.log('err', err));
  }, []);

  return (
    <PageLayout toolbarTitle="Pending songs" className="SongRequestsPage">
      <div className="page-content">
        <SongRequestQueue songRequests={songRequests} onDeleteSong={() => {}} />
      </div>
      <Link
        className="btn btn-primary btn-round btn-make-song-request"
        to="/make-a-song-request"
      >
        Request a song
      </Link>
    </PageLayout>
  );
}