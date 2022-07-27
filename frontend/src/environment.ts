function env(name: string, defaultValue = ''): string {
  return process.env[name] || defaultValue;
}

const environment = {
  REACT_APP_SOCKET_BASE_URI: env('REACT_APP_SOCKET_BASE_URI'),
  REACT_APP_AUTH0_DOMAIN: env('REACT_APP_AUTH0_DOMAIN'),
  REACT_APP_AUTH0_CLIENT_ID: env('REACT_APP_AUTH0_CLIENT_ID'),
  REACT_APP_API_BASE_URL: env('REACT_APP_API_BASE_URL'),
  VERSION: '1.0.0-alpha.4',
  repository: 'https://github.com/carlesfelix/2mixxx'
};

export default environment;
