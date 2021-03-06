import sequelizeConnection from '../sequelize.connection';
import libraryRoomModel from './library-room.model';
import libraryModel from './library.model';
import registeredUserModel from './registered-user.model';
import roomModel from './room.model';
import songModel from './song.model';
import roomUserModel from './room-user.model';
import songRequestModel from './song-request.model';
import roomModeratorModel from './room-moderator.model';

const models = {
  Song: songModel(sequelizeConnection),
  Library: libraryModel(sequelizeConnection),
  RegisteredUser: registeredUserModel(sequelizeConnection),
  Room: roomModel(sequelizeConnection),
  LibraryRoom: libraryRoomModel(sequelizeConnection),
  RoomUser: roomUserModel(sequelizeConnection),
  SongRequest: songRequestModel(sequelizeConnection),
  RoomModerator: roomModeratorModel(sequelizeConnection)
};

Object.values(models).forEach(modelDef => {
  if (modelDef.associate) {
    modelDef.associate(models);
  }
});

export default models;
