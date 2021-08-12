import { ISongEntity } from '../entities/ISongEntity';

export default interface ISongRepository {
  importSongsToLibrary(tracks: ISongEntity[]): Promise<void>;
  removeSongsFromLibrary(libraryId: string): Promise<void>
  searchSongsFromLibrary(libraryId: string, query: string): Promise<ISongEntity[]>;
}
