import { userController } from './user.controller';
import { studentValidations } from '../student/student.zod.validation';
import { Router } from 'express';
import validationChecker from '../../middlewares/validationChecker';
import { facultyValidations } from '../faculty/faculty.validation';

const router = Router();

router.post(
  '/create-student',
  validationChecker(studentValidations.createStudentValidationsSchema),
  userController.createStudent,
);

router.post(
  '/create-faculty',
  validationChecker(facultyValidations.createFacultyValidation),
  userController.createFaculty,
);

export const userRoutes = router;
