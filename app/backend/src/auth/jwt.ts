import * as jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/IUser';

const JWT_SECRET = 'PrecisoDeFerias';

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '1h',
} as object;

const generateToken = (user: IUser) => {
  delete user.password;
  const token = jwt.sign({ data: user }, JWT_SECRET, jwtConfig);
  return token;
};

/* const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    return { isError: true, error };
  }
}; */

/* export {
  generateToken,
  verifyToken,
}; */

export default generateToken;
