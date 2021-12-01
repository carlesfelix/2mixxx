import { BaseUserAuth } from '../../types/UserAuth';

type Props = {
  anyUser?: BaseUserAuth;
  permissions: string [];
}
export default function userHasSomePermission(
  props: Props
): boolean {
  const { anyUser, permissions } = props;
  return !!anyUser && anyUser.permissions.some(
    userPermission => permissions.includes(userPermission)
  );
}
