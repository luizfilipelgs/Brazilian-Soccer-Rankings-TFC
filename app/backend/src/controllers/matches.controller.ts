import { Request, Response } from 'express';
import { getMatchesProgServ, getMatchesServ,
  postMatcheProgServ } from '../services/matches.service';

const getMatchesContr = async (req:Request, res:Response) => {
  const { inProgress } = req.query;
  const status = inProgress === 'true';

  if (inProgress) {
    const result = await getMatchesProgServ(status);

    return res.status(200).json(result);
  }

  const result = await getMatchesServ();
  return res.status(200).json(result);
};

const postMatcheContr = async (req:Request, res:Response) => {
  const { body } = req;
  const { authorization } = req.headers;
  const { messageErro,
    result, statusCode } = await postMatcheProgServ(body, authorization as string);

  if (messageErro) res.status(statusCode).json({ message: messageErro });

  return res.status(statusCode).json(result);
};

export {
  getMatchesContr,
  postMatcheContr,
};
