import * as bcrypt from 'bcryptjs';
import User from '../database/models/User.model';
import generateToken from '../auth/jwt';

const login = async (email: string, password: string) => {
  const user = await User.findOne({ where: { email } });
  if (!user) return { message: 'Invalid fields' };

  const checkPassword = bcrypt.compareSync(password, user.password);
  if (!checkPassword) return { message: 'Invalid fields' };

  const token = generateToken(email);
  return { result: token };
};

export default login;
