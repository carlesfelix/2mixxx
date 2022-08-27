import { useContext } from "react";
import RoomSessionContext from "./RoomSessionContext";

export default function useRoomSession() {
  const context = useContext(RoomSessionContext);
  if (context === undefined) {
    throw new Error('useRoomSession must be used within a RoomSessionProvider');
  }
  return context;
}
