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

  getRole = async (req: Request, res: Response): Promise<Response> => {
    const headerToken = req.header('Authorization');
    const invalidTokenErr = 'Token must be a valid token';
    if (!headerToken) {
      return res.status(401).json({ message: invalidTokenErr });
    }
    const data = await this.userService.getRole(headerToken);
    if (data === invalidTokenErr) {
      return res.status(401).json({ message: invalidTokenErr });
    }
    return res.status(200).json({ role: data });
  };
}

export default UserController;
