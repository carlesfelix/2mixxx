import { ReactNode } from "react";
import { Socket } from "socket.io-client";
import AsyncState from "../../types/AsyncState";
import SocketConnectionStatus from "../../types/SocketConnectionStatus";
import SongRequest from "../../types/SongRequest";

export type SongRequestItem = {
  request: SongRequest;
  deleteInProgress: boolean;
};

export type SongRequests = AsyncState<SongRequestItem[]>;

export type RoomSessionProviderProps = {
  children: ReactNode;
  mainSocket: Socket;
};

export type RoomSessionContext = {
  songRequests: SongRequests;
  connectionStatus: SocketConnectionStatus;
  sendNewRequest: (songId: string) => void;
  confirmNewRequestSent: () => void;
  sendNewRequestStatus: SendNewRequestStatus;
};

export type SendNewRequestStatus = AsyncState<{
  newRequestConfirmed: boolean
}>;
