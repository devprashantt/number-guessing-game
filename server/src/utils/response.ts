import { Response } from 'express';

import ENUMS from './enums';

const RESPONSE_MESSAGE = ENUMS.RESPONSE_MESSAGE;
const RESPONSE_STATUS = ENUMS.RESPONSE_STATUS;

const successResponse = (
  res: Response,
  data: Object,
  message = RESPONSE_MESSAGE.SUCCESS,
) => {
  res.status(RESPONSE_STATUS.SUCCESS).json({
    status: RESPONSE_STATUS.SUCCESS,
    message,
    data,
  });
};

const internalServerError = (
  res: Response,
  message = RESPONSE_MESSAGE.INTERNAL_ERROR,
  error = null,
) => {
  res.status(RESPONSE_STATUS.INTERNAL_ERROR).json({
    status: RESPONSE_STATUS.INTERNAL_ERROR,
    message,
    error,
  });
};

const unauthorizedResponse = (
  res: Response,
  message = RESPONSE_MESSAGE.UNAUTHORIZED,
) => {
  res.status(RESPONSE_STATUS.UNAUTHORIZED).json({
    status: RESPONSE_STATUS.UNAUTHORIZED,
    message,
  });
};

const badRequestResponse = (
  res: Response,
  message = RESPONSE_MESSAGE.BAD_REQUEST,
) => {
  res.status(RESPONSE_STATUS.BAD_REQUEST).json({
    status: RESPONSE_STATUS.BAD_REQUEST,
    message,
  });
};

const notFoundResponse = (
  res: Response,
  message = RESPONSE_MESSAGE.NOT_FOUND,
) => {
  res.status(RESPONSE_STATUS.NOT_FOUND).json({
    status: RESPONSE_STATUS.NOT_FOUND,
    message,
  });
};

const forbiddenResponse = (
  res: Response,
  message = RESPONSE_MESSAGE.FORBIDDEN,
) => {
  res.status(RESPONSE_STATUS.FORBIDDEN).json({
    status: RESPONSE_STATUS.FORBIDDEN,
    message,
  });
};

const unprocessableEntity = (
  res: Response,
  message = RESPONSE_MESSAGE.UNPROCESSABLE_ENTITY,
) => {
  res.status(RESPONSE_STATUS.UNPROCESSABLE_ENTITY).json({
    status: RESPONSE_STATUS.UNPROCESSABLE_ENTITY,
    message,
  });
};

export {
  successResponse,
  internalServerError,
  unauthorizedResponse,
  badRequestResponse,
  notFoundResponse,
  forbiddenResponse,
  unprocessableEntity,
};
