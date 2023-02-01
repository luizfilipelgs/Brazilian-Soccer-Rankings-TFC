import { Request, Response, NextFunction } from 'express';

const validateLogin = (req:Request, res:Response, next:NextFunction) => {
  const { email, password } = req.body;

  if (!email.length || !password.length) {
    return res.status(401).json({ message: 'Some required fields are missing' });
  }

  next();
};

export default validateLogin;
