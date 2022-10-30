import Spinner from "@/components/atoms/Spinner";
import { Router } from "@/core/core-router";
import mainRoutes from "@/routes/main.routes";
import UserType from "@/types/UserType";

export default function RootLayout() {
  const userType: UserType = "registered";
  return (
    <Router
      loadingElement={
        <div className="_layout _layout--center">
          <Spinner color="primary" />
        </div>
      }
      routes={mainRoutes(userType)}
    />
  );
}
