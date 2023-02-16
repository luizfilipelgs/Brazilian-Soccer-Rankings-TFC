import { Router } from 'express';
import leaderBoardContr from '../controllers/leaderBoard.controller';

const routes = Router();

routes.get('/home', leaderBoardContr.getLeaderBoard);

export default routes;
