import express, { Express, Request, Response } from 'express';
import helmet from 'helmet';
import multer from 'multer';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';

// main app
const app = express();

app.use(helmet());
app.use(
  morgan(
    (tokens, req, res) => {
      return JSON.stringify({
        methods: tokens.method(req, res),
        url: tokens.url(req, res),
        status: Number.parseFloat(tokens.status(req, res) || '0'),
        content_length: tokens.res(req, res, 'content-length'),
        response_time: Number.parseFloat(
          tokens['response-time'](req, res) || '0',
        ),
      });
    },
    {
      stream: {
        write: (message) => {
          logger.log({
            level: 'info',
            message: message,
          });
        },
      },
    },
  ),
);
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(multer().none());
app.use(
  cors({
    origin: ['http://localhost:5173'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  }),
);

import logger from './utils/logger';

// routes imports
import v1Router from './routes/v1';

app.use('/v1', v1Router);

app.get('/', (req: Request, res: Response) => {
  try {
    logger.log({
      level: 'info',
      message: 'Welcome to the shram backend!',
      meta: {
        file: 'index.js',
        timestamp: new Date().toISOString(),
      },
    });
    res.status(200).send('Welcome to the shram backend!');
  } catch (error: any) {
    logger.error(`Error in getting root: ${error.message}`, error);
    res.status(500).send('Internal Server Error');
  }
});

export default app;
