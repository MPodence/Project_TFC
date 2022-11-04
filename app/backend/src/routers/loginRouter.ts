import { Router } from 'express';
import loginValidations from '../middlewares/loginValidations';
import UserController from '../controllers/UserController';
import Token from '../helpers/tokenHelper';

const loginRouter = Router();
const userController = new UserController();

loginRouter.post('/', loginValidations, userController.userLogin);
loginRouter.get('/validate', Token.validateToken, userController.getRole);

export default loginRouter;
