import { Server } from "socket.io";
import moderateRoomsNsp from "./moderate-rooms";
import songRequestsNsp from "./song-requests";

export default function namespaces(io: Server): void {
  moderateRoomsNsp(io);
  songRequestsNsp(io);
}
