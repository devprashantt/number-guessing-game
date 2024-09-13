import 'dotenv/config';
import http from 'http';

import app from './app';

import logger from './utils/logger';
import CONFIG from './utils/config';

import db from './db/models';

const server = http.createServer(app);
const BACKEND_PORT = process.env.PORT || 9000;
const DB_PORT = process.env.DB_PORT || 3307;
const NODE_ENV = process.env.NODE_ENV || 'development';

db.sequelize
  .sync({
    alter: true,
    force: false,
    logging: true,
  })
  .then(() => {
    logger.log({
      level: 'info',
      message: `[DB CONNECTION SUCCESSFUL ON PORT:${DB_PORT}]`,
    });

    return server.listen(BACKEND_PORT, () =>
      logger.log({
        level: 'info',
        message: `[BACKEND LISTENING ON PORT:${BACKEND_PORT} ENV:${NODE_ENV}]`,
      }),
    );
  })
  .catch((error: any) => {
    logger.error(`[DB CONNECTION ERROR]`, error);
  });
