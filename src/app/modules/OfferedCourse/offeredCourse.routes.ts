import { Router } from 'express';
import { offeredCourseController } from './offeredCourse.controller';
import validationChecker from '../../middlewares/validationChecker';
import { offeredCourseValidations } from './offeredCourse.validation';
import { UserRole } from '../user/user.constant';
import auth from '../../middlewares/auth';

const router = Router();

router.post(
  '/create-offered-course',
  auth(UserRole.superAdmin, UserRole.admin),
  validationChecker(offeredCourseValidations.createOfferedCourseValidation),
  offeredCourseController.createOfferedCourse,
);

router.get(
  '/',
  auth(UserRole.superAdmin, UserRole.admin, UserRole.faculty),
  offeredCourseController.getAllOfferedCourse,
);

router.get(
  '/my-offered-course',
  auth(UserRole.student),
  offeredCourseController.getMyOfferedCourse,
);

router.get(
  '/:id',
  auth(UserRole.superAdmin, UserRole.admin, UserRole.faculty, UserRole.student),
  offeredCourseController.getSingleOfferedCourse,
);

router.patch(
  '/:id',
  auth(UserRole.superAdmin, UserRole.admin),
  offeredCourseController.updateOfferedCourse,
);

router.delete(
  '/:id',
  auth(UserRole.superAdmin, UserRole.admin),
  offeredCourseController.deleteOfferedCourse,
);

export const offeredCourseRoutes = router;
