import IBaseEntity from './IBaseEntity';

export default interface IRoomEntity extends IBaseEntity {
  code: string;
  allowSongRequests: boolean;
}
