import sequelizeConnection from '../sequelize.connection';
import libraryModel from './library.model';
import songModel from './song.model';
import userModel from './user.model';

const models = {
  Song: songModel(sequelizeConnection),
  User: userModel(sequelizeConnection),
  Library: libraryModel(sequelizeConnection)
};

Object.values(models).forEach(modelDef => {
  if (modelDef.associate) {
    modelDef.associate(models);
  }
});

export default models;
