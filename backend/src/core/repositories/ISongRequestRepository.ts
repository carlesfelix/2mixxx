import SongRequestEntity from '../types/SongRequestEntity';

export default interface ISongRequestRepository {
  getSongRequestsCountFromRoom(roomId: string, t: unknown): Promise<number>;
  addSongRequest(data: {
    roomUserId: string,
    songId: string,
    roomId: string
  }, t?: unknown): Promise<SongRequestEntity>;
  getSongRequestById(id: string, t?: unknown): Promise<SongRequestEntity | null>;
  removeSongRequest(id: string, roomId: string): Promise<number>;
  getSongRequestsFromRoom(roomId: string): Promise<SongRequestEntity[]>;
}
