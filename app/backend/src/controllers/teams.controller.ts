import { Request, Response } from 'express';
import teamsServ from '../services/teams.service';

const getTeams = async (_req:Request, res:Response) => {
  const result = await teamsServ.getTeams();
  return res.status(200).json(result);
};

const getTeamId = async (req:Request, res:Response) => {
  const { id } = req.params;
  const { messageErro, result } = await teamsServ.getTeamId(id);

  if (messageErro) return res.status(401).json({ message: messageErro, result });
  return res.status(200).json(result);
};

export default {
  getTeams,
  getTeamId,
};
