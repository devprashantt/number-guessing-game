const ENUMS = {
  USER_ROLE: {
    ADMIN: 'admin',
    USER: 'user',
    SYSTEM_ADMIN: 'system_admin',
  },
  RESPONSE_STATUS: {
    SUCCESS: 200,
    CREATED: 201,
    ACCEPTED: 202,
    BAD_REQUEST: 400,
    PAYMENT_REQUIRED: 402,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    UNPROCESSABLE_ENTITY: 422,
    ACCESS_DENIED: 440,
    INTERNAL_ERROR: 500,
  },
  RESPONSE_MESSAGE: {
    SUCCESS: 'Successfully fetched data!',
    CREATED: 'Successfully created data!',
    BAD_REQUEST: 'The request was invalid or cannot be served!',
    PAYMENT_REQUIRED: 'Payment is required to access this resource!',
    UNAUTHORIZED: 'You are not authorized to access this resource!',
    FORBIDDEN: 'You do not have permission to access this resource!',
    NOT_FOUND: 'Resource not found!',
    UNPROCESSABLE_ENTITY:
      'The request was well-formed but was unable to be followed due to validation errors!',
    ACCESS_DENIED: 'You do not have access to this resource!',
    INTERNAL_ERROR: 'We encountered an error while processing your request!',
  },
  SCORE_REMARKS: {
    GOOD: 'good',
    BAD: 'bad',
    BEST: 'best',
  },
};

export default ENUMS;
