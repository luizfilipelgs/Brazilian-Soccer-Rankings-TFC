import { Request, Response } from 'express';
import getMatchesServ from '../services/matches.service';

const getMatchesContr = async (_req:Request, res:Response) => {
  const { messageErro, result } = await getMatchesServ();

  if (messageErro) return res.status(401).json({ message: messageErro, result });
  return res.status(200).json(result);
};

export default getMatchesContr;
