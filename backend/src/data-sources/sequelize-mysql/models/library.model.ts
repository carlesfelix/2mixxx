import { DataTypes, Model, UUIDV4 } from 'sequelize';
import LibraryEntity from '../../../core/types/LibraryEntity';
import { IModelDefinitionFn } from './types';

const modelDefinition: IModelDefinitionFn<LibraryEntity> = sequelize => {
  const LibraryModel = sequelize.define<Model<LibraryEntity>>('Library', {
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
    }
  }, { tableName: 'Libraries' });
  return {
    model: LibraryModel
  };
};

export default modelDefinition;
