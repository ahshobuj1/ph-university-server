import { Router } from 'express';
import { semesterController } from './semester.controller';
import validationChecker from '../../middlewares/validationChecker';
import { semesterValidations } from './semester.validation';

const router = Router();

router.use(
  '/create-semester',
  validationChecker(semesterValidations.createSemesterValidation),
  semesterController.createSemester,
);

export const semesterRoutes = router;
