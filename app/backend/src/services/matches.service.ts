import Team from '../database/models/Team.model';
import Matches from '../database/models/Match.model';

const getMatchesServ = async () => {
  const matches = await Matches.findAll({
    include: [{
      model: Team,
      as: 'homeTeam',
      attributes: ['teamName'],
    },
    {
      model: Team,
      as: 'awayTeam',
      attributes: ['teamName'],
    }],
  });

  if (matches.length !== 0) {
    return { messageErro: null, result: matches };
  }
  return { messageErro: 'Erro na busca dos metches', result: matches };
};

export default getMatchesServ;
