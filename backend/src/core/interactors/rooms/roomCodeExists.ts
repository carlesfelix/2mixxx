import dataSourcesConfig from "../../constants/data-sources.config";
import IRoomsRepository from "../../repositories/IRoomsRepository";

const interactorFn = (roomRepo: IRoomsRepository) => async (
  code: string
): Promise<boolean> => {
  const room = await roomRepo.getRoomByCode(code);
  return !!room;
};
export default interactorFn(dataSourcesConfig.room);
