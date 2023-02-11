import Teams from '../database/models/Team.model';

const getTeamsServ = async () => {
  const teams = await Teams.findAll();

  if (teams.length !== 0) {
    return { messageErro: null, result: teams };
  }
  return { messageErro: 'Erro na busca da lista de times', result: teams };
};

const getTeamIDServ = async (id:number | string) => {
  const team = await Teams.findByPk(id);

  if (team) {
    return { messageErro: null, result: team };
  }
  return { messageErro: 'Não há time cadastrado com esse ID', result: team };
};

export {
  getTeamsServ,
  getTeamIDServ,
};
