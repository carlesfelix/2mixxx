import LibraryEntity from '../types/LibraryEntity';

export default interface ILibraryRepository {
  createLibrary(library: LibraryEntity): Promise<LibraryEntity>;
  deleteLibrary(libraryId: string): Promise<number>;
  updateLibrary(libraryId: string, library: LibraryEntity): Promise<number>;
  getLibraryById(libraryId: string): Promise<LibraryEntity | null>;
  getLibraries(): Promise<LibraryEntity[]>;
}
