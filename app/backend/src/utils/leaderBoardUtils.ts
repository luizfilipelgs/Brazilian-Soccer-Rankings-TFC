import { IMatch } from '../interfaces/IMatches';
import ILeaderboard from '../interfaces/ILeaderboard';

const leaderboardObj = () => ({
  name: '',
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: '',
});

const CalcTotalPoints = (homeGoals: number, awayGoals: number) => {
  if (homeGoals > awayGoals) return 3;
  if (homeGoals === awayGoals) return 1;
  return 0;
};

const statusWDL = (homeGoals: number, awayGoals: number, operator: string) => {
  const result = (operator === 'maior' && homeGoals > awayGoals)
  || (operator === 'menor' && homeGoals < awayGoals)
  || (operator === 'igual' && homeGoals === awayGoals) ? 1 : 0;
  return result;
};

const generateLeaderBoard = async (LdForm: ILeaderboard, team: any, match: IMatch) => {
  const ld = LdForm;
  if (team.id === match.homeTeamId) {
    ld.name = team.teamName;
    ld.totalPoints += CalcTotalPoints(match.homeTeamGoals, match.awayTeamGoals);
    ld.totalGames += 1;
    ld.totalVictories += statusWDL(match.homeTeamGoals, match.awayTeamGoals, 'maior');
    ld.totalDraws += statusWDL(match.homeTeamGoals, match.awayTeamGoals, 'igual');
    ld.totalLosses += statusWDL(match.homeTeamGoals, match.awayTeamGoals, 'menor');
    ld.goalsFavor += match.homeTeamGoals;
    ld.goalsOwn += match.awayTeamGoals;
    ld.goalsBalance = (ld.goalsFavor - ld.goalsOwn);
    ld.efficiency = (((ld.totalPoints) / (ld.totalGames * 3)) * 100).toFixed(2);
  }
};

const orderLeaderBoard = async (ld: ILeaderboard[]) => {
  const ldOrdened = ld.sort((home: ILeaderboard, away: ILeaderboard) => {
    if (home.totalPoints < away.totalPoints) return 1;
    if (home.totalPoints > away.totalPoints) return -1;
    if (home.goalsBalance < away.goalsBalance) return 1;
    if (home.goalsBalance > away.goalsBalance) return -1;
    if (home.goalsFavor < away.goalsFavor) return 1;
    if (home.goalsFavor > away.goalsFavor) return -1;
    if (home.goalsOwn < away.goalsOwn) return -1;
    if (home.goalsOwn > away.goalsOwn) return 1;
    return 0;
  });
  return ldOrdened;
};

export {
  leaderboardObj,
  generateLeaderBoard,
  orderLeaderBoard,
};
