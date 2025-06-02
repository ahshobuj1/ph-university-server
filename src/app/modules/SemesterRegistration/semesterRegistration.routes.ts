import validationChecker from '../../middlewares/validationChecker';
import { semesterRegistrationController } from './semesterRegistration.controller';
import { Router } from 'express';
import { semesterRegistrationValidations } from './semesterRegistration.validation';

const router = Router();

router.post(
  '/create-semester-registration',
  validationChecker(
    semesterRegistrationValidations.createSemesterRegistrationValidation,
  ),
  semesterRegistrationController.createSemesterRegistration,
);
router.get('/', semesterRegistrationController.getAllSemesterRegistration);
router.get(
  '/:id',
  semesterRegistrationController.getSingleSemesterRegistration,
);
router.patch(
  '/:id',
  validationChecker(
    semesterRegistrationValidations.updateSemesterRegistrationValidation,
  ),
  semesterRegistrationController.updateSemesterRegistration,
);
router.delete(
  '/:id',
  semesterRegistrationController.deleteSemesterRegistration,
);

export const semesterRegistrationRoutes = router;
