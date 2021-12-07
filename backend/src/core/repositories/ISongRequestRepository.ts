import SongRequestEntity from '../types/SongRequestEntity';

export default interface ISongRequestRepository {
  addSongRequest(data: {
    roomUserId: string,
    songId: string,
    roomId: string
  }): Promise<SongRequestEntity>;
  getSongRequestById(id: string): Promise<SongRequestEntity | null>;
  removeSongRequest(id: string, roomId: string): Promise<number>;
  getSongRequestsFromRoom(roomId: string): Promise<SongRequestEntity[]>;
}
