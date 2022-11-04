import { Router } from 'express';
import Token from '../helpers/tokenHelper';
import MatchController from '../controllers/MatchController';
import MatchValidations from '../middlewares/createMatchValidations';

const matchRouter = Router();
const matchController = new MatchController();

matchRouter.get('/', matchController.getMatches);
matchRouter.post(
  '/',
  Token.validateToken,
  MatchValidations.createValidations,
  matchController.createMatch,
);
matchRouter.patch('/:id/finish', matchController.finishMatch);
matchRouter.patch('/:id', matchController.updateMatch);

export default matchRouter;
