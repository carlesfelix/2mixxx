import { HttpRequestOptions } from "@/core/core-http";
import { SWRConfig } from "swr";
import { QueryProviderProps } from "./types";

export default function QueryProvider(props: QueryProviderProps) {
  const { children, http, httpMethod = "get" } = props;
  return (
    <SWRConfig value={{
      fetcher: (
        url: string,
        options?: HttpRequestOptions
      ) => http[httpMethod](url, options).then(res => res.data)
    }}>
      {children}
    </SWRConfig>
  );
}
