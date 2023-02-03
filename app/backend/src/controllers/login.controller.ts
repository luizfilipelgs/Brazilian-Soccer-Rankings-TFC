import { Request, Response } from 'express';
import { userRoleServ, loginServ } from '../services/login.service';

interface IResult {
  messageErro?: string | null
  result?: string | null,
}

const loginContr = async (req:Request, res:Response) => {
  const { email, password } = req.body;
  const { messageErro, result } = await loginServ(email, password) as IResult;

  if (messageErro === null) return res.status(200).json({ token: result });
  return res.status(401).json({ message: messageErro });
};

const userRoleContr = async (req:Request, res:Response) => {
  const { authorization } = req.headers;
  const { messageErro, result } = await userRoleServ(authorization as string);

  if (messageErro === null) return res.status(200).json({ role: result });
  return res.status(401).json({ message: messageErro, result });
};

export {
  loginContr,
  userRoleContr,
};
