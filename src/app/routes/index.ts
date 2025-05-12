import { Router } from 'express';
import { studentRoutes } from '../modules/student/student.routes';
import { userRoutes } from '../modules/user/user.routes';

const router = Router();

const modulesRoutes = [
  {
    path: '/students',
    route: studentRoutes,
  },
  {
    path: '/users',
    route: userRoutes,
  },
];

modulesRoutes.forEach((data) => router.use(data.path, data.route));

export default router;
