import { DataTypes, Model } from 'sequelize';
import { ITrackEntity } from '../../../core/entities/ITrackEntity';
import { IModelDefinitionFn } from './types';

const modelDefinition: IModelDefinitionFn<ITrackEntity> = sequelize => {
  const TrackModel = sequelize.define<Model<ITrackEntity>>('Track', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
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
    track_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: 'track_id'
    },
    size: {
      allowNull: true,
      type: DataTypes.INTEGER,
      field: 'size'
    },
    total_time: {
      allowNull: true,
      type: DataTypes.INTEGER,
      field: 'total_time'
    },
    year: {
      allowNull: true,
      type: DataTypes.INTEGER,
      field: 'year'
    },
    date_modified: {
      allowNull: true,
      type: DataTypes.DATE,
      field: 'date_modified'
    },
    date_added: {
      allowNull: true,
      type: DataTypes.DATE,
      field: 'date_added'
    },
    bit_rate: {
      allowNull: true,
      type: DataTypes.INTEGER,
      field: 'bit_rate'
    },
    sample_rate: {
      allowNull: true,
      type: DataTypes.INTEGER,
      field: 'sample_rate'
    },
    persistent_id: {
      allowNull: false,
      type: DataTypes.STRING,
      field: 'persistent_id'
    },
    track_type: {
      allowNull: false,
      type: DataTypes.STRING,
      field: 'track_type'
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      field: 'name'
    },
    artist: {
      allowNull: true,
      type: DataTypes.STRING,
      field: 'artist'
    },
    genre: {
      allowNull: true,
      type: DataTypes.STRING,
      field: 'genre'
    },
    kind: {
      allowNull: true,
      type: DataTypes.STRING,
      field: 'kind'
    },
    comments: {
      allowNull: true,
      type: DataTypes.STRING,
      field: 'comments'
    },
    work: {
      allowNull: true,
      type: DataTypes.STRING,
      field: 'work'
    }
  }, { tableName: 'tracks' });
  return {
    model: TrackModel,
    associate: s => {
      console.log('Track associate', s.User.model.getTableName())
    },
  };
};

export default modelDefinition;
