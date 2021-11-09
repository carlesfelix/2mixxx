import http from '../services/http';
import Song from '../types/Song';

export async function searchSongs(query: string): Promise<Song[]> {
  const { data } = await http.get<Song[]>('/songs', {
    params: { query }
  });
  return data;
}
