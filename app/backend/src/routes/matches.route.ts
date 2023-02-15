import { Router } from 'express';
import { getMatchesContr, postMatcheContr } from '../controllers/matches.controller';

const routes = Router();

routes.get('/', getMatchesContr);
routes.post('/', postMatcheContr);

export default routes;
