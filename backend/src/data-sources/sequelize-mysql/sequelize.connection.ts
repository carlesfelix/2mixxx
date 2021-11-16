import { Options, Sequelize } from 'sequelize';
import { readFileSync } from 'fs';

import environment from '../../environment';

const development = environment.NODE_ENV === 'development';
const dbLog = development && console.log;

const sequelizeOptions: Options = {
  host: environment.MYSQL_HOST,
  dialect: 'mysql',
  port: environment.MYSQL_PORT,
  logging: dbLog,
  ssl: environment.MYSQL_SSL
};

if (environment.MYSQL_SSL && environment.MYSQL_CERT_PATH) {
  sequelizeOptions.dialectOptions = {
    ssl: {
      rejectUnauthorized: true,
      ca: [ readFileSync(environment.MYSQL_CERT_PATH, 'utf8') ]
    }
  };
}

export default new Sequelize(
  environment.MYSQL_DATABASE,
  environment.MYSQL_USER,
  environment.MYSQL_PASSWORD,
  sequelizeOptions
);
