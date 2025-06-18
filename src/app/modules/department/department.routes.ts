import { Router } from 'express';
import { departmentController } from './department.controller';
import validationChecker from '../../middlewares/validationChecker';
import { departmentValidations } from './department.validation';
import auth from '../../middlewares/auth';
import { UserRole } from '../user/user.constant';

const router = Router();

router.post(
  '/create-department',
  auth(UserRole.superAdmin, UserRole.admin),
  validationChecker(departmentValidations.createDepartmentValidation),
  departmentController.createDepartment,
);

router.get(
  '/',
  auth(UserRole.superAdmin, UserRole.admin, UserRole.faculty, UserRole.student),
  departmentController.getAllDepartments,
);

router.get(
  '/:id',
  auth(UserRole.superAdmin, UserRole.admin, UserRole.faculty, UserRole.student),
  departmentController.getSingleDepartments,
);

router.patch(
  '/:id',
  auth(UserRole.superAdmin, UserRole.admin),
  departmentController.updateDepartments,
);

export const departmentRoutes = router;
