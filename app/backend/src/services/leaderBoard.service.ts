import { generateLeaderBoard, leaderboardObj, orderLeaderBoard } from '../utils/leaderBoardUtils';
import matchesServ from './matches.service';
import teamsService from './teams.service';

const getLeaderBoard = async () => {
  const matchesProg = await matchesServ.getMatchesProg(false);
  const teams = await teamsService.getTeams();
  const LeaderBoard = [] as any;

  teams.forEach((team) => {
    const LdForm = leaderboardObj();
    matchesProg.forEach((match) => {
      generateLeaderBoard(LdForm, team, match);
    });
    LeaderBoard.push(LdForm);
  });

  return orderLeaderBoard(LeaderBoard);
};

export default {
  getLeaderBoard,
  generateLeaderBoard,
};
