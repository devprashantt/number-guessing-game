import jwt from 'jsonwebtoken';

import CONFIG from '../../utils/config';

import logger from '../../utils/logger';

class JwtHelper {
  generateToken(payload: any) {
    try {
      const token = jwt.sign(payload, CONFIG.JWT_SECRET as string, {
        expiresIn: CONFIG.JWT_EXPIRES_IN,
      });

      return [token, null];
    } catch (error) {
      logger.error('Error generating token:', error);
      return [null, error];
    }
  }

  verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, CONFIG.JWT_SECRET as string);
      return [decoded, null];
    } catch (error) {
      logger.error('Error verifying token:', error);
      return [null, error];
    }
  }
}

export default new JwtHelper();
