import { ILibraryEntity } from '../entities/ILibraryEntity';

export default interface ILibraryRepository {
  createLibrary(library: ILibraryEntity): Promise<ILibraryEntity>;
  deleteLibrary(libraryId: string): Promise<number>;
  updateLibrary(libraryId: string, library: ILibraryEntity): Promise<number>;
  getLibraryById(libraryId: string): Promise<ILibraryEntity | null>;
  getLibraries(): Promise<ILibraryEntity[]>;
}
