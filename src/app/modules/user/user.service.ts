import ResponseCode from '../../constants/responseCodes';
import { DBError } from '../../errors';
import { hashPassword } from '../../utils';
import { IOrder, IUser } from './user.interface';
import { User } from './user.model';

const createUser = async (user: IUser) => {
  if (
    (await User.getUserIfExists(user.userId)) ||
    (await User.getUserIfExists(user.username))
  ) {
    throw new DBError(
      'User already exists',
      ResponseCode.INTERNAL_SERVER_ERROR,
    );
  }

  return await User.create(user);
};

const getUser = async (userId: number) => {
  if (typeof userId !== 'number') {
    throw new Error('Invalid parameter.');
  }

  if (!(await User.getUserIfExists(userId))) {
    throw new DBError("User doesn't exists.", ResponseCode.NOT_FOUND);
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

const updateUser = async (userId: number, userData: Partial<IUser>) => {
  if (!(await User.getUserIfExists(userId))) {
    throw new DBError("User doesn't exists.", ResponseCode.NOT_FOUND);
  }

  // hash the password if it is present
  if (userData.password) {
    userData.password = await hashPassword(userData.password);
  }

  return User.findOneAndUpdate(
    { userId },
    { $set: userData },
    { new: true },
  ).select({
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

const deleteUser = async (userId: number) => {
  if (!(await User.getUserIfExists(userId))) {
    throw new DBError("User doesn't exists.", ResponseCode.NOT_FOUND);
  }

  return await User.deleteOne({ userId });
};

const addOrder = async (userId: number, orderData: IOrder) => {
  if (!(await User.getUserIfExists(userId))) {
    throw new DBError("User doesn't exists.", ResponseCode.NOT_FOUND);
  }

  return await User.findOneAndUpdate(
    { userId },
    { $addToSet: { orders: orderData } },
  );
};

const getOrders = async (userId: number) => {
  if (!(await User.getUserIfExists(userId))) {
    throw new DBError("User doesn't exists.", ResponseCode.NOT_FOUND);
  }

  return await User.findOne({ userId }).select({ orders: 1 });
};

const getTotalPrice = async (userId: number) => {
  if (!(await User.getUserIfExists(userId))) {
    throw new DBError("User doesn't exists.", ResponseCode.NOT_FOUND);
  }

  // applying match, unwind and group aggregation stages
  return await User.aggregate([
    { $match: { userId } },
    { $unwind: '$orders' },
    {
      $group: {
        _id: '$userId',
        totalPrice: {
          $sum: { $multiply: ['$orders.quantity', '$orders.price'] },
        },
      },
    },
  ]);
};

export const UserService = {
  createUser,
  getUser,
  getUsersList,
  deleteUser,
  updateUser,
  addOrder,
  getOrders,
  getTotalPrice,
};
