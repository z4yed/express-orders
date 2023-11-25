import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { UserRoutes } from './app/modules/user/user.route';
import { globalErrorHandler } from './app/errors';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/users', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('API is running....');
});

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Invalid route: ${req.method} ${req.originalUrl}`);
  next(error);
});

app.use(globalErrorHandler);

export default app;
