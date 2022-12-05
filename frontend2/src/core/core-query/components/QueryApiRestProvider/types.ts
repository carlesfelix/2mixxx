import { IHttp } from "@/core/core-http";
import { ReactNode } from "react";

export type QueryApiRestProviderProps = {
  children: ReactNode;
  http: IHttp;
};
