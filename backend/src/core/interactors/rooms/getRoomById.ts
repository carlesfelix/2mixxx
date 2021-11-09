import dataSourcesConfig from '../../constants/data-sources.config';
import RoomEntity from '../../types/RoomEntity';
import IRoomsRepository from '../../repositories/IRoomsRepository';
import InteractorError, { InteractorErrorCodeEnum } from '../../services/InteractorError';

const interactorFn = (roomRepo: IRoomsRepository) => async (roomId: string): Promise<RoomEntity> => {
  const room = await roomRepo.getRoomById(roomId);
  if (!room) {
    throw new InteractorError(InteractorErrorCodeEnum.ENTITY_NOT_FOUND);
  }
  return room;
};
export default interactorFn(dataSourcesConfig.room);
