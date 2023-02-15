import Team from '../database/models/Team.model';
import Matches from '../database/models/Match.model';
import { verifyToken } from '../auth/jwt';
import { IMatch } from '../interfaces/IMatches';

const getMatchesServ = async () => {
  const matches = await Matches.findAll({
    include: [
      { model: Team, as: 'homeTeam', attributes: ['teamName'] },
      { model: Team, as: 'awayTeam', attributes: ['teamName'] }],
  });

  return matches;
};

const getMatchesProgServ = async (status: string | boolean) => {
  const matches = await Matches.findAll({
    where: { inProgress: status },
    include: [
      { model: Team, as: 'homeTeam', attributes: ['teamName'] },
      { model: Team, as: 'awayTeam', attributes: ['teamName'] }],
  });

  return matches;
};

const postMatcheProgServ = async (match: IMatch, auth: string) => {
  const statusToken = verifyToken(auth);

  if (statusToken.isError) {
    return { messageErro: 'Token must be a valid token', statusCode: 401 };
  }
  const HomeTeam = await Team.findByPk(match.homeTeamId);
  const AwayTeam = await Team.findByPk(match.awayTeamId);

  if (!HomeTeam || !AwayTeam) {
    return { messageErro: 'There is no team with such id!', statusCode: 404 };
  }

  if (match.homeTeamId === match.awayTeamId) {
    return { messageErro: 'It is not possible to create a match with two equal teams',
      statusCode: 422 };
  }

  const createdMatch = await Matches.create({
    ...match,
    inProgress: true,
  });

  return { result: createdMatch, statusCode: 201 };
};

export {
  getMatchesServ,
  getMatchesProgServ,
  postMatcheProgServ,
};
