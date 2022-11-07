import { createContext } from "react";
import { AclContextValue } from "./types";

export const ACL_CONTEXT = createContext<AclContextValue | undefined>(undefined);
