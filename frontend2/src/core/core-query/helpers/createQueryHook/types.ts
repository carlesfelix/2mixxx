export interface HookFactoryItem<
  HookArgs extends unknown[] = [],
  HookReturn = unknown
> {
  environments: string[]
  hook: (...args: HookArgs) => HookReturn
}

export interface CreateQueryHookProps<
  HookArgs extends unknown[] = [],
  HookReturn = unknown
> {
  environment: string
  hookFactory: Array<HookFactoryItem<HookArgs, HookReturn>>
}
