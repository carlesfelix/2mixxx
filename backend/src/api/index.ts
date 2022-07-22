import app from './app';
import environment from '../environment';

app.listen(environment.API_PORT, () => {
  console.log(`API running on port ${environment.API_PORT}`);
});
