import { generateLeaderBoardAway, generateLeaderBoardHome, leaderboardObj,
  orderLeaderBoard } from '../utils/leaderBoardUtils';
import matchesServ from './matches.service';
import teamsService from './teams.service';
import ILeaderboard from '../interfaces/ILeaderboard';

const getLeaderBoard = async (homeOrAway: string) => {
  const matchesProg = await matchesServ.getMatchesProg(false);
  const teams = await teamsService.getTeams();
  const LeaderBoard = [] as ILeaderboard[];

  teams.forEach((team) => {
    const LdForm = leaderboardObj();
    matchesProg.forEach((match) => {
      if (homeOrAway === 'home') generateLeaderBoardHome(LdForm, team, match);
      if (homeOrAway === 'away') generateLeaderBoardAway(LdForm, team, match);
    });
    LeaderBoard.push(LdForm);
  });

  return orderLeaderBoard(LeaderBoard);
};

export default { getLeaderBoard };
