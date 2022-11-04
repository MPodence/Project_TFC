import { compareSync } from 'bcryptjs';
import { verify } from 'jsonwebtoken';
import User from '../database/models/User';
import { ILogin, IUserService } from '../interfaces/UserInterfaces';
import Token from '../helpers/tokenHelper';

const jwtSecret = process.env.JWT_SECRET || 'jwt_secret';

class UserService implements IUserService {
  static checkPassword = (loginPas :string, dbPas: string):boolean => compareSync(loginPas, dbPas);

  userLogin = async (login: ILogin) => {
    const data = await User.findOne({ where: { email: login.email } });
    if (!data || UserService.checkPassword(login.password, data.password) === false) {
      return { message: 'Incorrect email or password' };
    }
    const token = Token.generateToken(data.email);
    return { token };
  };

  getRole = async (token: string): Promise<string> => {
    const decodedToken = verify(token, jwtSecret);
    const data = await User.findOne({ where: { email: decodedToken } });
    if (!data) {
      return 'Token must be a valid token';
    }
    return data.role;
  };
}

export default UserService;
