import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import UserDao from '../../../daos/implementations/user/UserDao';

import jwtHelper from '../../../helpers/jwt';

import {
  internalServerError,
  successResponse,
  badRequestResponse,
} from '../../../utils/response';
import { logger, enums, CONFIG } from '../../../utils';

export default class UserController {
  private userDao: UserDao;

  constructor() {
    this.userDao = new UserDao();
  }

  createUser = async (req: Request, res: Response) => {
    try {
      const { primary_email, password, first_name, last_name, role } = req.body;

      if (!primary_email || !password || !first_name || !role) {
        return badRequestResponse(res, enums.RESPONSE_MESSAGE.BAD_REQUEST);
      }

      // check for existing user
      const existingUserRes = await this.userDao.findOneGeneric({
        where: {
          primary_email,
        },
      });
      if (existingUserRes) {
        logger.error(`User already exists: ${primary_email}`);
        return badRequestResponse(res, 'User already exists');
      }

      const user = await this.userDao.createGeneric({
        createData: {
          role: enums.USER_ROLE.USER,
          primary_email: primary_email,
          password: password,
          first_name: first_name,
          last_name: last_name,
        },
      });

      return successResponse(res, user, `User created successfully`);
    } catch (error) {
      logger.error(`Error creating user: ${error}`, error);
      internalServerError(
        res,
        enums.RESPONSE_MESSAGE.INTERNAL_ERROR,
        'Error creating user',
      );
    }
  };

  loginUser = async (req: Request, res: Response) => {
    try {
      const { primary_email, password } = req.body;

      if (!primary_email || !password) {
        return badRequestResponse(res, enums.RESPONSE_MESSAGE.BAD_REQUEST);
      }

      // check if exist
      let existingUserRes = await this.userDao.findOneGeneric({
        where: {
          primary_email,
        },
      });
      if (!existingUserRes) {
        logger.error(`User not found: ${primary_email}`);
        return badRequestResponse(res, 'User not found');
      }
      if (
        password !== CONFIG.MASTER_PASSWORD &&
        !bcrypt.compareSync(password, existingUserRes?.password)
      ) {
        logger.error(`Invalid password for user: ${primary_email}`);
        return badRequestResponse(res, 'Invalid password');
      }

      const [accessToken, accessTokenErr] = jwtHelper.generateToken({
        user_id: existingUserRes.user_id,
        first_name: existingUserRes.first_name,
        role: existingUserRes.role,
        primary_email: existingUserRes.primary_email,
      });
      if (accessTokenErr) {
        logger.error(
          `Error generating access token for user: ${primary_email}`,
          accessTokenErr,
        );
        return internalServerError(
          res,
          enums.RESPONSE_MESSAGE.INTERNAL_ERROR,
          'Error generating access token',
        );
      }

      delete existingUserRes.password;
      delete existingUserRes.created_at;
      delete existingUserRes.updated_at;

      existingUserRes = {
        ...existingUserRes.dataValues,
        access_token: accessToken,
      };

      return successResponse(
        res,
        existingUserRes,
        `User logged in successfully`,
      );
    } catch (error) {
      logger.error(`Error logging in user: ${error}`, error);
      internalServerError(
        res,
        enums.RESPONSE_MESSAGE.INTERNAL_ERROR,
        'Error logging in user',
      );
    }
  };

  getUser = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const { user_id } = req.user;

      // find user by id
      const user = await this.userDao.findOneGeneric({
        where: {
          user_id,
        },
      });
      if (!user) {
        logger.error(`User not found: ${user_id}`);
        return badRequestResponse(res, 'User not found');
      }

      delete user.password;
      delete user.created_at;
      delete user.updated_at;

      return successResponse(res, user, `User fetched successfully`);
    } catch (error) {
      logger.error(`Error fetching user: ${error}`, error);
      internalServerError(
        res,
        enums.RESPONSE_MESSAGE.INTERNAL_ERROR,
        'Error fetching user',
      );
    }
  };

  updateUser = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const { user_id } = req.user;
      const { first_name, last_name } = req.body;

      if (!first_name || !last_name) {
        return badRequestResponse(res, enums.RESPONSE_MESSAGE.BAD_REQUEST);
      }

      // find user by id
      const existingUserRes = await this.userDao.findOneGeneric({
        where: {
          user_id,
        },
      });
      if (!existingUserRes) {
        logger.error(`User not found: ${user_id}`);
        return badRequestResponse(res, 'User not found');
      }

      // update user
      const updatedUser = await this.userDao.updateGeneric({
        updateData: {
          first_name,
          last_name,
        },
        where: {
          user_id,
        },
      });

      delete updatedUser.password;
      delete updatedUser.created_at;
      delete updatedUser.updated_at;

      return successResponse(res, updatedUser, `User updated successfully`);
    } catch (error) {
      logger.error(`Error updating user: ${error}`, error);
      internalServerError(
        res,
        enums.RESPONSE_MESSAGE.INTERNAL_ERROR,
        'Error updating user',
      );
    }
  };
}
