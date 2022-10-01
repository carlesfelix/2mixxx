import { Router } from "@/core/core-router";
import mainRoutes from "@/routes/main.routes";
import UserType from "@/types/UserType";

export default function RootLayout() {
  const userType: UserType = "none";
  return (
    <div className="RootLayout">
      <Router routes={mainRoutes(userType)} />
    </div>
  );
}
