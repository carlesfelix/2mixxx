import environment from '../../../environment';
import dataSourcesConfig from '../../constants/data-sources.config';
import { roomUserPermissions } from '../../constants/user-roles';
import IRoomUserRepository from '../../repositories/IRoomUserRepository';
import InteractorError, { InteractorErrorCodeEnum } from '../../services/InteractorError';
import { getBearerToken, verifyToken } from '../../services/jwt';
import UserAuth from '../../types/UserAuth';

const interactorFn = (roomUserRepo: IRoomUserRepository) => async (
  userType: string,
  token: string
): Promise<UserAuth> => {
  const bearerToken = getBearerToken(token);

  if (!bearerToken) {
    throw new InteractorError(InteractorErrorCodeEnum.UNAUTHORIZED);
  }
  
  if (userType === 'roomUser') {
    let tokenPayload;
    try {
      tokenPayload = await verifyToken(
        environment.JWT_ROOM_USERS_SECRET,
        bearerToken
      );
    } catch {
      throw new InteractorError(InteractorErrorCodeEnum.UNAUTHORIZED);
    }
    if (!tokenPayload || !tokenPayload.sub) {
      throw new InteractorError(InteractorErrorCodeEnum.GENERIC);
    }
    const roomUser = await roomUserRepo.getUserById(tokenPayload.sub);
    if (!roomUser) {
      throw new InteractorError(InteractorErrorCodeEnum.ACCESS_DENIED);
    }
    return {
      type: 'roomUser',
      user: roomUser,
      permissions: roomUserPermissions
    };
  }
  // if (userType === 'user') {

  // }
  throw new InteractorError(InteractorErrorCodeEnum.UNAUTHORIZED);
};

const getUserAuth = interactorFn(dataSourcesConfig.roomUser);

export default getUserAuth;
