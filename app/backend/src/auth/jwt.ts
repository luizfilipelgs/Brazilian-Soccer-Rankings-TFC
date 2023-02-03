import * as jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/IUser';

const JWT_SECRET = 'jwt_secret';

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '5h',
} as object;

const generateToken = (user: IUser) => {
  const token = jwt.sign(user, JWT_SECRET, jwtConfig);
  return token;
};

const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded as jwt.JwtPayload;
  } catch (error) {
    return { isError: true, error };
  }
};

export {
  generateToken,
  verifyToken,
};
