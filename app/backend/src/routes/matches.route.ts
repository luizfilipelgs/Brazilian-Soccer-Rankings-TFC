import { Router } from 'express';
import matchesContr from '../controllers/matches.controller';

const routes = Router();

routes.get('/', matchesContr.getMatches);
routes.post('/', matchesContr.postMatcheProg);
routes.patch('/:id', matchesContr.patchMatch);
routes.patch('/:id/finish', matchesContr.patchMatchFinish);

export default routes;
