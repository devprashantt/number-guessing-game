import { NextFunction, Request, Response } from 'express';

import { forbiddenResponse } from '../utils/response';

class RBAC {
  constructor() {}

  canAccess(role: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      // @ts-ignore
      if (req.user.role !== role) {
        return forbiddenResponse(
          res,
          'You are not authorized to access this route.',
        );
      }
      next();
    };
  }
}

export default new RBAC();
