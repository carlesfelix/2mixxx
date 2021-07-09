import { Sequelize } from 'sequelize';
import environment from '../../environment';

export default new Sequelize('emposes_dev', 'emposes_dev', 'emposes_dev', {
  host: environment.MYSQL_HOST,
  dialect: 'mysql',
  port: environment.MYSQL_PORT
});
