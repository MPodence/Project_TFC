import { Router } from 'express';
import loginValidations from '../middlewares/loginValidations';
import UserController from '../controllers/UserController';

const loginRouter = Router();
const userController = new UserController();

loginRouter.post('/', loginValidations, userController.userLogin);
loginRouter.get('/validate', userController.validateLogin);

export default loginRouter;
