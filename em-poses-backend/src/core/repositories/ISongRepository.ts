import { ISongEntity } from '../types/SongEntity';

export default interface ISongRepository {
  importSongsToLibrary(tracks: ISongEntity[]): Promise<void>;
  removeSongsFromLibrary(libraryId: string): Promise<number>
  searchSongsFromLibrary(libraryId: string, query: string): Promise<ISongEntity[]>;
}
