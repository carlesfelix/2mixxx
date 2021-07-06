function env(name: string, defaultValue: string): string {
  return process.env[name] || defaultValue;
}

export default {
  PORT: +env('PORT', '3000'),
  NODE_ENV: env('NODE_ENV', 'development'),
  ROOT_DIR: `${__dirname}/..`
};
