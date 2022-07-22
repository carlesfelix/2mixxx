import { config } from 'dotenv';
import { resolve } from 'path';
config({ path: resolve(__dirname, '../.env') });

function env(name: string, defaultValue = ''): string {
  return process.env[name] || defaultValue;
}

export default {
  API_PORT: +env('API_PORT', process.env.PORT),
  NODE_ENV: env('NODE_ENV'),
  MYSQL_ROOT_PASSWORD: env('MYSQL_ROOT_PASSWORD'),
  MYSQL_DATABASE: env('MYSQL_DATABASE'),
  MYSQL_USER: env('MYSQL_USER'),
  MYSQL_PASSWORD: env('MYSQL_PASSWORD'),
  MYSQL_HOST: env('MYSQL_HOST'),
  MYSQL_PORT: +env('MYSQL_PORT'),
  MYSQL_SSL: !!env('MYSQL_SSL'),
  MYSQL_CERT_PATH: env('MYSQL_CERT_PATH'),
  SOCKET_PORT: +env('SOCKET_PORT', process.env.PORT),
  WEB_ORIGIN: env('WEB_ORIGIN'),
  JWT_ROOM_USERS_SECRET: env('JWT_ROOM_USERS_SECRET'),
  AUTH0_DOMAIN: env('AUTH0_DOMAIN'),
  AUTH0_MACHINE_TO_MACHINE_CLIENT_ID: env('AUTH0_MACHINE_TO_MACHINE_CLIENT_ID'),
  AUTH0_MACHINE_TO_MACHINE_CLIENT_SECRET: env('AUTH0_MACHINE_TO_MACHINE_CLIENT_SECRET'),
  AUTH0_DB_CONNECTION: env('AUTH0_DB_CONNECTION')
};
