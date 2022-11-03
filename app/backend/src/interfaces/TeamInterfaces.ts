export interface ITeam {
  id?: number;
  teamName: string;
}

export interface ITeamService {
  getTeams(): Promise<ITeam[]>;
  getTeamById(id: string | number): Promise<ITeam | null>
}
