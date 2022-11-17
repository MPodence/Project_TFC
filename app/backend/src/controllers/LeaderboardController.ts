import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

class LeaderboardController {
  private readonly leaderboardService;

  constructor() {
    this.leaderboardService = new LeaderboardService();
  }

  getHomeLeaderboard = async (_req: Request, res: Response) => {
    const data = await this.leaderboardService.getHomeLeaderboard();
    res.status(200).json(data);
  };

  getAwayLeaderboard = async (_req: Request, res: Response) => {
    const data = await this.leaderboardService.getAwayLeaderboard();
    res.status(200).json(data);
  };

  getFullLeaderboard = async (_req: Request, res: Response) => {
    const data = await this.leaderboardService.getFullLeaderboard();
    res.status(200).json(data);
  };
}

export default LeaderboardController;
