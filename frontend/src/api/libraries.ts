import http from '../services/http';
import Library from '../types/Library';
import Song from '../types/Song';

export async function getAllLibraries(): Promise<Library[]> {
  const { data } = await http.get<Library[]>('/libraries');
  return data;
}

export async function createLibrary(library: Library): Promise<Library> {
  const { data } = await http.post<Library>('/libraries', library);
  return data;
}

export async function importSongs(
  libraryId: string, songs: Song[]
): Promise<void> {
  await http.post(
    `/libraries/${libraryId}/songs/import`,
    { songs }
  );
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

export async function deleteSongsFromLibrary(libraryId: string): Promise<void> {
  await http.delete<void>(`/libraries/${libraryId}/songs`);
}
