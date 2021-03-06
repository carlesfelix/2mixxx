import { DataTypes, Model } from "sequelize";
import LibraryRoomEntity from "../../../core/types/LibraryRoomEntity";
import { IModelDefinitionFn } from "./types";

const modelDefinition: IModelDefinitionFn<LibraryRoomEntity> = sequelize => {
  const LibraryRoomModel = sequelize.define<Model<LibraryRoomEntity>>('LibraryRoom', {
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'createdAt'
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'updatedAt'
    },
    roomId: {
      allowNull: false,
      type: DataTypes.UUID,
      field: 'roomId',
      primaryKey: true
    },
    libraryId: {
      allowNull: false,
      type: DataTypes.UUID,
      field: 'libraryId',
      primaryKey: true
    }
  }, { tableName: 'libraries_rooms' });
  return {
    model: LibraryRoomModel,
    associate: models => {
      models.Library.model.belongsToMany(models.Room.model, {
        uniqueKey: 'libraryId',
        through: models.LibraryRoom.model,
        foreignKey: 'libraryId',
        otherKey: 'roomId',
        as: 'rooms'
      });
      models.Room.model.belongsToMany(models.Library.model, {
        uniqueKey: 'roomId',
        through: models.LibraryRoom.model,
        foreignKey: 'roomId',
        otherKey: 'libraryId',
        as: 'libraries'
      });
    }
  };
};

export default modelDefinition;
