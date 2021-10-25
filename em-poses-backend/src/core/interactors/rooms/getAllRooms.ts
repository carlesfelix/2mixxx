import dataSourcesConfig from '../../constants/data-sources.config';
import RoomEntity from '../../types/RoomEntity';
import IRoomsRepository from '../../repositories/IRoomsRepository';

const interactorFn = (roomRepo: IRoomsRepository) => (): Promise<RoomEntity[]> => {
  return roomRepo.getAllRooms();
};
export default interactorFn(dataSourcesConfig.room);