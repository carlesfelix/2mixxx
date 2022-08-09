import { createContext } from "react";
import { RoomSessionContext as TRoomSessionContext } from "./types";

const RoomSessionContext = createContext<
  TRoomSessionContext
>({
  songRequests: {
    data: [],
    error: false,
    inProgress: false
  }
});

export default RoomSessionContext;
