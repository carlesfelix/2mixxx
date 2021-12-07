import Library from '../../data-sources/sequelize-mysql/repositories/Library';
import RegisteredUser from '../../data-sources/sequelize-mysql/repositories/RegisteredUser';
import Room from '../../data-sources/sequelize-mysql/repositories/Room';
import RoomModerator from '../../data-sources/sequelize-mysql/repositories/RoomModerator';
import RoomUser from '../../data-sources/sequelize-mysql/repositories/RoomUser';
import Song from '../../data-sources/sequelize-mysql/repositories/Song';
import SongRequest from '../../data-sources/sequelize-mysql/repositories/SongRequest';

const dataSourcesConfig = {
  song: new Song(),
  library: new Library(),
  registeredUser: new RegisteredUser(),
  room: new Room(),
  roomUser: new RoomUser(),
  songRequest: new SongRequest(),
  roomModerator: new RoomModerator()
};

export default dataSourcesConfig;
