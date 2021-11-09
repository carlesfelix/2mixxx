import { DataTypes, Model, UUIDV4 } from 'sequelize';
import RegisteredUserEntity from '../../../core/types/RegisteredUserEntity';
import { IModelDefinitionFn } from './types';

const modelDefinition: IModelDefinitionFn<RegisteredUserEntity> = sequelize => {
  const RegisteredUserModel = sequelize.define<Model<RegisteredUserEntity>>('RegisteredUser', {
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
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      field: 'email',
      unique: true
    },
    role: {
      allowNull: false,
      type: DataTypes.TINYINT,
      field: 'userRole'
    }
  }, { tableName: 'RegisteredUsers' });
  return { model: RegisteredUserModel };
};

export default modelDefinition;
