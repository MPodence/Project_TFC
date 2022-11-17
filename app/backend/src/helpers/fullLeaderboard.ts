import { ITeam } from '../interfaces/TeamInterfaces';
import { ITeamInLB } from '../interfaces/LeaderboardInterfaces';

class FullLeaderboard {
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
  private homeStatsArr: ITeamInLB[];
  private awayStatsArr: ITeamInLB[];

  constructor(team: ITeam, homeStatsArr: ITeamInLB[], awayStatsArr :ITeamInLB[]) {
    this.currentTeam = team;
    this.homeStatsArr = homeStatsArr;
    this.awayStatsArr = awayStatsArr;
    this.name = team.teamName;
  }

  homeLBCalcs = () => {
    this.homeStatsArr.forEach((homeStats) => {
      if (this.currentTeam.teamName === homeStats.name) {
        this.totalGames += homeStats.totalGames;
        this.totalVictories += homeStats.totalVictories;
        this.totalDraws += homeStats.totalDraws;
        this.totalLosses += homeStats.totalLosses;
        this.goalsFavor += homeStats.goalsFavor;
        this.goalsOwn += homeStats.goalsOwn;
      }
    });
  };

  awayLBCalcs = () => {
    this.awayStatsArr.forEach((awayStats) => {
      if (this.currentTeam.teamName === awayStats.name) {
        this.totalGames += awayStats.totalGames;
        this.totalVictories += awayStats.totalVictories;
        this.totalDraws += awayStats.totalDraws;
        this.totalLosses += awayStats.totalLosses;
        this.goalsFavor += awayStats.goalsFavor;
        this.goalsOwn += awayStats.goalsOwn;
      }
    });
  };

  fullLBObjCreator = (): ITeamInLB => {
    this.homeLBCalcs();
    this.awayLBCalcs();
    const teamInLB: ITeamInLB = {
      name: this.name,
      totalPoints: (this.totalVictories * 3) + this.totalDraws,
      totalGames: this.totalGames,
      totalVictories: this.totalVictories,
      totalDraws: this.totalDraws,
      totalLosses: this.totalLosses,
      goalsFavor: this.goalsFavor,
      goalsOwn: this.goalsOwn,
      goalsBalance: this.goalsFavor - this.goalsOwn,
      efficiency: String(((((this.totalVictories * 3) + this.totalDraws)
      / (this.totalGames * 3)) * 100).toFixed(2)),
    };
    return teamInLB;
  };
}

export default FullLeaderboard;
