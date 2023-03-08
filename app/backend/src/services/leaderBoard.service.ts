import { generateLeaderBoardAway, generateLeaderBoardGeral, generateLeaderBoardHome, leaderboardObj,
  orderLeaderBoard } from '../utils/leaderBoardUtils';
import matchesServ from './matches.service';
import teamsService from './teams.service';
import ILeaderboard from '../interfaces/ILeaderboard';

const getLeaderBoard = async (endPoint: string) => {
  const matchesProg = await matchesServ.getMatchesProg(false);
  const teams = await teamsService.getTeams();
  const LeaderBoard = [] as ILeaderboard[];

  teams.forEach((team) => {
    const LdForm = leaderboardObj();
    matchesProg.forEach((match) => {
      if (endPoint === 'home') generateLeaderBoardHome(LdForm, team, match);
      if (endPoint === 'away') generateLeaderBoardAway(LdForm, team, match);
    });
    LeaderBoard.push(LdForm);
  });

  return orderLeaderBoard(LeaderBoard);
};

const getLeaderBoardGeral = async () => {
  const leaderBoardAway = await getLeaderBoard('away');
  const leaderBoardHome = await getLeaderBoard('home');
  const LeaderBoardGeral = [] as ILeaderboard[];

  leaderBoardAway.forEach((away) => {
    const LdForm = leaderboardObj();
    leaderBoardHome.forEach((home) => {
      if (away.name === home.name) generateLeaderBoardGeral(LdForm, away, home);
    });
    LeaderBoardGeral.push(LdForm);
  });

  return orderLeaderBoard(LeaderBoardGeral);
};

export default { getLeaderBoard, getLeaderBoardGeral };
