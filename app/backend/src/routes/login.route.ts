import { Router } from 'express';
import validateLogin from '../middlewares/loginValidation';
import loginController from '../controllers/login.controller';

const routes = Router();

routes.post('/', validateLogin, loginController);

export default routes;
