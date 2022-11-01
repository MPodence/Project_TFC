import { compareSync } from 'bcryptjs';
import User from '../database/models/User';
import { ILogin, IUserService } from '../interfaces/UserInterfaces';
import Token from '../helpers/tokenHelper';

class UserService implements IUserService {
  userLogin = async (login: ILogin) => {
    const data = await User.findOne({ where: { email: login.email } });
    if (!data || compareSync(login.password, data.password) === false) {
      return { message: 'Incorrect email or password' };
    }
    const token = Token.generateToken(data.email);
    return { token };
  };
}

export default UserService;
