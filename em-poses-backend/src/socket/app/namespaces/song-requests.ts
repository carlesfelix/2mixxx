import { INamespaceDef } from './types';

let songs = [
  {
    id: 1,
    name: 'Song 1 from socket',
    artist: 'Artist 1'
  },
  {
    id: 2,
    name: 'Song 2 from socket',
    artist: 'Artist 2'
  },
  {
    id: 3,
    name: 'Song 3 from socket',
    artist: 'Artist 3'
  },
  {
    id: 4,
    name: 'Song 4 from socket',
    artist: 'Artist 4'
  },
];

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
    socket.join('room');
    console.log(socket.handshake.auth)
    socket.on('getAllSongRequests', res => {
      res(songs);
    });
    socket.on('deleteSongRequest', (payload, res) => {
      const { id } = payload;
      songs = songs.filter(({ id: songId }) => id !== songId);
      socket.to('room').emit('onDeleteSongRequest', { id });
      res();
    });
    socket.on('addSongRequest', () => {
      console.log('addSong');
    });
  }
};

export default SongRequests;
