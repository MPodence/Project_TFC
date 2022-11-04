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

  // Desconstruido para poder forçar true no inProgress
  createMatch = async ({
    homeTeam,
    homeTeamGoals,
    awayTeam,
    awayTeamGoals,
  }: IMatch): Promise<IMatch | undefined> => {
    const haveHomeTeam = await Team.findOne({ where: { id: homeTeam } });
    const haveAwayTeam = await Team.findOne({ where: { id: awayTeam } });
    if (!haveHomeTeam || !haveAwayTeam) {
      return undefined;
    }
    const data = await Match.create({
      homeTeam,
      homeTeamGoals,
      awayTeam,
      awayTeamGoals,
      inProgress: true,
    });
    return data;
  };

  finishMatch = async (id: string | number): Promise<void> => {
    await Match.update({ inProgress: false }, { where: { id } });
  };

  updateMatch = async (id: string | number, homeTeamGoals: number, awayTeamGoals: number) => {
    await Match.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  };
}

export default MatchService;
