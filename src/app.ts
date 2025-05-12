import { Application, Request, Response } from 'express';
import express from 'express';
import cors from 'cors';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import { notFound } from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

//Application Routes
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send({
    success: true,
    message: 'Hello World! This my first project , Initial project template',
  });
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
