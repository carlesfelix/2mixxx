import BaseEntity from './BaseEntity';

type Song = {
  title: string;
  artist?: string;
} & BaseEntity;

export default Song;
