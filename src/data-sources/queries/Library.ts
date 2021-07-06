import { ITrackEntity } from '../../core/entities/ITrackEntity';
import ILibraryRepository from '../../core/repositories/ILibraryRepository';

export default class Library implements ILibraryRepository {
  private fakeDB: Record<number, ITrackEntity> = {};
  importLibraryFromItunes(songs: ITrackEntity[]): Promise<void> {
    let id = Date.now();
    for (const song of songs) {
      this.fakeDB[id] = {
        id, ...song
      };
      id++;
    }
    console.log(this.fakeDB);
    return Promise.resolve();
  }
}
