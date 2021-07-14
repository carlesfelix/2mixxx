import environment from '../../../environment';
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

if (environment.NODE_ENV === 'development') {
  Object.values(models).forEach(modelDef => {
    modelDef.model.sync({ force: true });
  });
}

export default models;