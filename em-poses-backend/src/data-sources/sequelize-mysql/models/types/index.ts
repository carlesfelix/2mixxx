import { Model, ModelCtor, Sequelize } from "sequelize/types";

export interface IAnyModelDefinition {
  associate?(models: Record<string, IAnyModelDefinition>): void;
  model: ModelCtor<Model>;
}
export interface IModelDefinition<T> extends IAnyModelDefinition {
  model: ModelCtor<Model<T>>;
}

export type IModelDefinitionFn<T> = (sequelize: Sequelize) => IModelDefinition<T>;
