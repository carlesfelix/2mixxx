import { useEffect, useState } from 'react';
import { useSockets } from '../../contexts/sockets';
import { ITrack } from '../../models/ITrack';
import SongRequestQueue from './components/SongRequestQueue';
import updateSongsFromSocket from './helpers/updateSongsFromSocket';

export default function SongRequestsPage() {
  const { songRequestsSocket } = useSockets();
  const [ songs, setSongs ] = useState<ITrack[]>([]);
  const [ deleteInProgress, setDeleteInProgress ] = useState<boolean>(false);
  const [ fetchInProgress, setFetchInProgress ] = useState<boolean>(false);
  useEffect(() => {
    getAllSongRequests();
    const removeListeners = updateSongsFromSocket(songRequestsSocket, setSongs);
    return () => {
      removeListeners();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [songRequestsSocket]);
  function getAllSongRequests(): void {
    setFetchInProgress(true);
    songRequestsSocket.emit('getAllSongRequests', getAllSongRequestsACK);
  }
  function getAllSongRequestsACK(songList: ITrack[]): void {
    setSongs(songList);
    setFetchInProgress(false);
  }
  function deleteSongHandler(song: ITrack): void {
    deleteSongRequest(song);
  }
  function deleteSongRequest(song: ITrack): void {
    setDeleteInProgress(true);
    const { id } = song;
    songRequestsSocket.emit('deleteSongRequest', { id }, () => {
      setDeleteInProgress(false);
      setSongs((old: ITrack[]) => old.filter(({ id: songId }) => id !== songId));
    });
  }

  return (
    <div className="SongRequestsPage">
      <SongRequestQueue songs={songs} onDeleteSong={deleteSongHandler} />
    </div>
  );
}