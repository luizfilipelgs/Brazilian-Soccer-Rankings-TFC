import { Request, Response } from 'express';
import { getMatchesProgServ, getMatchesServ } from '../services/matches.service';

const getMatchesContr = async (req:Request, res:Response) => {
  const { inProgress } = req.query;
  const status = inProgress === 'true';

  if (inProgress) {
    const { messageErro, result } = await getMatchesProgServ(status);

    if (messageErro) return res.status(401).json({ message: messageErro, result });
    return res.status(200).json(result);
  }

  const { messageErro, result } = await getMatchesServ();

  if (messageErro) return res.status(401).json({ message: messageErro, result });
  return res.status(200).json(result);
};

export default getMatchesContr;
