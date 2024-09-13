import express from 'express';

import userRouter from './user/User.routes';
import scoreRouter from './score/Score.routes';

const v1Router = express.Router();

v1Router.use('/user', userRouter);
v1Router.use('/score', scoreRouter);

export default v1Router;
