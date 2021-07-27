import { config } from 'dotenv';
import { resolve } from 'path';
config({ path: resolve(__dirname, '../../.env') });

import app from './app';
import environment from '../environment';

app.listen(environment.API_PORT, () => {
  console.log(`API running on port ${environment.API_PORT}`);
});
