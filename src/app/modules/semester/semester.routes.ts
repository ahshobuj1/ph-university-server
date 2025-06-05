import { Router } from 'express';
import { semesterController } from './semester.controller';
import validationChecker from '../../middlewares/validationChecker';
import { semesterValidations } from './semester.validation';
import auth from '../../middlewares/auth';

const router = Router();

router.post(
  '/create-semester',
  validationChecker(semesterValidations.createSemesterValidation),
  semesterController.createSemester,
);

router.get('/', auth('student'), semesterController.getAllSemester);
router.get('/:id', semesterController.getSemesterById);

router.patch(
  '/:id',
  validationChecker(semesterValidations.updateSemesterValidation),
  semesterController.updateSemester,
);

export const semesterRoutes = router;
