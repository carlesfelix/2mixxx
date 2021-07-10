import { ITrackEntity } from '../entities/ITrackEntity';

export default interface ILibraryRepository {
  importTracks(tracks: ITrackEntity[]): Promise<void>;
  searchTracks(query: string): Promise<ITrackEntity[]>;
}
