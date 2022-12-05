import { CreateQueryHookProps } from "./types";

export default function createQueryHook<
  HookArgs extends any[] = [],
  HookReturn = any
>(props: CreateQueryHookProps<HookArgs, HookReturn>): (...args: HookArgs) => HookReturn {
  const { environment, hookFactory } = props;
  const hookFactoryItem = hookFactory.find(
    each => each.environments.includes(environment)
  );
  if (hookFactoryItem === undefined) {
    throw new Error(`Hook for environment ${environment} does not exist`);
  }
  return hookFactoryItem.hook;
}