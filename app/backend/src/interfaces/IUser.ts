interface IUser {
  id?: number,
  username?: string;
  role?: string;
  email?: string;
  password?: string;
}

interface ILogin {
  email: string;
  password: string;
}

export {
  IUser,
  ILogin,
};
