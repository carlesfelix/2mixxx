import dataSourcesConfig from "../../constants/data-sources.config";
import { ITrackEntity } from "../../entities/ITrackEntity";
import ILibraryRepository from "../../repositories/ILibraryRepository";

const interactorFn = (libraryRepo: ILibraryRepository) => async (query: string): Promise<ITrackEntity[]> => {
  return libraryRepo.searchTracks(query);
};
export default interactorFn(dataSourcesConfig.library);