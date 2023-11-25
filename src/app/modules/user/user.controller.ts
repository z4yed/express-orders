import { Request, Response } from 'express';
import { UserService } from './user.service';
import UserValidationSchema from './user.store.validation';
import { z } from 'zod';
import { DBError } from '../../errors';

const createUser = async (req: Request, res: Response) => {
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return res.status(422).json({
        success: false,
        message: 'User store validation failed.',
        error: err.format(),
      });
    }

    if (err instanceof DBError) {
      return res.status(err.code).json({
        success: false,
        message: err.message,
        error: {
          code: err.code,
          description: err.message,
        },
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err,
    });
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const user = await UserService.getUser(Number(req.params.userId));

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err: any) {
    console.log(err);

    if (err instanceof DBError) {
      return res.status(err.code).json({
        success: false,
        message: err.message,
        error: {
          code: err.code,
          description: err.message,
        },
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err,
    });
  }
};

const getUsersList = async (req: Request, res: Response) => {
  try {
    const user = await UserService.getUsersList();

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err: any) {
    console.log(err);

    if (err instanceof DBError) {
      return res.status(err.code).json({
        success: false,
        message: err.message,
        error: {
          code: err.code,
          description: err.message,
        },
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err,
    });
  }
};

export const UserController = {
  createUser,
  getUser,
  getUsersList,
};
