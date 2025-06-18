import { userController } from './user.controller';
import { studentValidations } from '../student/student.zod.validation';
import { Router } from 'express';
import validationChecker from '../../middlewares/validationChecker';
import { facultyValidations } from '../faculty/faculty.validation';
import { adminValidations } from '../Admin/admin.validation';
import auth from '../../middlewares/auth';
import { UserRole } from './user.constant';
import { upload } from '../../utils/uploadImageToCloudinary';
import { formDataToJSON } from '../../utils/formDataToJSON';
import { userValidation } from './user.validation';

const router = Router();

router.post(
  '/create-student',
  auth(UserRole.superAdmin, UserRole.admin),
  upload.single('file'),
  formDataToJSON,
  validationChecker(studentValidations.createStudentValidationsSchema),
  userController.createStudent,
);

router.post(
  '/create-faculty',
  auth(UserRole.superAdmin, UserRole.admin),
  upload.single('file'),
  formDataToJSON,
  validationChecker(facultyValidations.createFacultyValidation),
  userController.createFaculty,
);

router.post(
  '/create-admin',
  auth(UserRole.superAdmin),
  upload.single('file'),
  formDataToJSON,
  validationChecker(adminValidations.createAdminValidation),
  userController.createAdmin,
);

router.get(
  '/',
  auth(UserRole.superAdmin, UserRole.admin),
  userController.getAllUser,
);

router.post(
  '/me',
  auth(UserRole.superAdmin, UserRole.admin, UserRole.student),
  userController.getMe,
);

router.patch(
  '/change-status/:id',
  auth(UserRole.superAdmin, UserRole.admin),
  validationChecker(userValidation.changedUserStatusValidation),
  userController.changeUserStatus,
);

export const userRoutes = router;
