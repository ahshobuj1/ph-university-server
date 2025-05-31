import { Router } from 'express';
import { offeredCourseController } from './offeredCourse.controller';

const router = Router();

router.post(
  '/create-offered-course',
  offeredCourseController.createOfferedCourse,
);
// router.get('/');
// router.post('/:id');
// router.patch('/:id');

export const offeredCourseRoutes = router;
