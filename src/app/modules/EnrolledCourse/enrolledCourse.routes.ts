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

export const enrolledCourseRoutes = router;
