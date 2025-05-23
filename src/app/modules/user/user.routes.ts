import { userController } from './user.controller';
import { studentValidations } from '../student/student.zod.validation';
import { Router } from 'express';
import validationChecker from '../../middlewares/validationChecker';
import { facultyValidations } from '../faculty/faculty.validation';
import { adminValidations } from '../Admin/admin.validation';

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

router.post(
  '/create-admin',
  validationChecker(adminValidations.createAdminValidation),
  userController.createAdmin,
);

export const userRoutes = router;
