import dataSourcesConfig from '../../constants/data-sources.config';
import IRoomsRepository from '../../repositories/IRoomsRepository';

const interactorFn = (
  roomModeratorRepo: IRoomsRepository
) => async (
  roomId: string, registeredUserId: string
): Promise<void> => {
  await roomModeratorRepo.addModeratorToRoom(roomId, registeredUserId);
};

const addModeratorToRoomInteractor = interactorFn(dataSourcesConfig.room);
export default addModeratorToRoomInteractor;
