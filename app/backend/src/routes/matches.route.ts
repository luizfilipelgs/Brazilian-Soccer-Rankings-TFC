import { Router } from 'express';
import getMatchesContr from '../controllers/matches.controller';

const routes = Router();

routes.get('/', getMatchesContr);

export default routes;
