import { Model, DataTypes } from 'sequelize';
import RoomModeratorEntity from '../../../core/types/RoomModeratorEntity';
import { IModelDefinitionFn } from './types';

const modelDefinition: IModelDefinitionFn<RoomModeratorEntity> = sequelize => {
  const RoomModeratorModel = sequelize.define<Model<RoomModeratorEntity>>('RoomModerator', {
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
    registeredUserId: {
      allowNull: false,
      type: DataTypes.UUID,
      field: 'registeredUserId',
      primaryKey: true
    }
  }, { tableName: 'rooms_moderators' });
  return {
    model: RoomModeratorModel,
    associate: models => {
      models.RegisteredUser.model.belongsToMany(models.Room.model, {
        uniqueKey: 'registeredUserId',
        through: RoomModeratorModel,
        foreignKey: 'registeredUserId',
        otherKey: 'roomId',
        as: 'rooms'
      });
      models.Room.model.belongsToMany(models.RegisteredUser.model, {
        uniqueKey: 'roomId',
        through: RoomModeratorModel,
        foreignKey: 'roomId',
        otherKey: 'registeredUserId',
        as: 'moderators'
      });
      models.RoomModerator.model.belongsTo(models.Room.model, {
        as: 'room',
        foreignKey: 'roomId'
      });
    }
  };
};

export default modelDefinition;
