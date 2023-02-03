import { Request, Response, NextFunction } from 'express';

const validateLogin = (req:Request, res:Response, next:NextFunction) => {
  const { email, password } = req.body;

  if (!email.length || !password.length) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  const isValidEmail = email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g);

  if (!isValidEmail || password.length < 6) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }
  next();
};

export default validateLogin;
