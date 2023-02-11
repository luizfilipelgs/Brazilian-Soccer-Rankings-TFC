import { Router } from 'express';
import { getTeamsContr, getTeamIDContr } from '../controllers/teams.controller';

const routes = Router();

routes.get('/', getTeamsContr);
routes.get('/:id', getTeamIDContr);

export default routes;
