import Spinner from "@/components/atoms/Spinner";
import ControlPanelLayout from "@/components/layout/ControlPanelLayout";
import { Router } from "@/core/core-router";
import registeredUserMainRoutes from "@/routes/registered-user-main.routes";

export default function RegisteredUserMainPage() {
  return (
    <ControlPanelLayout>
      <Router
        loadingElement={
          <div className="_layout _layout--center">
            <Spinner color="primary" />
          </div>
        }
        routes={registeredUserMainRoutes()}
      />
    </ControlPanelLayout>
  );
}
