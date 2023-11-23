import cors from 'cors';
import express, { Request, Response } from 'express';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('API is running....');
});

export default app;
