import { DataTypes, Model, UUIDV4 } from 'sequelize';
import RoomUserEntity from '../../../core/types/RoomUserEntity';
import { IModelDefinitionFn } from './types';

const modelDefinition: IModelDefinitionFn<RoomUserEntity> = sequelize => {
  const RoomUserModel = sequelize.define<Model<RoomUserEntity>>('RoomUser', {
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
    }
  }, { tableName: 'RoomUsers' });
  return { model: RoomUserModel };
};

export default modelDefinition;
