import { Router } from 'express';
import validateLogin from '../middlewares/loginValidation';
import { loginContr, userRoleContr } from '../controllers/login.controller';
import validateAuth from '../middlewares/authValidation';

const routes = Router();

routes.post('/', validateLogin, loginContr);
routes.get('/validate', validateAuth, userRoleContr);

export default routes;
