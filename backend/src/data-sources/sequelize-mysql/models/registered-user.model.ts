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
    sub: {
      allowNull: false,
      type: DataTypes.STRING,
      field: 'sub',
      unique: true
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
  }, { tableName: 'registered_users' });
  return { model: RegisteredUserModel };
};

export default modelDefinition;
