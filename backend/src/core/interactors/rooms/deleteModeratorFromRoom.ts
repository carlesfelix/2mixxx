import dataSourcesConfig from '../../constants/data-sources.config';
import IRoomsRepository from '../../repositories/IRoomsRepository';
import InteractorError, { InteractorErrorCodeEnum } from '../../services/InteractorError';

const interactorFn = (
  roomModeratorRepo: IRoomsRepository
) => async (
  roomId: string, registeredUserId: string
): Promise<void> => {
  const deleteCount = await roomModeratorRepo.removeModeratorFromRoom(roomId, registeredUserId);
  if (!deleteCount) {
    throw new InteractorError(InteractorErrorCodeEnum.ENTITY_NOT_FOUND);
  }
};

const deleteModeratorFromRoom = interactorFn(dataSourcesConfig.room);
export default deleteModeratorFromRoom;
