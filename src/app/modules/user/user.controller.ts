import { NextFunction, Request, Response } from 'express';
import { UserService } from './user.service';
import UserValidationSchema from './user.store.validation';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;

    const zodParsedUserData = UserValidationSchema.parse(payload);

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

    res.status(201).json({
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
    const user = await UserService.getUser(Number(req.params.userId));

    res.status(200).json({
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

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const UserController = {
  createUser,
  getUser,
  getUsersList,
};
