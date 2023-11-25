import { NextFunction, Request, Response } from 'express';
import { UserService } from './user.service';
import userStoreValidationSchema from './user.store.validation';
import userUpdateValidationSchema from './user.update.validation';
import ResponseCode from '../../constants/responseCodes';
import orderStoreValidation from './order.store.validation';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;

    const zodParsedUserData = userStoreValidationSchema.parse(payload);

    const user = await UserService.createUser(zodParsedUserData);

    const {
      userId,
      username,
      fullName,
      age,
      email,
      isActive,
      hobbies,
      address,
    } = user;

    const userResponse = {
      userId,
      username,
      fullName,
      age,
      email,
      isActive,
      hobbies,
      address,
    };

    return res.status(ResponseCode.CREATED).json({
      success: true,
      message: 'User created successfully!',
      data: userResponse,
    });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = Number(req.params.userId);
    if (isNaN(userId)) {
      throw new Error('Invalid request parameter : userId');
    }

    const user = await UserService.getUser(userId);

    return res.status(ResponseCode.HTTP_OK).json({
      success: true,
      message: 'User fetched successfully!',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const getUsersList = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await UserService.getUsersList();

    return res.status(ResponseCode.HTTP_OK).json({
      success: true,
      message: 'Users fetched successfully!',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = Number(req.params.userId);

    if (isNaN(userId)) {
      throw new Error('Invalid request parameter : userId');
    }

    // parse request body with zod
    const zodParsedData = userUpdateValidationSchema.parse(req.body);

    const updatedUser = await UserService.updateUser(userId, zodParsedData);

    return res.status(ResponseCode.HTTP_OK).json({
      success: true,
      message: 'User updated successfully!',
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = Number(req.params.userId);
    if (isNaN(userId)) {
      throw new Error('Invalid request parameter : userId');
    }

    const deleted = await UserService.deleteUser(userId);

    if (deleted.acknowledged && deleted.deletedCount === 1) {
      return res.status(200).json({
        success: true,
        message: 'User deleted successfully!',
        data: null,
      });
    }

    throw new Error('Something went wrong. ');
  } catch (error) {
    next(error);
  }
};

// order management
const addOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = Number(req.params.userId);
    if (isNaN(userId)) {
      throw new Error('Invalid request parameter : userId');
    }

    const orderData = orderStoreValidation.parse(req.body);

    await UserService.addOrder(userId, orderData);

    return res.status(ResponseCode.HTTP_OK).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = Number(req.params.userId);
    if (isNaN(userId)) {
      throw new Error('Invalid request parameter : userId');
    }

    const result = await UserService.getOrders(userId);

    return res.status(ResponseCode.HTTP_OK).json({
      success: true,
      message: 'Order fetched successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getTotalPrice = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = Number(req.params.userId);
    if (isNaN(userId)) {
      throw new Error('Invalid request parameter : userId');
    }

    const result = await UserService.getTotalPrice(userId);

    let totalPrice: number = 0;
    if (result.length) {
      // extract the total price field from the first array object
      totalPrice = result[0].totalPrice;
    }

    return res.status(ResponseCode.HTTP_OK).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: {
        totalPrice,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const UserController = {
  getUsersList,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  addOrder,
  getOrders,
  getTotalPrice,
};
