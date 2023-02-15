export interface IMatch {
  id?: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress?: boolean,
}

export interface IMatchCreated extends IMatch {
  id?: number,
  inProgress?: boolean,
}
