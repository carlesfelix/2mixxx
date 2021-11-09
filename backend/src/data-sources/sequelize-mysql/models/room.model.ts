import { DataTypes, Model, UUIDV4 } from 'sequelize';
import RoomEntity from '../../../core/types/RoomEntity';
import { IModelDefinitionFn } from './types';

const modelDefinition: IModelDefinitionFn<RoomEntity> = sequelize => {
  const RoomModel = sequelize.define<Model<RoomEntity>>('Room', {
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
