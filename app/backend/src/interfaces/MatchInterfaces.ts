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
}
