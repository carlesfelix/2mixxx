import dataSourcesConfig from '../../constants/data-sources.config';
import IRoomEntity from '../../entities/IRoomEntity';
import IRoomsRepository from '../../repositories/IRoomsRepository';

const interactorFn = (roomRepo: IRoomsRepository) => (): Promise<IRoomEntity[]> => {
  return roomRepo.getAllRooms();
};
export default interactorFn(dataSourcesConfig.room);