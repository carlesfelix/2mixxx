import Spinner from "@/components/atoms/Spinner";
import { Router } from "@/core/core-router";
import noUserMainRoutes from "@/routes/no-user-main.routes";

export default function NoUserMainPage() {
  return (
    <div className="NoUserMainPage">
      <Router
        loadingElement={
          <div className="_layout _layout--center">
            <Spinner color="primary" />
          </div>
        }
        routes={noUserMainRoutes()}
      />
    </div>
  );
}
