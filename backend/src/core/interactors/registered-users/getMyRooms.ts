
import dataSourcesConfig from '../../constants/data-sources.config';
import IRegisteredUserRepository from '../../repositories/IRegisteredUserRepository';
import InteractorError, { InteractorErrorCodeEnum } from '../../services/InteractorError';
import RoomEntity from '../../types/RoomEntity';
import { RegisteredUserAuth } from '../../types/UserAuth';

const getMyRoomsFn = (
  roomRepo: IRegisteredUserRepository
) => async (registeredUser: RegisteredUserAuth): Promise<RoomEntity[]> => {
  const roomModerators = await roomRepo.getUserRooms(
    registeredUser.user.id!
  );
  if (!roomModerators) {
    throw new InteractorError(InteractorErrorCodeEnum.ACCESS_DENIED);
  }
  return roomModerators.rooms!;
};

const getMyRoomsInteractor = getMyRoomsFn(dataSourcesConfig.registeredUser);
export default getMyRoomsInteractor;
