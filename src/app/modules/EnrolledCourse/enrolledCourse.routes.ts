import { Router } from 'express';
import { enrolledCourseController } from './enrolledCourse.controller';
import validationChecker from '../../middlewares/validationChecker';
import { enrolledCourseValidation } from './enrolledCourse.validation';
import auth from '../../middlewares/auth';
import { UserRole } from '../user/user.constant';

const router = Router();

router.post(
  '/create-enrolled-course',
  auth(UserRole.student, UserRole.superAdmin),
  validationChecker(enrolledCourseValidation.createEnrolledCourseValidation),
  enrolledCourseController.createEnrolledCourse,
);

router.get(
  '/',
  auth(UserRole.superAdmin, UserRole.admin, UserRole.faculty),
  enrolledCourseController.getAllEnrolledCourse,
);

router.get(
  '/my-enrolled-course',
  auth(UserRole.student),
  enrolledCourseController.getMyEnrolledCourse,
);

router.patch(
  '/update-enrolled-course',
  auth(UserRole.superAdmin, UserRole.admin, UserRole.faculty),
  validationChecker(enrolledCourseValidation.updateEnrolledCourseValidation),
  enrolledCourseController.updateEnrolledCourseMarks,
);

export const enrolledCourseRoutes = router;
