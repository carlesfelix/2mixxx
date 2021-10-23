import dataSourcesConfig from '../../constants/data-sources.config';
import IRoomEntity from '../../entities/IRoomEntity';
import IRoomsRepository from '../../repositories/IRoomsRepository';
import InteractorError from '../../services/InteractorError';

const interactorFn = (roomRepo: IRoomsRepository) => async (roomId: string): Promise<IRoomEntity> => {
  const data = await roomRepo.getLibrariesFromRoom(roomId);
  if (!data) {
    throw new InteractorError(InteractorError.Codes.ENTITY_NOT_FOUND);
  }
  return data;
};
export default interactorFn(dataSourcesConfig.room);
