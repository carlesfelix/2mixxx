import dataSourcesConfig from "../../constants/data-sources.config";
import IRoomsRepository from "../../repositories/IRoomsRepository";
import InteractorError from "../../services/InteractorError";

const deleteLibraryFromRoomInteractor = (
  roomRepo: IRoomsRepository
) => async (
  roomId: string, libraryId: string
): Promise<void> => {
  const deleteCount = await roomRepo.deleteLibraryFromRoom(roomId, libraryId);
  if (!deleteCount) {
    throw new InteractorError(InteractorError.Codes.ENTITY_NOT_FOUND);
  }
};
export default deleteLibraryFromRoomInteractor(dataSourcesConfig.room);
