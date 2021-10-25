import environment from "../../../environment";
import dataSourcesConfig from "../../constants/data-sources.config";
import IRoomUserRepository from "../../repositories/IRoomUserRepository";
import InteractorError from "../../services/InteractorError";
import { getBearerToken, verifyToken } from "../../services/jwt";
import RoomUserEntity from "../../types/RoomUserEntity";
import UserAuth from "../../types/UserAuth";

const interactorFn = (roomUserRepo: IRoomUserRepository) => async (
  type: string,
  token: string
): Promise<UserAuth> => {
  const bearerToken = getBearerToken(token);

  if (!bearerToken) {
    throw new InteractorError(InteractorError.Codes.UNAUTHORIZED);
  }
  
  if (type === 'roomUser') {
    let tokenPayload;
    try {
      tokenPayload = await verifyToken(
        environment.JWT_ROOM_USERS_SECRET,
        bearerToken
      );
    } catch {
      throw new InteractorError(InteractorError.Codes.UNAUTHORIZED);
    }
    if (!tokenPayload || !tokenPayload.sub) {
      throw new InteractorError(InteractorError.Codes.GENERIC);
    }
    let roomUser: RoomUserEntity | null = null;
    try {
      roomUser = await roomUserRepo.getUserById(tokenPayload.sub);
    } catch {
      throw new InteractorError(InteractorError.Codes.GENERIC);
    }
    if (!roomUser) {
      throw new InteractorError(InteractorError.Codes.ACCESS_DENIED);
    }
    return { type: 'roomUser', user: roomUser };
  }
  // if (type === 'user') {

  // }
  throw new InteractorError(InteractorError.Codes.UNAUTHORIZED);
};

const getUserAuth = interactorFn(dataSourcesConfig.roomUser);

export default getUserAuth;
