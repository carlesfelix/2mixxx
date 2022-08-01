import Routing from "../../components/Routing";
import getRoomRoutes from "../../routes/room";
import LoadingPage from "../LoadingPage";
import { RoomRootPageProps } from "./types";

export default function RoomRootPage(props: RoomRootPageProps) {
  const { roomUser } = props;
  const routes = getRoomRoutes({ roomUser });
  return (
    <Routing routes={routes} loadingElement={<LoadingPage />} />
  );
}
