import express from 'express';
import { studentController } from './student.controller';
import validationChecker from '../../middlewares/validationChecker';
import { studentValidations } from './student.zod.validation';
import { UserRole } from '../user/user.constant';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get(
  '/',
  auth(UserRole.superAdmin, UserRole.admin, UserRole.faculty),
  studentController.getAllStudents,
);

router.get(
  '/:studentId',
  auth(UserRole.superAdmin, UserRole.admin, UserRole.faculty, UserRole.student),
  studentController.getStudentById,
);

router.patch(
  '/:studentId',
  auth(UserRole.superAdmin, UserRole.admin, UserRole.student),
  validationChecker(studentValidations.updateStudentValidationSchema),
  studentController.updateStudent,
);

router.delete(
  '/:studentId',
  auth(UserRole.superAdmin, UserRole.admin),
  studentController.deleteSingleStudent,
);

export const studentRoutes = router;
