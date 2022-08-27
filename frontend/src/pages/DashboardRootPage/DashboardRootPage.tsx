import Routing from "../../components/Routing";
import getRegisteredRoutes from "../../routes/registered";
import LoadingPage from "../LoadingPage";
import { DashboardRootPageProps } from "./types";

export default function DashboardRootPage(props: DashboardRootPageProps) {
  const { registeredUser } = props;
  const routes = getRegisteredRoutes({ registeredUser });
  return (
    <Routing routes={routes} loadingElement={<LoadingPage />} />
  );
}
