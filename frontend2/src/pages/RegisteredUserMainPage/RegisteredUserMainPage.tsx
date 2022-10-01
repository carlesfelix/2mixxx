import { Router } from "@/core/core-router";
import registeredUserMainRoutes from "@/routes/registered-user-main.routes";

export default function RegisteredUserMainPage() {
  return (
    <Router
      routes={registeredUserMainRoutes()}
    />
  );
}
