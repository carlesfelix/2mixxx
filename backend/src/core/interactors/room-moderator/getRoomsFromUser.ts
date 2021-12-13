
import dataSourcesConfig from '../../constants/data-sources.config';
import IRoomModeratorRepository from '../../repositories/IRoomModeratorRepository';
import InteractorError, { InteractorErrorCodeEnum } from '../../services/InteractorError';
import RoomEntity from '../../types/RoomEntity';
import { RegisteredUserAuth } from '../../types/UserAuth';

const getRoomsFromUserFn = (
  roomModeratorRepo: IRoomModeratorRepository
) => async (registeredUser: RegisteredUserAuth): Promise<RoomEntity[]> => {
  const roomModerators = await roomModeratorRepo.getRoomModeratorsByUserId(
    registeredUser.user.id!
  );
  if (roomModerators) {
    return roomModerators.map(({ room }) => room!);
  }
  throw new InteractorError(InteractorErrorCodeEnum.ACCESS_DENIED);
};

const getRoomsFromUserInteractor = getRoomsFromUserFn(dataSourcesConfig.roomModerator);
export default getRoomsFromUserInteractor;
