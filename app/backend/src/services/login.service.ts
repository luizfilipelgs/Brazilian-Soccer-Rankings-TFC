import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import User from '../database/models/User.model';
import { generateToken, verifyToken } from '../auth/jwt';

const loginServ = async (email: string, password: string) => {
  const user = await User.findOne({ where: { email } });

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = generateToken({ email });
    return { messageErro: null, result: token };
  }

  return { messageErro: 'Incorrect email or password' };
};

const userRoleServ = async (auth: string) => {
  const response = verifyToken(auth) as jwt.JwtPayload;

  if (!response.isError) {
    const { email } = response;
    const user = await User.findOne({ where: { email } });
    return { messageErro: null, result: user?.role };
  }
  return { messageErro: 'Verificação de token falhou', result: response };
};

export {
  loginServ,
  userRoleServ,
};
