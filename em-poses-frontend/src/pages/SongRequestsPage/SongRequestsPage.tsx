import { Link } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';
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

  return (
    <PageLayout toolbarTitle="Pending songs">
      <div className="SongRequestsPage">
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