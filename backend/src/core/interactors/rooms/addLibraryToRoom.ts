import dataSourcesConfig from "../../constants/data-sources.config";
import IRoomsRepository from "../../repositories/IRoomsRepository";

const addLibraryToRoomInteractor = (
  roomRepo: IRoomsRepository
) => async (
  roomId: string, libraryId: string
): Promise<void> => {
  await roomRepo.addLibraryToRoom(
    roomId, libraryId
  );
};
export default addLibraryToRoomInteractor(dataSourcesConfig.room);
