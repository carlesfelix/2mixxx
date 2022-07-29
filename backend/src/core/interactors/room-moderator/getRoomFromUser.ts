import dataSourcesConfig from '../../constants/data-sources.config';
import IRoomModeratorRepository from '../../repositories/IRoomModeratorRepository';
import InteractorError, { InteractorErrorCodeEnum } from '../../services/InteractorError';
import RoomEntity from '../../types/RoomEntity';
import { RegisteredUserAuth } from '../../types/UserAuth';

const getRoomFromUserFn = (
  roomModeratorRepo: IRoomModeratorRepository
) => async (
  registeredUser: RegisteredUserAuth,
  roomId: string
): Promise<RoomEntity> => {
  const roomModerator = await roomModeratorRepo.getRoomModerator(
    registeredUser.id!,
    roomId
  );
  if (!roomModerator) {
    throw new InteractorError(InteractorErrorCodeEnum.ACCESS_DENIED);
  }
  return roomModerator.room!;
};

const getRoomFromUserInteractor = getRoomFromUserFn(dataSourcesConfig.roomModerator);
export default getRoomFromUserInteractor;
