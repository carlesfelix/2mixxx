import { DataTypes, Model, UUIDV4 } from 'sequelize';
import IRoomEntity from '../../../core/entities/IRoomEntity';
import { IModelDefinitionFn } from './types';

const modelDefinition: IModelDefinitionFn<IRoomEntity> = sequelize => {
  const RoomModel = sequelize.define<Model<IRoomEntity>>('Room', {
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
    code: {
      allowNull: false,
      type: DataTypes.STRING(16),
      field: 'code',
      unique: true
    },
    allowSongRequests: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      field: 'allowSongRequests',
      defaultValue: false
    }
  }, { tableName: 'Rooms' });
  return {
    model: RoomModel
  };
};

export default modelDefinition;
