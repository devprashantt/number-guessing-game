'use strict';

import fs from 'fs';
import path from 'path';
import { Sequelize, DataType, Dialect, DataTypes } from 'sequelize';
import dotenv from 'dotenv';

// models imports as in runtime we need to import all models to associate them
import User from './User';
import Score from './Score';

import { logger } from './../../utils';

dotenv.config();

const basename = path.basename(__filename);
const dirname = path.dirname(`${__dirname}/models`);
const db: any = {};
let config: any;

logger.info(
  `Loading models from ${dirname} and ca file from ${dirname}/../ssl/isrgrootx1.pem`,
);

config = {
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'stealth_ai',
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT || 3306,
  dialect: process.env.DB_DIALECT || 'mysql',
  ssl:
    process.env.TIDB_ENABLE_SSL === 'true'
      ? {
          minVersion: 'TLSv1.2',
          ca: fs.readFileSync(dirname + `/../ssl/isrgrootx1.pem`),
        }
      : null,
};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

const files = fs
  .readdirSync(dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 &&
      (file.slice(-3) === '.ts' || file.slice(-3) === '.js'),
  );

files.splice(files.indexOf(basename), 1);

for (const file of files) {
  const modelFile = path.join(dirname, file);

  const paths = require(modelFile);
  const model = paths.default(sequelize, DataTypes);

  db[model.name] = model;
}

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
