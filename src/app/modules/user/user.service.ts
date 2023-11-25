import { DBError } from '../../errors';
import { IUser } from './user.interface';
import { User } from './user.model';

const createUser = async (user: IUser) => {
  if (
    (await User.getUserIfExists(user.userId)) ||
    (await User.getUserIfExists(user.username))
  ) {
    throw new DBError('User already exists');
  }

  return await User.create(user);
};

export const UserService = {
  createUser,
};
