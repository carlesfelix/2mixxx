import Routing from "../../components/Routing";
import RoomSessionProvider from "../../contexts/room-session/RoomSessionProvider";
import environment from "../../environment";
import useSocketConnectionManager from "../../hooks/useSocketConnectionManager";
import getRoomRoutes from "../../routes/room";
import LoadingPage from "../LoadingPage";
import { RoomRootPageProps } from "./types";

export default function RoomRootPage(props: RoomRootPageProps) {
  const { roomUser } = props;
  const routes = getRoomRoutes({ roomUser });
  const mainSocket = useSocketConnectionManager(
    environment.REACT_APP_SOCKET_BASE_URI
  );
  return (
    <RoomSessionProvider mainSocket={mainSocket}>
      <Routing routes={routes} loadingElement={<LoadingPage />} />
    </RoomSessionProvider>
  );
}
