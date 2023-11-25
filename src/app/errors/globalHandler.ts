import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import DBError from './DBError';

const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  next: NextFunction,
) => {
  if (err instanceof z.ZodError) {
    return res.status(422).json({
      success: false,
      message: 'Validation failed.',
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
    message: err.message || 'Something went wrong',
    error: err,
  });
};

export default globalErrorHandler;
