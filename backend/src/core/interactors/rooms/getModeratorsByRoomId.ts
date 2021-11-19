
import dataSourcesConfig from '../../constants/data-sources.config';
import IRoomsRepository from '../../repositories/IRoomsRepository';
import RoomModeratorEntity from '../../types/RoomModeratorEntity';

const interactorFn = (
  roomRepo: IRoomsRepository
) => async (roomId: string): Promise<RoomModeratorEntity[]> => {
  const data = await roomRepo.getModeratorsByRoomId(roomId);
  return data;
};

const getModeratorsByRoomId = interactorFn(dataSourcesConfig.room);
export default getModeratorsByRoomId;
