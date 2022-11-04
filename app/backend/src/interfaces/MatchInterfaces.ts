export interface IMatch {
  id?: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
  teamHome?: {
    teamName: string;
  },
  teamAway?: {
    teamName: string;
  }
}

export interface IMatchService {
  getMatches(): Promise<IMatch[]>
  getMatchesByStatus(status: boolean): Promise<IMatch[]>
  createMatch({
    homeTeam,
    homeTeamGoals,
    awayTeam,
    awayTeamGoals,
    inProgress,
  }: IMatch): Promise<IMatch | undefined>;
  finishMatch(id: string | number): Promise<void>
  updateMatch(id: string | number, homeTeamGoals: number, awayTeamGoals: number): Promise<void>
}
