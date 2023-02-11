import { Request, Response } from 'express';
import { userRoleServ, loginServ } from '../services/login.service';

const loginContr = async (req:Request, res:Response) => {
  const { email, password } = req.body;
  const { messageErro, result } = await loginServ(email, password);

  if (messageErro) return res.status(401).json({ message: messageErro });
  return res.status(200).json({ token: result });
};

const userRoleContr = async (req:Request, res:Response) => {
  const { authorization } = req.headers;
  const { messageErro, result } = await userRoleServ(authorization as string);

  if (messageErro) return res.status(401).json({ message: messageErro, result });
  return res.status(200).json({ role: result });
};

export {
  loginContr,
  userRoleContr,
};
