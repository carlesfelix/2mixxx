export type HookFactoryItem<
  HookArgs extends unknown[] = [],
  HookReturn = unknown
> = {
  environments: string[];
  hook: (...args: HookArgs) => HookReturn;
};

export type CreateQueryHookProps<
  HookArgs extends unknown[] = [],
  HookReturn = unknown
> = {
  environment: string,
  hookFactory: HookFactoryItem<HookArgs, HookReturn>[];
};
