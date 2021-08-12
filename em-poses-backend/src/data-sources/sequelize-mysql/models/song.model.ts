import { DataTypes, Model, UUIDV4 } from 'sequelize';
import { ISongEntity } from '../../../core/entities/ISongEntity';
import { IModelDefinitionFn } from './types';

const modelDefinition: IModelDefinitionFn<ISongEntity> = sequelize => {
  const SongModel = sequelize.define<Model<ISongEntity>>('Song', {
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
    title: {
      allowNull: false,
      type: DataTypes.STRING,
      field: 'title'
    },
    artist: {
      allowNull: true,
      type: DataTypes.STRING,
      field: 'artist'
    }
  }, { tableName: 'Songs' });
  return {
    model: SongModel,
    associate: s => {
      console.log('Track associate', s.User.model.getTableName())
    },
  };
};

export default modelDefinition;
