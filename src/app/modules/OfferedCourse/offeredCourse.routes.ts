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

router.get('/', offeredCourseController.getAllOfferedCourse);
router.get('/:id', offeredCourseController.getSingleOfferedCourse);

router.patch(
  '/:id',
  validationChecker(offeredCourseValidations.updateOfferedCourseValidation),
  offeredCourseController.updateOfferedCourse,
);

router.delete('/:id', offeredCourseController.deleteOfferedCourse);

export const offeredCourseRoutes = router;
