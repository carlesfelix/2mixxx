import dataSourcesConfig from '../../constants/data-sources.config';
import IRegisteredUserRepository from '../../repositories/IRegisteredUserRepository';
import InteractorError, { InteractorErrorCodeEnum } from '../../services/InteractorError';
import RoomEntity from '../../types/RoomEntity';
import { RegisteredUserAuth } from '../../types/UserAuth';

const getMyRoomFn = (
  roomRepo: IRegisteredUserRepository
) => async (
  registeredUser: RegisteredUserAuth,
  roomId: string
): Promise<RoomEntity> => {
  const roomModerator = await roomRepo.getUserRoom(
    registeredUser.user.id!,
    roomId
  );
  if (!roomModerator) {
    throw new InteractorError(InteractorErrorCodeEnum.ACCESS_DENIED);
  }
  return roomModerator.room!;
};

const getMyRoomInteractor = getMyRoomFn(dataSourcesConfig.registeredUser);
export default getMyRoomInteractor;
