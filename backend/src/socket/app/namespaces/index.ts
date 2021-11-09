import { Server } from 'socket.io';
import MainNsp from './main';

export default function app(io: Server): void {
  MainNsp(io);
}
