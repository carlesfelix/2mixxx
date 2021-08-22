import IBaseEntity from './IBaseEntity';

export interface ILibraryEntity extends IBaseEntity {
  title: string;
  songs?: number;
}
