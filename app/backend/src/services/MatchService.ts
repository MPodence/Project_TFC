import Team from '../database/models/Team';
import Match from '../database/models/Match';
import { IMatch, IMatchService } from '../interfaces/MatchInterfaces';

class MatchService implements IMatchService {
  getMatches = async (): Promise<IMatch[]> => {
    const data = await Match.findAll({ include: [
      { model: Team, as: 'teamHome', attributes: ['teamName'] },
      { model: Team, as: 'teamAway', attributes: ['teamName'] },
    ] });
    return data;
  };

  getMatchesByStatus = async (status: boolean) => {
    const data = await Match.findAll({ include: [
      { model: Team, as: 'teamHome', attributes: ['teamName'] },
      { model: Team, as: 'teamAway', attributes: ['teamName'] },
    ],
    where: { inProgress: status } });
    return data;
  };
}

export default MatchService;
