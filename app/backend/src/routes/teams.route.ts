import { Router } from 'express';
import teamsContr from '../controllers/teams.controller';

const routes = Router();

routes.get('/', teamsContr.getTeams);
routes.get('/:id', teamsContr.getTeamId);

export default routes;
