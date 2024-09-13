import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';

import { internalServerError, unprocessableEntity } from '../../utils/response';

export default class WorkflowJoi {
  async createWorkflow(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      workflow_name: Joi.string().required(),
      workflow_type: Joi.string().required(),
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

  async updateWorkflow(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      workflow_name: Joi.string(),
      is_published: Joi.boolean(),
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

  async deleteWorkflow(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      workflow_uuid: Joi.string(),
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

  async getWorkflow(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      workflow_uuid: Joi.string().required(),
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

  async getWorkflows(req: Request, res: Response, next: NextFunction) {
    try {
      const schema = Joi.object({
        search_query: Joi.string(),
        workflow_type: Joi.string(),
        page_number: Joi.number(),
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
