import { config } from 'dotenv';
import { resolve } from 'path';
config({ path: resolve(__dirname, '../../.env') });

import http from 'http';
import { Server } from 'socket.io';
import environment from '../environment';
import app from './app/namespaces';

const httpServer = http.createServer();

const io = new Server(httpServer, {
  perMessageDeflate: environment.NODE_ENV === 'development',
  cors: {
    allowedHeaders: ['Authorization'],
    origin: environment.SOCKET_CORS_ORIGIN
  }
});

app(io);

httpServer.listen(environment.SOCKET_PORT, () => {
  console.log(`Socket running on port ${environment.SOCKET_PORT}`);
});
