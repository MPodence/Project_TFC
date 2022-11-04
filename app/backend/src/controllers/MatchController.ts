import { Request, Response } from 'express';
import { IUserService } from '../interfaces/UserInterfaces';
import { IMatchService } from '../interfaces/MatchInterfaces';
import MatchService from '../services/MatchService';
import UserService from '../services/UserService';

class MatchController {
  private readonly matchService: IMatchService;
  private readonly userService: IUserService;

  constructor() {
    this.matchService = new MatchService();
    this.userService = new UserService();
  }

  getMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    if (inProgress !== 'true' && inProgress !== 'false') {
      const data = await this.matchService.getMatches();
      return res.status(200).json(data);
    }
    const status = inProgress === 'true';
    const dataFilterByStatus = await this.matchService.getMatchesByStatus(status);
    return res.status(200).json(dataFilterByStatus);
  };

  createMatch = async (req: Request, res: Response) => {
    const data = await this.matchService.createMatch(req.body);
    if (data === undefined) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    return res.status(201).json(data);
  };

  finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.matchService.finishMatch(id);
    return res.status(200).json({ message: 'Finished' });
  };

  updateMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this.matchService.updateMatch(id, homeTeamGoals, awayTeamGoals);
    return res.status(200).json({ message: 'Updated' });
  };
}

export default MatchController;
