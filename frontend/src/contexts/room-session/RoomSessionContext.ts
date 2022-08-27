import { createContext } from "react";
import { RoomSessionContext as TRoomSessionContext } from "./types";

const RoomSessionContext = createContext<
  TRoomSessionContext | undefined
>(undefined);

export default RoomSessionContext;
