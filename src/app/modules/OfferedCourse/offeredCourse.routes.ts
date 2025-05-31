import { Router } from 'express';
import { offeredCourseController } from './offeredCourse.controller';
import validationChecker from '../../middlewares/validationChecker';
import { offeredCourseValidations } from './offeredCourse.validation';

const router = Router();

router.post(
  '/create-offered-course',
  validationChecker(offeredCourseValidations.createOfferedCourseValidation),
  offeredCourseController.createOfferedCourse,
);

// router.get('/');
// router.post('/:id');
// router.patch('/:id');

export const offeredCourseRoutes = router;
