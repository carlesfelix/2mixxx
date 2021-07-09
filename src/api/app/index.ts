import express from 'express';
import environment from '../../environment';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (environment.NODE_ENV === 'development') {  
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  app.use(require('morgan')('combined'));
}

app.use('/api', routes);

export default app;
