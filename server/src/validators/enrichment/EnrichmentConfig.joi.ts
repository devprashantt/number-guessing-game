import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';

import {
  internalServerError,
  unprocessableEntity,
  badRequestResponse,
} from '../../utils/response';

export default class EnrichmentConfigJoi {
  updateEnrichmentConfig = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const schema = Joi.object({
        is_lusha_enabled: Joi.boolean().required(),
        lusha_threshold: Joi.number().integer().required(),
        enable_lusha_for_new_users: Joi.boolean().required(),
        encrypted_lusha_api_key: Joi.string().allow(null, ''),

        is_kaspr_enabled: Joi.boolean().required(),
        kaspr_threshold: Joi.number().integer().required(),
        enable_kaspr_for_new_users: Joi.boolean().required(),
        encrypted_kaspr_api_key: Joi.string().allow(null, ''),

        is_rocketreach_enabled: Joi.boolean().required(),
        rocketreach_threshold: Joi.number().integer().required(),
        enable_rocketreach_for_new_users: Joi.boolean().required(),
        encrypted_rocketreach_api_key: Joi.string().allow(null, ''),

        is_cognism_enabled: Joi.boolean().required(),
        cognism_threshold: Joi.number().integer().required(),
        enable_cognism_for_new_users: Joi.boolean().required(),
        encrypted_cognism_api_key: Joi.string().allow(null, ''),

        is_zerobounce_enabled: Joi.boolean().required(),
        zerobounce_threshold: Joi.number().integer().required(),
        enable_zerobounce_for_new_users: Joi.boolean().required(),
        encrypted_zerobounce_api_key: Joi.string().allow(null, ''),
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
    } catch (error: any) {
      return internalServerError(res, error.message, error);
    }
  };
}
