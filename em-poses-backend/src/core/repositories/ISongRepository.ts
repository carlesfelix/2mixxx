import SongEntity from '../types/SongEntity';

export default interface ISongRepository {
  importSongsToLibrary(tracks: SongEntity[]): Promise<void>;
  removeSongsFromLibrary(libraryId: string): Promise<number>
  searchSongsFromLibraries(libraries: string[], query: string): Promise<SongEntity[]>;
}
