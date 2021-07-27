import { Namespace, Server, Socket } from 'socket.io';

export interface INamespaceDef {
  buildNamespace: (io: Server) => Namespace;
  registerMiddlewares?: (nsp: Namespace) => void;
  onConnection?: (nsp: Namespace, socket: Socket) => void;
}
