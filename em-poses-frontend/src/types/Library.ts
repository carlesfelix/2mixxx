import BaseEntity from './BaseEntity';

type Library = {
  title: string;
  songs?: number;
} & BaseEntity;

export default Library;
