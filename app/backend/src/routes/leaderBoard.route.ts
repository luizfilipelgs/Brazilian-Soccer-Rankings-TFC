import { Router } from 'express';
import leaderBoardContr from '../controllers/leaderBoard.controller';

const routes = Router();

routes.get('/home', leaderBoardContr.getLeaderBoardHome);
routes.get('/away', leaderBoardContr.getLeaderBoardAway);
// routes.get('/', leaderBoardContr.getLeaderBoard);

export default routes;
