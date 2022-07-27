import cors from 'cors';
import express from 'express';
import environment from '../../environment';
import routes from './routes';

const app = express();

app.set('trust proxy', true);
app.use(cors({
  exposedHeaders: [
    'Retry-After',
    'X-RateLimit-Limit',
    'X-RateLimit-Remaining',
    'X-RateLimit-Reset'
  ],
  origin: environment.WEB_ORIGIN
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (environment.NODE_ENV === 'development') {  
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  app.use(require('morgan')('combined'));
}

app.use('/api', routes);

export default app;
