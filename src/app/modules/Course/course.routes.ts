import { Router } from 'express';
import validationChecker from '../../middlewares/validationChecker';
import { courseValidations } from './course.validation';
import { courseController } from './course.controller';

const router = Router();

router.post(
  '/create-course',
  validationChecker(courseValidations.createCourseValidation),
  courseController.createCourse,
);

router.get('/', courseController.getAllCourse);
router.get('/:id', courseController.getSingleCourse);

router.patch(
  '/:id',
  validationChecker(courseValidations.updateCourseValidation),
  courseController.updateCourse,
);

router.delete('/:id', courseController.deleteCourse);

router.put(
  '/:courseId/assign-course',
  validationChecker(courseValidations.FacultyWithCourseValidation),
  courseController.updateFacultiesWithCourse,
);

router.patch(
  '/:courseId/remove-course',
  validationChecker(courseValidations.FacultyWithCourseValidation),
  courseController.removeFacultiesWithCourse,
);

export const courseRoutes = router;
