function env(name: string, defaultValue = ''): string {
  return process.env[name] || defaultValue;
}

const environment = {
  REACT_APP_SOCKET_BASE_URI: env('REACT_APP_SOCKET_BASE_URI')
};

export default environment;
