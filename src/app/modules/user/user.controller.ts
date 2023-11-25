import { NextFunction, Request, Response } from 'express';
import { UserService } from './user.service';
import UserStoreValidationSchema from './user.store.validation';
import UserUpdateValidationSchema from './user.update.validation';
import ResponseCode from '../../constants/responseCodes';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;

    const zodParsedUserData = UserStoreValidationSchema.parse(payload);

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
      message: 'User created successfully.',
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
    const zodParsedData = UserUpdateValidationSchema.parse(req.body);

    const updatedUser = await UserService.updateUser(userId, zodParsedData);

    return res.status(ResponseCode.HTTP_OK).json({
      success: true,
      message: 'User updated successfully.',
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

export const UserController = {
  createUser,
  getUser,
  getUsersList,
  updateUser,
  deleteUser,
};
