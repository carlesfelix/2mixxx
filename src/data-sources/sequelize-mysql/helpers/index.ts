import { Model } from 'sequelize/types';

export function instanceToJson<T>(instance: Model<T> | null): T | null {
  if (!instance) {
    return null;
  }
  return instance.get();
}

export function instancesToJson<T>(instances: Model<T>[]): T[] {
  return instances.map<T>(instanceItem => instanceItem.get());
}
