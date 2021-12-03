import environment from '../../../environment';
import dataSourcesConfig from '../../constants/data-sources.config';
import { adminPermissions, djPermissions, roomUserPermissions } from '../../constants/user-roles';
import IRegisteredUserRepository from '../../repositories/IRegisteredUserRepository';
import IRoomUserRepository from '../../repositories/IRoomUserRepository';
import InteractorError, { InteractorErrorCodeEnum } from '../../services/InteractorError';
import { getBearerToken, verifyAuth0Token, verifyToken } from '../../services/jwt';
import { BaseUserAuth } from '../../types/UserAuth';

const interactorFn = (
  roomUserRepo: IRoomUserRepository,
  registeredUserRepo: IRegisteredUserRepository
) => async (
  userType: string,
  token: string
): Promise<BaseUserAuth> => {
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
  if (userType === 'registeredUser') {
    let tokenPayload;
    try {
      tokenPayload = await verifyAuth0Token(bearerToken);
    } catch {
      throw new InteractorError(InteractorErrorCodeEnum.UNAUTHORIZED);
    }

    if (!tokenPayload || !tokenPayload.sub) {
      throw new InteractorError(InteractorErrorCodeEnum.GENERIC);
    }
    const registeredUser = await registeredUserRepo.getUserBySub(tokenPayload.sub);
    if (!registeredUser) {
      throw new InteractorError(InteractorErrorCodeEnum.ACCESS_DENIED);
    }
    return {
      type: 'registeredUser',
      user: registeredUser,
      permissions: registeredUser.role === 1 ? adminPermissions : djPermissions
    };
  }
  throw new InteractorError(InteractorErrorCodeEnum.UNAUTHORIZED);
};

const getUserAuth = interactorFn(
  dataSourcesConfig.roomUser,
  dataSourcesConfig.registeredUser
);

export default getUserAuth;
