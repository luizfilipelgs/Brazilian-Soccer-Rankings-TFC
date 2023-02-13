import Team from '../database/models/Team.model';
import Matches from '../database/models/Match.model';

const getMatchesServ = async () => {
  const matches = await Matches.findAll({
    include: [
      { model: Team, as: 'homeTeam', attributes: ['teamName'] },
      { model: Team, as: 'awayTeam', attributes: ['teamName'] }],
  });

  if (matches.length !== 0) {
    return { messageErro: null, result: matches };
  }
  return { messageErro: 'Erro na busca dos metches', result: matches };
};

const getMatchesProgServ = async (status: boolean) => {
  const matches = await Matches.findAll({
    where: { inProgress: status },
    include: [
      { model: Team, as: 'homeTeam', attributes: ['teamName'] },
      { model: Team, as: 'awayTeam', attributes: ['teamName'] }],
  });

  if (matches.length !== 0) {
    return { messageErro: null, result: matches };
  }
  return { messageErro: 'Erro na busca dos metches', result: matches };
};

export {
  getMatchesServ,
  getMatchesProgServ,
};
