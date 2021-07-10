import { DataTypes, Model } from "sequelize";
import { IModelDefinitionFn } from "./types";

interface ITrackModel {
  id?: number;
}

const modelDefinition: IModelDefinitionFn<ITrackModel> = sequelize => {
  const TrackModel = sequelize.define<Model<ITrackModel>>('Track', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  });
  return {
    associate: s => {
      console.log('Track associate', s.User.model.getTableName())
    },
    model: TrackModel
  };
};

export default modelDefinition;