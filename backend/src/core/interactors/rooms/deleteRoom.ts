import dataSourcesConfig from "../../constants/data-sources.config";
import IRoomsRepository from "../../repositories/IRoomsRepository";
import InteractorError, { InteractorErrorCodeEnum } from "../../services/InteractorError";

const deleteRoomInteractor = (roomRepo: IRoomsRepository) => async (roomId: string): Promise<void> => {
  const deleteCount = await roomRepo.deleteRoom(roomId);
  if (!deleteCount) {
    throw new InteractorError(InteractorErrorCodeEnum.ENTITY_NOT_FOUND);
  }
};
export default deleteRoomInteractor(dataSourcesConfig.room);
