import { DataTypes, Model } from "sequelize";
import ILibraryRoomEntity from "../../../core/entities/ILibraryRoomEntity";
import { IModelDefinitionFn } from "./types";

const modelDefinition: IModelDefinitionFn<ILibraryRoomEntity> = sequelize => {
  const LibraryRoomModel = sequelize.define<Model<ILibraryRoomEntity>>('LibraryRoom', {
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
  }, { tableName: 'LibrariesRooms' });
  return {
    model: LibraryRoomModel,
    associate: models => {
      models.Library.model.belongsToMany(models.Room.model, {
        through: LibraryRoomModel
      });
    }
  };
};

export default modelDefinition;
