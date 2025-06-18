import validationChecker from '../../middlewares/validationChecker';
import { semesterRegistrationController } from './semesterRegistration.controller';
import { Router } from 'express';
import { semesterRegistrationValidations } from './semesterRegistration.validation';
import auth from '../../middlewares/auth';
import { UserRole } from '../user/user.constant';

const router = Router();

router.post(
  '/create-semester-registration',
  auth(UserRole.superAdmin, UserRole.admin),
  validationChecker(
    semesterRegistrationValidations.createSemesterRegistrationValidation,
  ),
  semesterRegistrationController.createSemesterRegistration,
);

router.get(
  '/',
  auth(UserRole.superAdmin, UserRole.admin, UserRole.faculty, UserRole.student),
  semesterRegistrationController.getAllSemesterRegistration,
);

router.get(
  '/:id',
  auth(UserRole.superAdmin, UserRole.admin, UserRole.faculty, UserRole.student),
  semesterRegistrationController.getSingleSemesterRegistration,
);

router.patch(
  '/:id',
  auth(UserRole.superAdmin, UserRole.admin),
  validationChecker(
    semesterRegistrationValidations.updateSemesterRegistrationValidation,
  ),
  semesterRegistrationController.updateSemesterRegistration,
);

router.delete(
  '/:id',
  auth(UserRole.superAdmin, UserRole.admin),
  semesterRegistrationController.deleteSemesterRegistration,
);

export const semesterRegistrationRoutes = router;
