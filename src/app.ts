import cors from 'cors';
import express, { Request, Response } from 'express';
import { UserRoutes } from './app/modules/user/user.route';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/users', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('API is running....');
});

export default app;
