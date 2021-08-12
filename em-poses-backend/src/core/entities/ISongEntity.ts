import IBaseEntity from './IBaseEntity';

export interface ISongEntity extends IBaseEntity {
  title: string;
  artist?: string;
}
