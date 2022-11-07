import { useContext } from "react";
import { ACL_CONTEXT } from "../constants";

export default function useAcl() {
  const context = useContext(ACL_CONTEXT);
  if (context === undefined) {
    throw new Error("useAcl must be used within an AclProvider");
  }
  return context;
}
