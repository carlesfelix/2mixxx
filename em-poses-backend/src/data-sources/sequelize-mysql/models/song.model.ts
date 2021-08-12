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
    },
    libraryId: {
      allowNull: false,
      type: DataTypes.UUID,
      field: 'libraryId'
    }
  }, { tableName: 'Songs' });
  return {
    model: SongModel,
    associate: models => {
      models.Library.model.hasMany(SongModel, { foreignKey: 'libraryId' });
      SongModel.belongsTo(models.Library.model, { foreignKey: 'libraryId' });
    },
  };
};

export default modelDefinition;
