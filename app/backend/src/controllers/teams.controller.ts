import { Request, Response } from 'express';
import { getTeamIDServ, getTeamsServ } from '../services/teams.service';

const getTeamsContr = async (_req:Request, res:Response) => {
  const { messageErro, result } = await getTeamsServ();

  if (messageErro) return res.status(401).json({ message: messageErro, result });
  return res.status(200).json(result);
};

const getTeamIDContr = async (req:Request, res:Response) => {
  const { id } = req.params;
  const { messageErro, result } = await getTeamIDServ(id);

  if (messageErro) return res.status(401).json({ message: messageErro, result });
  return res.status(200).json(result);
};

export {
  getTeamsContr,
  getTeamIDContr,
};
