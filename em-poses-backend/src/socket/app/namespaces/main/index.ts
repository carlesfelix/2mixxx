import { Namespace, Server } from 'socket.io';
import songRequestListeners from './listeners/song-request.listeners';
import getUserAuth from '../../../../core/interactors/auth/getUserAuth';
function MainNsp(io: Server): Namespace {
  const mainNamespace = io.of('/');
  mainNamespace.use((socket, next) => {
    const { auth } = socket.handshake;
    const { userType, authorization } = auth;
    if (typeof userType === 'string' && typeof authorization === 'string') {
      console.log('entra1', userType, authorization)
      getUserAuth(userType, authorization).then(userAuth => {
        socket.data.auth = userAuth;
        next();
      }).catch(() => {
        socket.disconnect();
      });
    } else {
      socket.disconnect();
    }
  });
  mainNamespace.on('connection', socket => {
    songRequestListeners(socket);
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
