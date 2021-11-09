import InteractorError, { InteractorErrorCodeEnum } from '../../services/InteractorError';
import UserAuth from '../../types/UserAuth';

type Props = {
  userAuth: UserAuth;
  permissions: string [];
  userType?: UserAuth['type'],
  next: (err?: InteractorError) => void;
}
export default function userHasSomePermission(
  props: Props
): void {
  const { userAuth, permissions, userType, next } = props;
  const hasPermission = !!userAuth &&
    (userType === undefined || userAuth.type === userType) &&
    userAuth.permissions.some(
      userPermission => permissions.includes(userPermission)
    );
  next(
    hasPermission ?
      undefined : new InteractorError(InteractorErrorCodeEnum.ACCESS_DENIED)
  );
}
