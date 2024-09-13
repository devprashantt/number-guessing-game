import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';

import { internalServerError, unprocessableEntity } from '../../utils/response';

export default class UserJoi {
  async createUser(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      primary_email: Joi.string().email().required(),
      password: Joi.string().required(),
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      timezone: Joi.string().required(),
      company_uuid: Joi.string().required(),
    });

    const options = {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    };

    const { error, value } = schema.validate(req.body, options);

    if (error) {
      const errorMessage = error.details
        .map((details: any) => details.message)
        .join(', ');
      return unprocessableEntity(res, errorMessage);
    } else {
      req.query = value;
      return next();
    }
  }

  async loginUser(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      primary_email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const options = {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    };

    const { error, value } = schema.validate(req.body, options);

    if (error) {
      const errorMessage = error.details
        .map((details: any) => details.message)
        .join(', ');
      return unprocessableEntity(res, errorMessage);
    } else {
      req.query = value;
      return next();
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const schema = Joi.object({
        first_name: Joi.string(),
        last_name: Joi.string(),
        timezone: Joi.string(),
        password: Joi.string(),
        primary_email: Joi.string().email().forbidden(),
      });

      const options = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true,
      };

      const { error, value } = schema.validate(req.body, options);

      if (error) {
        const errorMessage = error.details
          .map((details: any) => details.message)
          .join(', ');
        return unprocessableEntity(res, errorMessage);
      } else {
        req.query = value;
        return next();
      }
    } catch (error) {
      return internalServerError(res, error.message, error);
    }
  }
}
