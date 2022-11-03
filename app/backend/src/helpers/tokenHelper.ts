import { JwtPayload, sign, verify } from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET || 'jwt_secret';

class Token {
  static generateToken = (payload: string): string => {
    const token: string = sign(payload, jwtSecret);
    return token;
  };

  static validateToken = (token: string): string | JwtPayload => {
    const decodedToken = verify(token, jwtSecret);
    return decodedToken;
  };
}

export default Token;
