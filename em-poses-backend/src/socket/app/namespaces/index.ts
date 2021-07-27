import { Server } from 'socket.io';
import SongRequestsNsp from './song-requests';
import { INamespaceDef } from './types';

const namespaceDefs: INamespaceDef[] = [
  SongRequestsNsp
];

export default function app(io: Server): void {
  namespaceDefs.forEach(namespaceDef => {
    const nsp = namespaceDef.buildNamespace(io);
    if (namespaceDef.registerMiddlewares) {
      namespaceDef.registerMiddlewares(nsp);
    }
    nsp.on('connection', socket => {
      if (namespaceDef.onConnection) {
        namespaceDef.onConnection(nsp, socket);
      }
    });
  });
}
