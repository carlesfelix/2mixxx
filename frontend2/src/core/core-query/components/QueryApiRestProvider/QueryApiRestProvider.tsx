import { HttpRequestOptions } from "@/core/core-http";
import { SWRConfig } from "swr";
import { QueryApiRestProviderProps } from "./types";

export default function QueryApiRestProvider(props: QueryApiRestProviderProps) {
  const { children, http } = props;
  return (
    <SWRConfig value={{
      fetcher: (
        url: string,
        options?: HttpRequestOptions
      ) => http.get(url, options).then(res => res.data)
    }}>
      {children}
    </SWRConfig>
  );
}
