import { Router } from 'express';
import TeamController from '../controllers/TeamController';

const teamRouter = Router();
const teamController = new TeamController();

teamRouter.get('/', teamController.getTeams);
teamRouter.get('/:id', teamController.getTeamById);

export default teamRouter;
