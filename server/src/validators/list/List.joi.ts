import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';

import { internalServerError, unprocessableEntity } from '../../utils/response';

export default class ListJoi {
  async updateList(req: Request, res: Response, next: NextFunction) {
    try {
      const schema = Joi.object({
        list_name: Joi.string(),
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
