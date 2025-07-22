import { Router } from 'express';
import { authController } from './auth.controller';
import { authValidation } from './auth.validation';
import validationChecker from '../../middlewares/validationChecker';
import auth from '../../middlewares/auth';
import { UserRole } from '../user/user.constant';

const router = Router();

router.post(
  '/login',
  validationChecker(authValidation.loginUserValidation),
  authController.loginUser,
);

router.post(
  '/change-password',
  auth(UserRole.admin, UserRole.faculty, UserRole.student),
  validationChecker(authValidation.changeUserPasswordValidation),
  authController.changePassword,
);

router.post('/refresh-token', authController.refreshToken);

router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

export const authRoutes = router;
