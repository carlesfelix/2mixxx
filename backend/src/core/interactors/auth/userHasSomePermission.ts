import { AnyUserAuth } from '../../types/UserAuth';

type Props = {
  anyUser?: AnyUserAuth;
  permissions: string[];
}
export default function userHasSomePermission(
  props: Props
): boolean {
  const { anyUser, permissions } = props;
  return !!anyUser && !!anyUser.permissions && anyUser.permissions.some(
    userPermission => permissions.includes(userPermission)
  );
}
