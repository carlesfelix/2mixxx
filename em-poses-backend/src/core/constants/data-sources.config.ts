import Library from '../../data-sources/sequelize-mysql/repositories/Library';
import RegisteredUser from '../../data-sources/sequelize-mysql/repositories/RegisteredUser';
import Room from '../../data-sources/sequelize-mysql/repositories/Room';
import RoomUser from '../../data-sources/sequelize-mysql/repositories/RoomUser';
import Song from '../../data-sources/sequelize-mysql/repositories/Song';

const dataSourcesConfig = {
  song: new Song(),
  library: new Library(),
  registeredUser: new RegisteredUser(),
  room: new Room(),
  roomUser: new RoomUser()
};

export default dataSourcesConfig;
