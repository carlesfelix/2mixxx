import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import SocketConnectionStatus from "../types/SocketConnectionStatus";

export default function useSocketConnectionStatus(socket: Socket): SocketConnectionStatus {
  const [ status, setStatus ] = useState<SocketConnectionStatus>({
    connected: !!socket?.connected
  });
  useEffect(() => {
    function connectHandler(): void {
      setStatus({
        connected: true,
        error: undefined
      });
    }
    function disconnectHandler(): void {
      setStatus(old => ({
        ...old,
        connected: false
      }));
    }
    function errorHandler(error: Error): void {
      setStatus({
        connected: false,
        error: error.message
      });
    }
    if (socket) {
      socket.on('connect', connectHandler);
      socket.on('disconnect', disconnectHandler);
      socket.on("connect_error", errorHandler);
    }
    return () => {
      if (socket) {
        socket.off('connect', connectHandler);
        socket.off('disconnect', disconnectHandler);
        socket.off("connect_error", errorHandler);
      }
    }
  }, [ socket ]);
  return status;
}
