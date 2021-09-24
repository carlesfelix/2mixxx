import dataSourcesConfig from "../../constants/data-sources.config";
import IRoomEntity from "../../entities/IRoomEntity";
import IRoomsRepository from "../../repositories/IRoomsRepository";
import { getRandomCode } from "../../services/utils";

const createRoomInteractor = (roomRepo: IRoomsRepository) => async (): Promise<IRoomEntity> => {
  const room: IRoomEntity = { allowSongRequests: false, code: getRandomCode() };
  const createdRoom = await roomRepo.createRoom(room);
  return createdRoom;
};
export default createRoomInteractor(dataSourcesConfig.room);
