import { userController } from './user.controller';
import { studentValidations } from '../student/student.zod.validation';
import { Router } from 'express';
import validationChecker from '../../middlewares/validationChecker';

const router = Router();

router.post(
  '/create-student',
  validationChecker(studentValidations.createStudentValidationsSchema),
  userController.createStudent,
);

export const userRoutes = router;
