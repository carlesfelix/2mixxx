import IBaseEntity from './IBaseEntity';

export interface ITrackEntity extends IBaseEntity {
  track_id: number;
  size?: number;
  total_time?: number;
  year?: number;
  date_modified?: string;
  date_added?: string;
  bit_rate?: number;
  sample_rate?: number;
  persistent_id: string;
  track_type: string;
  name: string;
  artist?: string;
  genre?: string;
  kind?: string;
  comments?: string;
  work?: string;
}