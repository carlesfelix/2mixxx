import dataSourcesConfig from "../../constants/data-sources.config";
import RoomEntity from "../../types/RoomEntity";
import IRoomsRepository from "../../repositories/IRoomsRepository";
import { getRandomCode } from "../../services/utils";
import { ROOM_CODE } from "../../constants/alphabets";

const createRoomInteractor = (roomRepo: IRoomsRepository) => async (): Promise<RoomEntity> => {
  const room: RoomEntity = {
    allowSongRequests: false,
    code: getRandomCode({ alphabet: ROOM_CODE, size: 6 })
  };
  const createdRoom = await roomRepo.createRoom(room);
  return createdRoom;
};
export default createRoomInteractor(dataSourcesConfig.room);
