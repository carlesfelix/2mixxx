import BaseEntity from './BaseEntity';

type LibraryEntity = {
  title: string;
  songs?: number;
} & BaseEntity;

export default LibraryEntity;
