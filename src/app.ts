import { Application, Request, Response } from 'express';
import express from 'express';
import cors from 'cors';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import { notFound } from './app/middlewares/notFound';
import router from './app/routes';
import cookieParser from 'cookie-parser';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:5174', 'http://localhost:5173'],
    credentials: true,
  }),
);

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
