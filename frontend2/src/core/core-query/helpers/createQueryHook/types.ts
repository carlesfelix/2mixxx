export type HookFactoryItem<
  HookArgs extends any[] = [],
  HookReturn = any
> = {
  environments: string[];
  hook: (...args: HookArgs) => HookReturn;
};

export type CreateQueryHookProps<HookArgs extends any[] = [], HookReturn = any> = {
  environment: string,
  hookFactory: HookFactoryItem<HookArgs, HookReturn>[];
};
