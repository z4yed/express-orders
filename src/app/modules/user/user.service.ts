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

const getUser = async (userId: number) => {
  if (typeof userId !== 'number') {
    throw new Error('Invalid parameter. ');
  }

  if (!(await User.getUserIfExists(userId))) {
    throw new DBError("User doesn't exists.");
  }

  return await User.findOne({ userId }).select({
    userId: 1,
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    isActive: 1,
    hobbies: 1,
    address: 1,
  });
};

const getUsersList = async () => {
  return await User.find({}).select({
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
  });
};

export const UserService = {
  createUser,
  getUser,
  getUsersList,
};
