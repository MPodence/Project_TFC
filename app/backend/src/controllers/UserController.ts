import { Request, Response } from 'express';
import { IUserService } from '../interfaces/UserInterfaces';
import UserService from '../services/UserService';

class UserController {
  private readonly userService: IUserService;

  constructor() {
    this.userService = new UserService();
  }

  userLogin = async (req: Request, res: Response): Promise<Response> => {
    const { message, token } = await this.userService.userLogin(req.body);
    if (message) {
      return res.status(401).json({ message });
    }
    return res.status(200).json({ token });
  };

  validateLogin = async (req: Request, res: Response): Promise<Response> => {
    const headerToken = req.header('Authorization');
    if (!headerToken) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    const { message, role } = await this.userService.validateLogin(headerToken);
    if (message) {
      return res.status(403).json({ message });
    }
    return res.status(200).json({ role });
  };
}

export default UserController;
