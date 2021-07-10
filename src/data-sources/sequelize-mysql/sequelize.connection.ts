import { Sequelize } from 'sequelize';
import environment from '../../environment';

export default new Sequelize(
  environment.MYSQL_DATABASE,
  environment.MYSQL_USER,
  environment.MYSQL_PASSWORD,
  {
    host: environment.MYSQL_HOST,
    dialect: 'mysql',
    port: environment.MYSQL_PORT
  }
);
