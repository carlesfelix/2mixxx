import Routing from "../../components/Routing";
import getGuestRoutes from "../../routes/guest"
import LoadingPage from "../LoadingPage";

export default function GuestRootPage() {
  const routes = getGuestRoutes();
  return (
    <Routing routes={routes} loadingElement={<LoadingPage />} />
  );
}
