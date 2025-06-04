import { userController } from './user.controller';
import { studentValidations } from '../student/student.zod.validation';
import { Router } from 'express';
import validationChecker from '../../middlewares/validationChecker';
import { facultyValidations } from '../faculty/faculty.validation';
import { adminValidations } from '../Admin/admin.validation';
import auth from '../../middlewares/auth';
import { UserRole } from './user.constant';

const router = Router();

router.post(
  '/create-student',
  auth(UserRole.admin),
  validationChecker(studentValidations.createStudentValidationsSchema),
  userController.createStudent,
);

router.post(
  '/create-faculty',
  auth(UserRole.admin),
  validationChecker(facultyValidations.createFacultyValidation),
  userController.createFaculty,
);

router.post(
  '/create-admin', //super admin
  validationChecker(adminValidations.createAdminValidation),
  userController.createAdmin,
);

export const userRoutes = router;
