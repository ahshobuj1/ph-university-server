import { Router } from 'express';
import { enrolledCourseController } from './enrolledCourse.controller';
import validationChecker from '../../middlewares/validationChecker';
import { enrolledCourseValidation } from './enrolledCourse.validation';
import auth from '../../middlewares/auth';

const router = Router();

router.post(
  '/create-enrolled-course',
  auth('student'),
  validationChecker(enrolledCourseValidation.createEnrolledCourseValidation),
  enrolledCourseController.createEnrolledCourse,
);

router.get(
  '/',
  auth('admin', 'faculty'),
  enrolledCourseController.getAllEnrolledCourse,
);

router.get(
  '/my-enrolled-course',
  auth('student'),
  enrolledCourseController.getMyEnrolledCourse,
);

router.patch(
  '/update-enrolled-course',
  auth('faculty', 'admin'),
  validationChecker(enrolledCourseValidation.updateEnrolledCourseValidation),
  enrolledCourseController.updateEnrolledCourseMarks,
);

export const enrolledCourseRoutes = router;
