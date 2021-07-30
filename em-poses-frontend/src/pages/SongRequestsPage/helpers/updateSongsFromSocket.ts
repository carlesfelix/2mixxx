import { Dispatch, SetStateAction } from 'react';
import { Socket } from 'socket.io-client';
import { ITrack } from '../../../models/ITrack';

export default function updateSongsFromSocket(socket: Socket, setSongs: Dispatch<SetStateAction<ITrack[]>>): () => void {
  function addSongRequestHandler(song: ITrack): void {
    setSongs(old => [ ...old, song ]);
  }
  function deleteSongRequestHandler({ id }: { id: number }): void {
    setSongs((old: ITrack[]) => old.filter(({ id: songId }) => id !== songId));
  }
  socket.on('onAddSongRequest', addSongRequestHandler);
  socket.on('onDeleteSongRequest', deleteSongRequestHandler);
  return () => {
    socket.off('onAddSongRequest', addSongRequestHandler);
    socket.off('onDeleteSongRequest', deleteSongRequestHandler);
  };
}
