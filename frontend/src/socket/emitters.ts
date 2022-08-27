import { Socket } from 'socket.io-client';
import {
  CLIENT__ADD_SONG_REQUEST,
  CLIENT__DELETE_SONG_REQUEST,
  CLIENT__GET_SONG_REQUESTS
} from '../constants/client-socket-actions';
import { emitWithAckPromise } from '../helpers/socket';
import SocketReponse from '../types/SocketResponse';
import SongRequest from '../types/SongRequest';

export async function emitNewSongRequest(
  socket: Socket, songId: string
): Promise<SocketReponse<SongRequest>> {
  const data = await emitWithAckPromise<SongRequest>(
    socket,
    CLIENT__ADD_SONG_REQUEST,
    { songId }
  );
  return data;
}

export async function emitGetSongRequests(socket: Socket): Promise<SocketReponse<SongRequest[]>> {
  const data = await emitWithAckPromise<SongRequest[]>(
    socket,
    CLIENT__GET_SONG_REQUESTS
  );
  return data;
}

export async function emitDeleteSongRequest(
  socket: Socket, songRequestId: string
): Promise<SocketReponse<SongRequest[]>> {
  const data = await emitWithAckPromise<SongRequest[]>(
    socket,
    CLIENT__DELETE_SONG_REQUEST,
    { songRequestId }
  );
  return data;
}
