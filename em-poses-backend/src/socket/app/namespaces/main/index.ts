import { Namespace, Server } from 'socket.io';
import authMid from '../../middlewares/auth.mid';
import errorListeners from './listeners/error.listeners';
import songRequestListeners from './listeners/song-request.listeners';

function MainNsp(io: Server): Namespace {
  const mainNamespace = io.of('/');
  mainNamespace.use(authMid);
  mainNamespace.on('connection', socket => {
    songRequestListeners(socket);
    errorListeners(socket);
  });
  console.log('entra')
  // socket.on('deleteSongRequest', (payload, res) => {
  //   const { id } = payload;
  //   songs = songs.filter(({ id: songId }) => id !== songId);
  //   socket.to('room').emit('onDeleteSongRequest', { id });
  //   res();
  // });
  // console.log('onConnection');
  // socket.join('room');
  // console.log(socket.handshake.auth)
  // socket.on('getAllSongRequests', res => {
  //   res(songs);
  // });
  
  return mainNamespace;
}

export default MainNsp;
