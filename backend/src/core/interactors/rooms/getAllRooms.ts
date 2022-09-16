import dataSourcesConfig from '../../constants/data-sources.config';
import RoomEntity from '../../types/RoomEntity';
import IRoomsRepository from '../../repositories/IRoomsRepository';

const interactorFn = (
  roomRepo: IRoomsRepository
) => (registeredUserId: string): Promise<RoomEntity[]> => {
  return roomRepo.getAllRooms(registeredUserId);
};
export default interactorFn(dataSourcesConfig.room);