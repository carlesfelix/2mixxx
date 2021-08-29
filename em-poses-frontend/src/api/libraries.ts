import http from '../services/http';
import Library from '../types/Library';

export async function getAllLibraries(): Promise<Library[]> {
  const { data } = await http.get<Library[]>('/libraries');
  return data;
}

export async function createLibrary(library: Library): Promise<Library> {
  const { data } = await http.post<Library>('/libraries', library);
  return data;
}

export async function importSongsToLibrary(libraryId: string, file: File, onUploadProgress: (event: any) => void): Promise<Library> {
  const formData = new FormData();
  formData.append('itunes', file, file.name);
  const { data } = await http.post<Library>(`/libraries/${libraryId}/songs/import`, formData, {
    onUploadProgress
  });
  return data;
}

export async function getLibraryById(libraryId: string): Promise<Library> {
  const { data } = await http.get<Library>(`/libraries/${libraryId}`);
  return data;
}

export async function deleteLibraryById(libraryId: string): Promise<void> {
  await http.delete<void>(`/libraries/${libraryId}`);
}

export async function updateLibraryById(library: Library): Promise<Library> {
  const { data } = await http.put<Library>(`/libraries/${library.id!}`, library);
  return data;
}
