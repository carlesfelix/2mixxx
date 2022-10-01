import { Router } from "@/core/core-router";
import noUserMainRoutes from "@/routes/no-user-main.routes";

export default function NoUserMainPage() {
  return (
    <div className="NoUserMainPage">
      <Router
        routes={noUserMainRoutes()}
      />
    </div>
  );
}
