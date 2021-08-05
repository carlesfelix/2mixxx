import { Dispatch, SetStateAction } from 'react';
import { Socket } from 'socket.io-client';
import Song from '../../../types/Song';

export default function updateSongsFromSocket(socket: Socket, setSongs: Dispatch<SetStateAction<Song[]>>): () => void {
  function addSongRequestHandler(song: Song): void {
    setSongs(old => [ ...old, song ]);
  }
  function deleteSongRequestHandler({ id }: { id: number }): void {
    setSongs((old: Song[]) => old.filter(({ id: songId }) => id !== songId));
  }
  socket.on('onAddSongRequest', addSongRequestHandler);
  socket.on('onDeleteSongRequest', deleteSongRequestHandler);
  return () => {
    socket.off('onAddSongRequest', addSongRequestHandler);
    socket.off('onDeleteSongRequest', deleteSongRequestHandler);
  };
}
