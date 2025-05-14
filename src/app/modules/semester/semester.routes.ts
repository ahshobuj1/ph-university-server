import { Router } from 'express';
import { semesterController } from './semester.controller';
import validationChecker from '../../middlewares/validationChecker';
import { semesterValidations } from './semester.validation';

const router = Router();

router.post(
  '/create-semester',
  validationChecker(semesterValidations.createSemesterValidation),
  semesterController.createSemester,
);

router.get('/:id', semesterController.getSemesterById);

export const semesterRoutes = router;
