import { ILeaderboardService, ITeamInLB } from '../interfaces/LeaderboardInterfaces';
import HomeLeaderboard from '../helpers/homeTeamLB';
import AwayLeaderboard from '../helpers/awayTeamLB';
import TeamService from './TeamService';
import MatchService from './MatchService';
import sortLeaderboard from '../helpers/sortLeaderboard';
import FullLeaderboard from '../helpers/fullLeaderboard';

class LeaderboardService implements ILeaderboardService {
  private readonly teamService;
  private readonly matchService;

  constructor() {
    this.teamService = new TeamService();
    this.matchService = new MatchService();
  }

  getHomeLeaderboard = async () => {
    const homeLBArr: ITeamInLB[] = [];
    const teamsArr = await this.teamService.getTeams();
    const matchArr = await this.matchService.getMatchesByStatus(false);
    teamsArr.forEach((team) => {
      const homeLBCalc = new HomeLeaderboard(team, matchArr);
      const teamInLB: ITeamInLB = homeLBCalc.homeLBObjCreator();
      homeLBArr.push(teamInLB);
    });
    const sortedLB = sortLeaderboard(homeLBArr);
    return sortedLB;
  };

  getAwayLeaderboard = async () => {
    const awayLBArr: ITeamInLB[] = [];
    const teamsArr = await this.teamService.getTeams();
    const matchArr = await this.matchService.getMatchesByStatus(false);
    teamsArr.forEach((team) => {
      const awayLBCalc = new AwayLeaderboard(team, matchArr);
      const teamInLB: ITeamInLB = awayLBCalc.awayLBObjCreator();
      awayLBArr.push(teamInLB);
    });
    const sortedLB = sortLeaderboard(awayLBArr);
    return sortedLB;
  };

  getFullLeaderboard = async () => {
    const fullLBArr: ITeamInLB[] = [];
    const teamsArr = await this.teamService.getTeams();
    const homeStatusArr = await this.getHomeLeaderboard();
    const awayStatusArr = await this.getAwayLeaderboard();
    teamsArr.forEach((team) => {
      const fullLeaderboard = new FullLeaderboard(team, homeStatusArr, awayStatusArr);
      const teamInFullLB: ITeamInLB = fullLeaderboard.fullLBObjCreator();
      fullLBArr.push(teamInFullLB);
    });
    const sortedFullLB = sortLeaderboard(fullLBArr);
    return sortedFullLB;
  };
}

export default LeaderboardService;
