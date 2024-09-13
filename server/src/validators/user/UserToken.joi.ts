import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';

import { internalServerError, unprocessableEntity } from '../../utils/response';

export default class UserTokenJoi {
  updateUserToken(req: Request, res: Response, next: NextFunction) {
    try {
      const schema = Joi.object({
        encrypted_linkedin_li_at_cookie: Joi.string(),
        encrypted_linkedin_li_a_cookie: Joi.string(),
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
