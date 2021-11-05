import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';
import { CLIENT__GET_SONG_REQUESTS } from '../../constants/client-socket-actions';
import { SERVER__NEW_SONG_REQUEST } from '../../constants/server-socket-actions';
import mainSocket from '../../services/main-socket';
import SongRequestQueue from './components/SongRequestQueue';
import './SongRequestsPage.scss';

export default function SongRequestsPage() {
  // const { songRequestsSocket } = useSockets();
  // const [ songs, setSongs ] = useState<Song[]>([]);
  // const [ deleteInProgress, setDeleteInProgress ] = useState<boolean>(false);
  // const [ fetchInProgress, setFetchInProgress ] = useState<boolean>(false);
  // useEffect(() => {
  //   getAllSongRequests();
  //   const removeListeners = updateSongsFromSocket(songRequestsSocket, setSongs);
  //   return () => {
  //     removeListeners();
  //   };
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [songRequestsSocket]);
  // function getAllSongRequests(): void {
  //   setFetchInProgress(true);
  //   songRequestsSocket.emit('getAllSongRequests', getAllSongRequestsACK);
  // }
  // function getAllSongRequestsACK(songList: Song[]): void {
  //   setSongs(songList);
  //   setFetchInProgress(false);
  // }
  // function deleteSongHandler(song: Song): void {
  //   deleteSongRequest(song);
  // }
  // function deleteSongRequest(song: Song): void {
  //   setDeleteInProgress(true);
  //   const { id } = song;
  //   songRequestsSocket.emit('deleteSongRequest', { id }, () => {
  //     setDeleteInProgress(false);
  //     setSongs((old: Song[]) => old.filter(({ id: songId }) => id !== songId));
  //   });
  // }
  useEffect(() => {
    setTimeout(() => {
      mainSocket.on(SERVER__NEW_SONG_REQUEST, res => {
        console.log(res);
      });
      mainSocket.emitWithAck({ event: CLIENT__GET_SONG_REQUESTS }).then(res => {
        console.log('res', res);
      }).catch(err => console.log('err', err));
    }, 5000);
  }, []);

  return (
    <PageLayout toolbarTitle="Pending songs">
      <div className="SongRequestsPage page-content">
        <SongRequestQueue songs={[]} onDeleteSong={() => {}} />
        <Link
          className="btn btn-primary btn-round btn-make-song-request"
          to="/make-a-song-request"
        >
          Make a song request
        </Link>
      </div>
    </PageLayout>
  );
}