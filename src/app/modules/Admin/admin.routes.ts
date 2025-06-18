import { Router } from 'express';
import { adminController } from './admin.controller';
import validationChecker from '../../middlewares/validationChecker';
import { adminValidations } from './admin.validation';
import auth from '../../middlewares/auth';
import { UserRole } from '../user/user.constant';

const router = Router();

router.get(
  '/',
  auth(UserRole.admin, UserRole.superAdmin, UserRole.faculty, UserRole.student),
  adminController.getAllAdmin,
);
router.get(
  '/:id',
  auth(UserRole.admin, UserRole.superAdmin, UserRole.faculty),
  adminController.getSingleAdmin,
);

router.patch(
  '/:id',
  auth(UserRole.superAdmin, UserRole.admin),
  validationChecker(adminValidations.updateAdminValidation),
  adminController.updateAdmin,
);

router.delete('/:id', auth(UserRole.superAdmin), adminController.deleteAdmin);

export const adminRoutes = router;
