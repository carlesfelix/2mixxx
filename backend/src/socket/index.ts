import { config } from 'dotenv';
import { resolve } from 'path';
config({ path: resolve(__dirname, '../../.env') });

import http from 'http';
import { Server, ServerOptions } from 'socket.io';
import environment from '../environment';
import app from './app/namespaces';

const httpServer = http.createServer();

const socketSeverOpts: Partial<ServerOptions> = {};

if (environment.SOCKET_CORS_ORIGIN) {
  socketSeverOpts.cors = {
    origin: environment.SOCKET_CORS_ORIGIN
  };
}

const io = new Server(httpServer, socketSeverOpts);

app(io);

httpServer.listen(environment.SOCKET_PORT, () => {
  console.log(`Socket running on port ${environment.SOCKET_PORT}`);
});
