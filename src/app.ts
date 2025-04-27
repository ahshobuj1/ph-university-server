import { Application, Request, Response } from 'express';
import express from 'express';
import cors from 'cors';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World! This my first project , Initial project template');
});

export default app;
