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

export async function importSongsToLibrary(libraryId: string, formData: FormData): Promise<void> {
  await http.post<void>(`/libraries/${libraryId}/songs/import`, formData);
}

export async function getLibraryById(libraryId: string): Promise<Library> {
  const { data } = await http.get<Library>(`/libraries/${libraryId}`);
  return data;
}

export async function deleteLibraryById(libraryId: string): Promise<void> {
  await http.delete<void>(`/libraries/${libraryId}`);
}

export async function updateLibraryById(libraryId: string, library: Library): Promise<Library> {
  const { data } = await http.put<Library>(`/libraries/${libraryId}`, library);
  return data;
}
