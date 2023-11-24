import { IUser } from './user.interface';
import { User } from './user.model';

const createUser = async (user: IUser) => {
  return await User.create(user);
};

export const UserService = {
  createUser,
};
