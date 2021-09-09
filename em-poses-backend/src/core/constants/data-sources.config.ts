import Library from '../../data-sources/sequelize-mysql/repositories/Library';
import RegisteredUser from '../../data-sources/sequelize-mysql/repositories/RegisteredUser';
import Song from '../../data-sources/sequelize-mysql/repositories/Song';

const dataSourcesConfig = {
  song: new Song(),
  library: new Library(),
  registeredUser: new RegisteredUser()
};

export default dataSourcesConfig;
