import { compareSync } from 'bcryptjs';
import User from '../database/models/User';
import { ILogin, IUserService } from '../interfaces/UserInterfaces';
import Token from '../helpers/tokenHelper';

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

  validateLogin = async (token: string) => {
    const emailFromToken = Token.validateToken(token);
    const data = await User.findOne({ where: { email: emailFromToken } });
    if (!data) {
      return { message: 'Invalid token' };
    }
    return { role: data.role };
  };
}

export default UserService;
