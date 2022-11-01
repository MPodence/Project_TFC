import { sign } from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET || 'jwt_secret';

class Token {
  static generateToken = (payload: string): string => {
    const token: string = sign(payload, jwtSecret);
    return token;
  };
}

export default Token;
