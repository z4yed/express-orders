import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { UserRoutes } from './app/modules/user/user.route';
import { globalErrorHandler } from './app/errors';

const app = express();

app.use(express.json());
app.use(cors());

// user module routes
app.use('/api/users', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Express API is functioning properly...</h1>');
});

// handle if any invalid routes get hit
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Invalid route: ${req.method} ${req.originalUrl}`);
  next(error);
});

// global error handler
app.use(globalErrorHandler);

export default app;
