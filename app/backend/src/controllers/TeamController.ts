import { Request, Response } from 'express';
import { ITeamService, ITeam } from '../interfaces/TeamInterfaces';
import TeamService from '../services/TeamService';

class TeamController {
  private readonly teamService: ITeamService;

  constructor() {
    this.teamService = new TeamService();
  }

  getTeams = async (_req: Request, res: Response) => {
    const data: ITeam[] = await this.teamService.getTeams();
    return res.status(200).json(data);
  };

  getTeamById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await this.teamService.getTeamById(id);
    if (!data) {
      return res.status(404).json({ message: 'Team not found' });
    }
    return res.status(200).json(data);
  };
}

export default TeamController;
