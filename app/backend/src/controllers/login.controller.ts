import { Request, Response } from 'express';
import loginService from '../services/login.service';

const login = async (req:Request, res:Response) => {
  const { email, password } = req.body;
  const { message, result } = await loginService(email, password);

  if (message) return res.status(400).json({ message });
  return res.status(200).json({ token: result });
};

export default login;
