import Library from '../../data-sources/sequelize-mysql/repositories/Library';
import Song from '../../data-sources/sequelize-mysql/repositories/Song';

const dataSourcesConfig = {
  song: new Song(),
  library: new Library()
};

export default dataSourcesConfig;
