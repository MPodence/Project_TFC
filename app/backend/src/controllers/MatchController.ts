import { Request, Response } from 'express';
import { IMatchService } from '../interfaces/MatchInterfaces';
import MatchService from '../services/MatchService';

class MatchController {
  private readonly matchService: IMatchService;

  constructor() {
    this.matchService = new MatchService();
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
}

export default MatchController;
