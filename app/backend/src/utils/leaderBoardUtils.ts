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

const CalcTotalPoints = (goalsTeamA: number, goalsTeamB: number) => {
  if (goalsTeamA > goalsTeamB) return 3;
  if (goalsTeamA === goalsTeamB) return 1;
  return 0;
};

const statusWDL = (goalsTeamA: number, goalsTeamB: number, operator: string) => {
  const result = (operator === 'maior' && goalsTeamA > goalsTeamB)
  || (operator === 'menor' && goalsTeamA < goalsTeamB)
  || (operator === 'igual' && goalsTeamA === goalsTeamB) ? 1 : 0;
  return result;
};

const generateLeaderBoardHome = async (LdForm: ILeaderboard, team: any, match: IMatch) => {
  const ld = LdForm;
  if (team.id === match.homeTeamId) {
    ld.name = team.teamName;
    ld.totalGames += 1;
    ld.totalPoints += CalcTotalPoints(match.homeTeamGoals, match.awayTeamGoals);
    ld.totalVictories += statusWDL(match.homeTeamGoals, match.awayTeamGoals, 'maior');
    ld.totalDraws += statusWDL(match.homeTeamGoals, match.awayTeamGoals, 'igual');
    ld.totalLosses += statusWDL(match.homeTeamGoals, match.awayTeamGoals, 'menor');
    ld.goalsFavor += match.homeTeamGoals;
    ld.goalsOwn += match.awayTeamGoals;
    ld.goalsBalance = (ld.goalsFavor - ld.goalsOwn);
    ld.efficiency = (((ld.totalPoints) / (ld.totalGames * 3)) * 100).toFixed(2);
  }
};

const generateLeaderBoardAway = async (LdForm: ILeaderboard, team: any, match: IMatch) => {
  const ld = LdForm;
  if (team.id === match.awayTeamId) {
    ld.name = team.teamName;
    ld.totalPoints += CalcTotalPoints(match.awayTeamGoals, match.homeTeamGoals);
    ld.totalGames += 1;
    ld.totalVictories += statusWDL(match.awayTeamGoals, match.homeTeamGoals, 'maior');
    ld.totalDraws += statusWDL(match.awayTeamGoals, match.homeTeamGoals, 'igual');
    ld.totalLosses += statusWDL(match.awayTeamGoals, match.homeTeamGoals, 'menor');
    ld.goalsFavor += match.awayTeamGoals;
    ld.goalsOwn += match.homeTeamGoals;
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
  generateLeaderBoardHome,
  orderLeaderBoard,
  generateLeaderBoardAway,
};
