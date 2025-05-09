import { Application, Request, Response } from 'express';
import express from 'express';
import cors from 'cors';
import { studentRoutes } from './app/modules/student/student.routes';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

//Application Routes
app.use('/api/v1/students', studentRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send({
    success: true,
    message: 'Hello World! This my first project , Initial project template',
  });
});

export default app;
