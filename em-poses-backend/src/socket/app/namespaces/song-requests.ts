import { INamespaceDef } from './types';

const SongRequests: INamespaceDef = {
  buildNamespace: io => {
    console.log('build namespace')
    return io.of('/song-requests');
  },
  registerMiddlewares: nsp => {
    console.log('registerMid', nsp.name);
  },
  onConnection: (nsp, socket) => {
    console.log('onConnection');
    socket.on('addSong', () => {
      console.log('addSong');
    });
  }
};

export default SongRequests;
