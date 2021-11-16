import { DataTypes, Model, UUIDV4 } from 'sequelize'
import SongRequestEntity from '../../../core/types/SongRequestEntity'
import { IModelDefinitionFn } from './types'

const songRequestModel: IModelDefinitionFn<SongRequestEntity> = sequelize => {
  const SongRequestModel = sequelize.define<Model<SongRequestEntity>>('SongRequest', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      field: 'id'
    },
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
      field: 'roomId'
    },
    roomUserId: {
      allowNull: false,
      type: DataTypes.UUID,
      field: 'roomUserId'
    },
    songId: {
      allowNull: false,
      type: DataTypes.UUID,
      field: 'songId'
    }
  }, { tableName: 'song_requests' });
  return {
    model: SongRequestModel,
    associate: models => {
      models.Room.model.hasOne(SongRequestModel, {
        foreignKey: 'roomId',
        as: 'room'
      });
      SongRequestModel.belongsTo(models.Room.model, {
        foreignKey: 'roomId',
        as: 'room'
      });
      models.RoomUser.model.hasOne(SongRequestModel, {
        foreignKey: 'roomUserId',
        as: 'user'
      });
      SongRequestModel.belongsTo(models.RoomUser.model, {
        foreignKey: 'roomUserId',
        as: 'user'
      });
      models.Song.model.hasOne(SongRequestModel, {
        foreignKey: 'songId',
        as: 'song'
      });
      SongRequestModel.belongsTo(models.Song.model, {
        foreignKey: 'songId',
        as: 'song'
      });
    }
  };
};
  
export default songRequestModel;
