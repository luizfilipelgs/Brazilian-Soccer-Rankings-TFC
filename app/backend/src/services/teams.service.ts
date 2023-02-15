import Teams from '../database/models/Team.model';

const getTeams = async () => {
  const teams = await Teams.findAll();
  return teams;
};

const getTeamId = async (id:number | string) => {
  const team = await Teams.findByPk(id);

  if (team) {
    return { messageErro: null, result: team };
  }
  return { messageErro: 'Não há time cadastrado com esse ID', result: team };
};

export default {
  getTeams,
  getTeamId,
};
