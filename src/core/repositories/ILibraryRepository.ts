import { ITrackEntity } from '../entities/ITrackEntity';

export default interface ILibraryRepository {
  importLibraryFromItunes(songs: ITrackEntity[]): Promise<void>;
}
