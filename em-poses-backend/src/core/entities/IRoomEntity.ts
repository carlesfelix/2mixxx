import IBaseEntity from './IBaseEntity';
import { ILibraryEntity } from './ILibraryEntity';

export default interface IRoomEntity extends IBaseEntity {
  code: string;
  allowSongRequests: boolean;
  libraries?: ILibraryEntity[];
}
