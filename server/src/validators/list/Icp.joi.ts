import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';

import {
  internalServerError,
  unprocessableEntity,
  badRequestResponse,
} from '../../utils/response';

export default class IcpJoi {
  async generatePersona(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      value_proposition: Joi.string().required(),
      market_location: Joi.string().required(),
      market_information: Joi.string().required(),
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
  async generateLinkedinUrlFromPersona(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const schema = Joi.object({
      behaviors: Joi.array().items(Joi.string()).required(),
      demographics: Joi.object({
        age: Joi.string().required(),
        location: Joi.array().items(Joi.string()).required(),
        education_level: Joi.array().items(Joi.string()).required(),
        job_title: Joi.array().items(Joi.string()).required(),
      }),
      company_analysis: Joi.object({
        B2B: Joi.boolean().required(),
        company_size: Joi.string().required(),
        industry: Joi.array().items(Joi.string()).required(),
      }),
      pain_points: Joi.array().items(Joi.string()).required(),
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
  async generatePersonaForRelevancy(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const schema = Joi.object({
        value_proposition: Joi.string().required(),
        market_location: Joi.string().required(),
        market_information: Joi.string().required(),
        list_id: Joi.string(),
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
  }
}
