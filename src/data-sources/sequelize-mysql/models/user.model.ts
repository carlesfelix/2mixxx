import { DataTypes, Model } from "sequelize";
import { IModelDefinitionFn } from "./types";

export interface IUserModel {
  id: number;
  name: string;
}

const modelDefinition: IModelDefinitionFn<IUserModel> = sequelize => {
  const UserModel = sequelize.define<Model<IUserModel>>('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    }
  });
  return {
    model: UserModel
  };
};

export default modelDefinition;