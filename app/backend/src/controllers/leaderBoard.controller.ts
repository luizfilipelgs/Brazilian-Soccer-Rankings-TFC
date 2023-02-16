import { Request, Response } from 'express';
import leaderBoardServ from '../services/leaderBoard.service';

const getLeaderBoard = async (_req:Request, res:Response) => {
  const leaderBoard = await leaderBoardServ.getLeaderBoard();

  return res.status(200).json(leaderBoard);
};

const a = () => {
  console.log('');
};

export default {
  getLeaderBoard,
  a,
};
