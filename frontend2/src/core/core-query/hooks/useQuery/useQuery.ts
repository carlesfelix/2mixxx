import useSWR from "swr";
import { UseQueryOptions, UseQueryReturn } from "./types";

export default function useQuery<Data>(
  key: string,
  options: UseQueryOptions<Data> = {}
): UseQueryReturn<Data> {
  const { defaultData, ...fetcherDeps } = options;
  const { data, error, isValidating, mutate } = useSWR([key, fetcherDeps]);
  return {
    state: {
      data: data || defaultData,
      inProgress: !error && !data,
      error,
      isValidating,
    },
    mutate,
  };
}
