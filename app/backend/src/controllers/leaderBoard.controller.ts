import { Request, Response } from 'express';
import leaderBoardServ from '../services/leaderBoard.service';

const getLeaderBoardHome = async (_req:Request, res:Response) => {
  const leaderBoard = await leaderBoardServ.getLeaderBoard('home');

  return res.status(200).json(leaderBoard);
};

const getLeaderBoardAway = async (_req:Request, res:Response) => {
  const leaderBoard = await leaderBoardServ.getLeaderBoard('away');

  return res.status(200).json(leaderBoard);
};

/* const getLeaderBoard = async (_req:Request, res:Response) => {
  const leaderBoard = await leaderBoardServ.getLeaderBoard('/');

  return res.status(200).json(leaderBoard);
}; */

export default {
  getLeaderBoardHome,
  getLeaderBoardAway,
  /* getLeaderBoard, */
};
