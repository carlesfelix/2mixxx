import dataSourcesConfig from '../../constants/data-sources.config';
import IRoomEntity from '../../entities/IRoomEntity';
import IRoomsRepository from '../../repositories/IRoomsRepository';
import InteractorError from '../../services/InteractorError';

const interactorFn = (roomRepo: IRoomsRepository) => async (roomId: string): Promise<IRoomEntity> => {
  const room = await roomRepo.getRoomById(roomId);
  if (!room) {
    throw new InteractorError(InteractorError.Codes.ENTITY_NOT_FOUND);
  }
  return room;
};
export default interactorFn(dataSourcesConfig.room);
