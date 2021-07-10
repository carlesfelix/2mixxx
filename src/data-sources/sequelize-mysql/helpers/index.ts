import { Model } from "sequelize/types";

export function instanceToJson<T>(instance: Model<T> | Model<T>[] | null): T | T[] | null {
  if (!instance) {
    return null;
  }
  if (instance instanceof Array) {
    return instance.map<T>(instanceItem => instanceItem.get());
  }
  return instance.get();
}
