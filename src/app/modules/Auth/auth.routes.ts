import { Router } from 'express';
import { authController } from './auth.controller';
import { authValidation } from './auth.validation';
import validationChecker from '../../middlewares/validationChecker';

const router = Router();

router.post(
  '/login',
  validationChecker(authValidation.loginUserValidation),
  authController.loginUser,
);

export const authRoutes = router;
