function env(name: string, defaultValue = ''): string {
  return process.env[name] || defaultValue;
}

export default {
  API_PORT: +env('API_PORT'),
  NODE_ENV: env('NODE_ENV'),
  MYSQL_ROOT_PASSWORD: env('MYSQL_ROOT_PASSWORD'),
  MYSQL_DATABASE: env('MYSQL_DATABASE'),
  MYSQL_USER: env('MYSQL_USER'),
  MYSQL_PASSWORD: env('MYSQL_PASSWORD'),
  MYSQL_HOST: env('MYSQL_HOST'),
  MYSQL_PORT: +env('MYSQL_PORT'),
  SOCKET_PORT: +env('SOCKET_PORT')
};
