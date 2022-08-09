import { ReactNode } from "react";
import { Socket } from "socket.io-client";
import AsyncState from "../../types/AsyncState";
import SongRequest from "../../types/SongRequest";

export type SongRequestItem = {
  request: SongRequest;
  deleteInProgress: boolean;
};

export type State = AsyncState<SongRequestItem[]>;

export type RoomSessionProviderProps = {
  children: ReactNode;
  mainSocket: Socket;
};

export type RoomSessionContext = {
  songRequests: State;
};
