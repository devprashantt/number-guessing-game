import { NextFunction, Request, Response } from 'express';

import jwtHelper from '../helpers/jwt';

import UserDao from '../daos/implementations/user/UserDao';

import { logger } from '../utils';

import {
  unauthorizedResponse,
  internalServerError,
  notFoundResponse,
} from '../utils/response';

class AuthToken {
  private userDao: UserDao;

  constructor() {
    this.userDao = new UserDao();
  }

  verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let token = req.headers.authorization;
      if (!token) {
        return unauthorizedResponse(
          res,
          'You are not authorized to access this route. Please login and try again.',
        );
      }
      token = token.split(' ')[1];

      const [decoded, decodeErr] = jwtHelper.verifyToken(token) as any;
      if (decodeErr) {
        logger.error(`[DECODED_ERR]: Error in verifying token.`, decodeErr);
        return unauthorizedResponse(
          res,
          'Error verifying token. Please login and try again.',
        );
      }
      if (!decoded) {
        return unauthorizedResponse(
          res,
          'You are not authorized to access this route. Please login and try again.',
        );
      }

      // @ts-ignore
      const user = await this.userDao.findOneGeneric({
        where: {
          user_id: decoded.user_id,
        },
      });
      if (!user) {
        return notFoundResponse(
          res,
          'User not found. Please login and try again.',
        );
      }

      // @ts-ignore
      req.user = user;
      next();
    } catch (error: any) {
      logger.error(error.message, error);
      internalServerError(res, error.message, error);
    }
  };
}

export default new AuthToken();
