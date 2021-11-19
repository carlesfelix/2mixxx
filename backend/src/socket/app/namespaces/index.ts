import { Server } from 'socket.io';
import MainNsp from './main';
import ModerateRoomsNsp from './moderate-rooms';

export default function app(io: Server): void {
  MainNsp(io);
  ModerateRoomsNsp(io);
}
