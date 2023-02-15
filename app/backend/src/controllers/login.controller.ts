import { Request, Response } from 'express';
import loginServ from '../services/login.service';

const postLogin = async (req:Request, res:Response) => {
  const { email, password } = req.body;
  const { messageErro, result } = await loginServ.postLogin(email, password);

  if (messageErro) return res.status(401).json({ message: messageErro });
  return res.status(200).json({ token: result });
};

const getRoleUser = async (req:Request, res:Response) => {
  const { authorization } = req.headers;
  const { messageErro, result } = await loginServ.getRoleUser(authorization as string);

  if (messageErro) return res.status(401).json({ message: messageErro, result });
  return res.status(200).json({ role: result });
};

export default {
  postLogin,
  getRoleUser,
};
