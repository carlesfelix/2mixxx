

import sequelizeConnection from '../sequelize.connection';
import trackModel from './track.model';
import userModel from './user.model';

const models = {
  Track: trackModel(sequelizeConnection),
  User: userModel(sequelizeConnection)
};

Object.values(models).forEach(modelDef => {
  if (modelDef.associate) {
    modelDef.associate(models);
  }
});

export default models;