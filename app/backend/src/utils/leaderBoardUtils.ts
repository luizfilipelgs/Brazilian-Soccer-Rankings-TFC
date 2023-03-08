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
  const ldHome = LdForm;
  if (team.id === match.homeTeamId) {
    ldHome.name = team.teamName;
    ldHome.totalGames += 1;
    ldHome.totalPoints += CalcTotalPoints(match.homeTeamGoals, match.awayTeamGoals);
    ldHome.totalVictories += statusWDL(match.homeTeamGoals, match.awayTeamGoals, 'maior');
    ldHome.totalDraws += statusWDL(match.homeTeamGoals, match.awayTeamGoals, 'igual');
    ldHome.totalLosses += statusWDL(match.homeTeamGoals, match.awayTeamGoals, 'menor');
    ldHome.goalsFavor += match.homeTeamGoals;
    ldHome.goalsOwn += match.awayTeamGoals;
    ldHome.goalsBalance = (ldHome.goalsFavor - ldHome.goalsOwn);
    ldHome.efficiency = (((ldHome.totalPoints) / (ldHome.totalGames * 3)) * 100).toFixed(2);
  }
  return ldHome;
};

const generateLeaderBoardAway = async (LdForm: ILeaderboard, team: any, match: IMatch) => {
  const ldAway = LdForm;
  if (team.id === match.awayTeamId) {
    ldAway.name = team.teamName;
    ldAway.totalPoints += CalcTotalPoints(match.awayTeamGoals, match.homeTeamGoals);
    ldAway.totalGames += 1;
    ldAway.totalVictories += statusWDL(match.awayTeamGoals, match.homeTeamGoals, 'maior');
    ldAway.totalDraws += statusWDL(match.awayTeamGoals, match.homeTeamGoals, 'igual');
    ldAway.totalLosses += statusWDL(match.awayTeamGoals, match.homeTeamGoals, 'menor');
    ldAway.goalsFavor += match.awayTeamGoals;
    ldAway.goalsOwn += match.homeTeamGoals;
    ldAway.goalsBalance = (ldAway.goalsFavor - ldAway.goalsOwn);
    ldAway.efficiency = (((ldAway.totalPoints) / (ldAway.totalGames * 3)) * 100).toFixed(2);
  }
  return ldAway;
};

const generateLeaderBoardGeral = async (
  LdForm: ILeaderboard,
  away: ILeaderboard,
  home: ILeaderboard,
) => {
  const ld = LdForm;

  ld.name = home.name;
  ld.totalPoints = home.totalPoints + away.totalPoints;
  ld.totalGames = home.totalGames + away.totalGames;
  ld.totalVictories = home.totalVictories + away.totalVictories;
  ld.totalDraws = home.totalDraws + away.totalDraws;
  ld.totalLosses = home.totalLosses + away.totalLosses;
  ld.goalsFavor = home.goalsFavor + away.goalsFavor;
  ld.goalsOwn = home.goalsOwn + away.goalsOwn;
  ld.goalsBalance = (ld.goalsFavor - ld.goalsOwn);
  ld.efficiency = (((ld.totalPoints) / (ld.totalGames * 3)) * 100).toFixed(2);

  return ld;
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
  generateLeaderBoardGeral,
};
