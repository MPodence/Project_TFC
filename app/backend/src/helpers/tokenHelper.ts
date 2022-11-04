import { NextFunction, Request, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET || 'jwt_secret';

class Token {
  static generateToken = (payload: string): string => {
    const token: string = sign(payload, jwtSecret);
    return token;
  };

  static validateToken = (req: Request, res: Response, next: NextFunction) => {
    const headerToken = req.header('Authorization');
    if (!headerToken) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    try {
      const decodedToken = verify(headerToken, jwtSecret);
      if (typeof decodedToken === 'string') {
        next();
      }
    } catch (err) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  };
}

export default Token;
