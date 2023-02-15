import { Router } from 'express';
import validateLogin from '../middlewares/loginValidation';
import loginContr from '../controllers/login.controller';
import validateAuth from '../middlewares/authValidation';

const routes = Router();

routes.post('/', validateLogin, loginContr.postLogin);
routes.get('/validate', validateAuth, loginContr.getRoleUser);

export default routes;
