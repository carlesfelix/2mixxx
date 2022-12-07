import { HttpRequestOptions } from "@/core/core-http";

export type UseQueryOptions<Data> = HttpRequestOptions & {
  defaultData?: Data;
  httpData?: any;
};

export type UseQueryState<Data> = {
  inProgress: boolean;
  error?: any;
  data: Data;
  isValidating: boolean;
}

export type UseQueryReturn<Data = any> = {
  mutate: UseDataMutator<Data>;
  state: UseQueryState<Data>;
};

export type UseDataMutator<Data> = (data?: Data | Promise<Data> | MutatorCallback<Data>, opts?: boolean | MutatorOptions<Data>) => Promise<Data | undefined>;

export type MutatorCallback<Data = any> = (currentData?: Data) => Promise<undefined | Data> | undefined | Data;

export type MutatorOptions<Data = any> = {
  revalidate?: boolean;
  populateCache?: boolean | ((result: any, currentData: Data) => Data);
  optimisticData?: Data | ((currentData?: Data) => Data);
  rollbackOnError?: boolean;
};
