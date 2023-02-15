import { Request, Response } from 'express';
import matchesServ from '../services/matches.service';

const getMatches = async (req:Request, res:Response) => {
  const { inProgress } = req.query;
  const status = inProgress === 'true';

  if (inProgress) {
    const result = await matchesServ.getMatchesProg(status);

    return res.status(200).json(result);
  }

  const result = await matchesServ.getMatches();
  return res.status(200).json(result);
};

const postMatcheProg = async (req:Request, res:Response) => {
  const { body } = req;
  const { authorization } = req.headers;
  const { messageErro,
    result, statusCode } = await matchesServ.postMatcheProg(body, authorization as string);

  if (messageErro) res.status(statusCode).json({ message: messageErro });

  return res.status(statusCode).json(result);
};

const patchMatchFinish = async (req:Request, res:Response) => {
  const { id } = req.params;
  const { statusCode, result } = await matchesServ.patchMatchFinish(id);

  return res.status(statusCode).json({ message: result });
};

const patchMatch = async (req:Request, res:Response) => {
  const { id } = req.params;
  const { homeTeamGoals, awayTeamGoals } = req.body;
  const { statusCode, result } = await matchesServ.patchMatch(id, homeTeamGoals, awayTeamGoals);

  return res.status(statusCode).json({ message: result });
};

export default {
  getMatches,
  postMatcheProg,
  patchMatchFinish,
  patchMatch,
};
