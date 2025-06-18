import { Router } from 'express';
import { semesterController } from './semester.controller';
import validationChecker from '../../middlewares/validationChecker';
import { semesterValidations } from './semester.validation';
import { UserRole } from '../user/user.constant';
import auth from '../../middlewares/auth';

const router = Router();

router.post(
  '/create-semester',
  auth(UserRole.superAdmin, UserRole.admin),
  validationChecker(semesterValidations.createSemesterValidation),
  semesterController.createSemester,
);

router.get(
  '/',
  auth(UserRole.superAdmin, UserRole.admin, UserRole.faculty, UserRole.student),
  semesterController.getAllSemester,
);

router.get(
  '/:id',
  auth(UserRole.superAdmin, UserRole.admin, UserRole.faculty, UserRole.student),
  semesterController.getSemesterById,
);

router.patch(
  '/:id',
  auth(UserRole.superAdmin, UserRole.admin),
  validationChecker(semesterValidations.updateSemesterValidation),
  semesterController.updateSemester,
);

export const semesterRoutes = router;
