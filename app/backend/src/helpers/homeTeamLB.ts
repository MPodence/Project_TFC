import { ITeam } from '../interfaces/TeamInterfaces';
import { ITeamInLB } from '../interfaces/LeaderboardInterfaces';
import { IMatch } from '../interfaces/MatchInterfaces';

class HomeLeaderboard {
  private name = '';
  private totalPoints = 0;
  private totalGames = 0;
  private totalVictories = 0;
  private totalDraws = 0;
  private totalLosses = 0;
  private goalsFavor = 0;
  private goalsOwn = 0;
  private goalsBalance = 0;
  private efficiency = '';
  private currentTeam: ITeam;
  private matches: IMatch[];

  constructor(team: ITeam, matches :IMatch[]) {
    this.currentTeam = team;
    this.matches = matches;
    this.name = this.currentTeam.teamName;
  }

  homeLBCalcs = () => {
    this.matches.forEach((match) => {
      if (this.currentTeam.id === match.homeTeam) {
        this.totalGames += 1;
        this.totalVictories = match.homeTeamGoals > match.awayTeamGoals
          ? this.totalVictories += 1 : this.totalVictories;
        this.totalDraws = match.homeTeamGoals === match.awayTeamGoals
          ? this.totalDraws += 1 : this.totalDraws;
        this.totalLosses = match.homeTeamGoals < match.awayTeamGoals
          ? this.totalLosses += 1 : this.totalLosses;
        this.goalsFavor += match.homeTeamGoals;
        this.goalsOwn += match.awayTeamGoals;
        this.goalsBalance = this.goalsFavor - this.goalsOwn;
        this.totalPoints = (this.totalVictories * 3) + this.totalDraws;
        this.efficiency = String(((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2));
      }
    });
  };

  homeLBObjCreator = (): ITeamInLB => {
    this.homeLBCalcs();
    const teamInLB: ITeamInLB = {
      name: this.name,
      totalPoints: this.totalPoints,
      totalGames: this.totalGames,
      totalVictories: this.totalVictories,
      totalDraws: this.totalDraws,
      totalLosses: this.totalLosses,
      goalsFavor: this.goalsFavor,
      goalsOwn: this.goalsOwn,
      goalsBalance: this.goalsBalance,
      efficiency: this.efficiency,
    };
    return teamInLB;
  };
}

export default HomeLeaderboard;
