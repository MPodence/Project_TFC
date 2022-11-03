import { ITeamService, ITeam } from '../interfaces/TeamInterfaces';
import Team from '../database/models/Team';

class TeamService implements ITeamService {
  getTeams = async (): Promise<ITeam[]> => {
    const data = await Team.findAll();
    return data;
  };

  getTeamById = async (id: string | number) => {
    const data = await Team.findOne({ where: { id } });
    return data;
  };
}

export default TeamService;
