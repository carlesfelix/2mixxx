import { Server } from "socket.io";
import namespaces from "./namespaces";

export default function app(io: Server): void {
  namespaces(io);
}

