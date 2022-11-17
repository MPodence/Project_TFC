import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardRouter = Router();
const leaderboardController = new LeaderboardController();

leaderboardRouter.get('/home', leaderboardController.getHomeLeaderboard);
leaderboardRouter.get('/away', leaderboardController.getAwayLeaderboard);
leaderboardRouter.get('/', leaderboardController.getFullLeaderboard);

export default leaderboardRouter;
